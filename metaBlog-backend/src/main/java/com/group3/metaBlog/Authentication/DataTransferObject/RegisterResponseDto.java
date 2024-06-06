package com.group3.metaBlog.Authentication.DataTransferObject;

import com.group3.metaBlog.Enum.Role;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RegisterResponseDto<T> {
    private String accessToken;
    private String refreshToken;
    private String role;
}
