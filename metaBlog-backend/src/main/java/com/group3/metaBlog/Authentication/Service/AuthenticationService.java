package com.group3.metaBlog.Authentication.Service;

import com.group3.metaBlog.Authentication.DataTransferObject.RegisterRequestDto;
import com.group3.metaBlog.Enum.Role;
import com.group3.metaBlog.Authentication.DataTransferObject.RegisterResponseDto;
import com.group3.metaBlog.Config.ApplicationConfig;
import com.group3.metaBlog.Jwt.ServiceLayer.JwtService;
import com.group3.metaBlog.User.Model.User;
import com.group3.metaBlog.User.Repository.UserRepository;
import com.group3.metaBlog.Utils.MetaBlogResponse;
import lombok.AllArgsConstructor;
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
    private final UserRepository userRepository;

    private final JwtService jwtService;
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private final ApplicationConfig applicationConfig;

    private final AuthenticationManager authenticationManager;

    public ResponseEntity<Object> register(RegisterRequestDto request) {

        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
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
                .build();

//we have to save this here because I want to store the access token and refresh token in the user db.
        userRepository.save(user);

        String accessToken = jwtService.generateJwtToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        user.setRefreshToken(refreshToken);
        user.setAccessToken(accessToken);

        userRepository.save(user);

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
