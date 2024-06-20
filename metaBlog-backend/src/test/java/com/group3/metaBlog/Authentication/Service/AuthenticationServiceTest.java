package com.group3.metaBlog.Authentication.Service;

import com.group3.metaBlog.Authentication.DataTransferObject.RegisterRequestDto;
import com.group3.metaBlog.Authentication.DataTransferObject.RegisterResponseDto;
import com.group3.metaBlog.Authentication.DataTransferObject.ResetPasswordRequestDto;
import com.group3.metaBlog.Config.ApplicationConfig;
import com.group3.metaBlog.Email.Service.IEmailService;
import com.group3.metaBlog.Enum.Role;
import com.group3.metaBlog.Jwt.ServiceLayer.JwtService;
import com.group3.metaBlog.OTP.Service.IOTPService;
import com.group3.metaBlog.User.Model.User;
import com.group3.metaBlog.User.Repository.IUserRepository;
import com.group3.metaBlog.Utils.MetaBlogResponse;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.mail.MessagingException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private IUserRepository userRepository;

    @Mock
    private IOTPService otpService;

    @Mock
    private IEmailService emailService;

    @Mock
    private JwtService jwtService;

    @Mock
    private ApplicationConfig applicationConfig;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    private User user;
    private RegisterRequestDto registerRequestDto;
    private ResetPasswordRequestDto resetPasswordRequestDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        authenticationService = new AuthenticationService(userRepository, otpService, emailService, jwtService, applicationConfig, authenticationManager);

        user = User.builder()
                .id(1L)
                .username("testUser")
                .email("test@example.com")
                .password("password")
                .role(Role.User)
                .build();
        registerRequestDto = new RegisterRequestDto();
        registerRequestDto.setUsername("testUser");
        registerRequestDto.setEmail("test@example.com");
        registerRequestDto.setPassword("password");
        registerRequestDto.setRole("User");

        resetPasswordRequestDto = new ResetPasswordRequestDto();
        resetPasswordRequestDto.setEmail("test@example.com");
        resetPasswordRequestDto.setNewPassword("newPassword");
    }

    @Test
    void testRegisterUserAlreadyExists() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = authenticationService.register(registerRequestDto);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        MetaBlogResponse responseBody = (MetaBlogResponse) response.getBody();
        assert responseBody != null;
        assertEquals("User already exists with this email.", responseBody.getMessage());
        assertEquals(false, responseBody.getSuccess());

        verify(userRepository, times(1)).findByEmail("test@example.com");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testRegisterInvalidRole() {
        registerRequestDto.setRole("Admin");

        ResponseEntity<Object> response = authenticationService.register(registerRequestDto);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        MetaBlogResponse responseBody = (MetaBlogResponse) response.getBody();
        assert responseBody != null;
        assertEquals("Invalid Role", responseBody.getMessage());
        assertEquals(false, responseBody.getSuccess());

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testRegisterSuccess() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(otpService.generateOTP()).thenReturn(123456);
        when(jwtService.generateJwtToken(any())).thenReturn("accessToken");
        when(jwtService.generateRefreshToken(any())).thenReturn("refreshToken");
        when(applicationConfig.passwordEncoder()).thenReturn(new BCryptPasswordEncoder());
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArguments()[0]);

        ResponseEntity<Object> response = authenticationService.register(registerRequestDto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        MetaBlogResponse responseBody = (MetaBlogResponse) response.getBody();
        assert responseBody != null;
        assertEquals("User Created Successfully", responseBody.getMessage());
        assertEquals(true, responseBody.getSuccess());

        RegisterResponseDto data = (RegisterResponseDto) responseBody.getData();
        assert data != null;
        assertEquals("accessToken", data.getAccessToken());
        assertEquals("refreshToken", data.getRefreshToken());
        assertEquals("User", data.getRole());

        verify(userRepository).findByEmail(anyString());
        verify(userRepository, times(3)).save(any(User.class)); // 1 for saving user, 2 for saving access and 3 for refresh token
    }
    @Test
    void testRegisterEmailException() throws MessagingException {
        // Mock behavior for user creation
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());
        when(applicationConfig.passwordEncoder()).thenReturn(new BCryptPasswordEncoder());
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User savedUser = invocation.getArgument(0);
            savedUser.setId(1L); // Ensure the ID is set after save
            return savedUser;
        });
        when(otpService.generateOTP()).thenReturn(123456);

        // After user creation, throw the exception during email sending
        doThrow(new MessagingException("Email error")).when(emailService).sendVerificationOTP(anyString(), anyInt());

        // Call the method to test
        ResponseEntity<Object> response = authenticationService.register(registerRequestDto);

        // Assertions
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        MetaBlogResponse responseBody = (MetaBlogResponse) response.getBody();
        assertNotNull(responseBody);
        assertEquals("Error sending email to the user.", responseBody.getMessage());
        assertFalse(responseBody.getSuccess());

        // Verify interactions (ensure correct order of operations)
        InOrder inOrder = inOrder(userRepository, otpService, emailService);
        inOrder.verify(userRepository).findByEmail("test@example.com");
        inOrder.verify(userRepository).save(any(User.class));
        inOrder.verify(otpService).generateOTP();
        inOrder.verify(otpService).registerOTP(anyInt(), eq(1L)); // Use 1L directly for verification
        inOrder.verify(emailService).sendVerificationOTP(anyString(), anyInt());
    }

}
