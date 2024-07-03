package com.group3.metaBlog.Authentication.Service;

import com.group3.metaBlog.Authentication.DataTransferObject.*;
import com.group3.metaBlog.Email.Service.IEmailService;
import com.group3.metaBlog.Authentication.DataTransferObject.ResetPasswordRequestDto;
import com.group3.metaBlog.Email.Service.IEmailService;
import com.group3.metaBlog.Enum.Role;
import com.group3.metaBlog.Config.ApplicationConfig;
import com.group3.metaBlog.Exception.MetaBlogException;
import com.group3.metaBlog.Jwt.ServiceLayer.JwtService;
import com.group3.metaBlog.OTP.Service.IOTPService;
import com.group3.metaBlog.User.Model.User;
import com.group3.metaBlog.User.Repository.IUserRepository;
import com.group3.metaBlog.Utils.MetaBlogResponse;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;


@Service
@AllArgsConstructor
public class AuthenticationService implements IAuthenticationService {
    private final IUserRepository IUserRepository;

    private final IOTPService otpService;
    private final IEmailService emailService;

    private final JwtService jwtService;
    private final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    private final ApplicationConfig applicationConfig;

    private final AuthenticationManager authenticationManager;

    public ResponseEntity<Object> register(RegisterRequestDto request) {
        logger.info("Registering user with email: {}", request.getEmail());
        Optional<User> existingUser = IUserRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            logger.error("User already exists with email: {}", request.getEmail());
            return new ResponseEntity<>(MetaBlogResponse.builder()
                    .success(false)
                    .message("User already exists with this email.")
                    .data(RegisterResponseDto.builder()
                            .accessToken(null)
                            .refreshToken(null)
                            .role(null)
                            .build())
                    .build() , HttpStatus.CONFLICT);
        }
        if(!Objects.equals(request.getRole(), "User")){
            logger.error("Invalid Role provided in the request which is: {}", request.getRole());
            return new ResponseEntity<>(MetaBlogResponse.builder()
                    .success(false)
                    .message("Invalid Role")
                    .build() , HttpStatus.CONFLICT);
        }

        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(applicationConfig.passwordEncoder().encode(request.getPassword()))
                .registerAt((double)(System.currentTimeMillis()))
                .lastLoginTime((double) (System.currentTimeMillis()))
                .role(Role.User)
                .isEmailVerified(false)
                .isAccountLocked(false)
                .isResetPasswordRequested(false)
                .isTermsAccepted(true)
                .build();

        IUserRepository.save(user);
        Long user_id = user.getId();

        int otp = otpService.generateOTP();
        otpService.registerOTP(otp,user_id);
        try {
            emailService.sendVerificationOTP(request.getEmail(), otp);
        } catch (MessagingException e) {
            logger.error("Error sending email to the user with email: {}", request.getEmail());
            logger.error("Message of the error: {}", e.getMessage());
            return new ResponseEntity<>(MetaBlogResponse.builder()
                    .success(false)
                    .message("Error sending email to the user.")
                    .build() , HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info("OTP sent to the user with email ");
        IUserRepository.save(user);
        logger.info("User created without JWT tokens");
        String accessToken = jwtService.generateJwtToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        user.setRefreshToken(refreshToken);
        user.setAccessToken(accessToken);

        IUserRepository.save(user);

        logger.info("JWT token added to the user");
        logger.info("Registration ended successfully with email: {}", request.getEmail());
        return new ResponseEntity<>(MetaBlogResponse.builder()
                .success(true)
                .message("User Created Successfully")
                .data(RegisterResponseDto.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .role("User")
                        .build())
                .build(), HttpStatus.CREATED);
    }


}
