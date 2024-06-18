package com.group3.metaBlog.Authentication.DataTransferObject;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class ResetPasswordRequestDto {
    @NotEmpty(message = "OTP is required")
    private String otp;

    @NotEmpty(message = "New password is required")
    private String newPassword;

    @NotEmpty(message = "Confirm password is required")
    private String confirmPassword;

    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
}
