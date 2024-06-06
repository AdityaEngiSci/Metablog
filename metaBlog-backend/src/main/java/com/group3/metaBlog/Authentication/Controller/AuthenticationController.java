package com.group3.metaBlog.Authentication.Controller;

import com.group3.metaBlog.Authentication.DataTransferObject.RegisterRequestDto;
import com.group3.metaBlog.Authentication.Service.AuthenticationService;
import com.group3.metaBlog.Jwt.ServiceLayer.JwtService;
import com.group3.metaBlog.User.Repository.UserRepository;
import com.group3.metaBlog.Utils.MetaBlogResponse;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController{
    private final AuthenticationService AuthenticationService;

    public AuthenticationController(AuthenticationService service) {
        this.AuthenticationService = service;
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@NotNull @RequestBody RegisterRequestDto request) {
        try {
            return AuthenticationService.register(request);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(MetaBlogResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }
}
