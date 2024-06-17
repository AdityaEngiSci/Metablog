package com.group3.metaBlog.OTP.Controller;

import com.group3.metaBlog.OTP.DataTransferObject.VerifyOTPRequestDto;
import com.group3.metaBlog.OTP.Service.OTPService;
import com.group3.metaBlog.Utils.MetaBlogResponse;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/otp")
public class OTPController {

    private final OTPService otpService;

    public OTPController(OTPService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("/verify")
    public ResponseEntity<Object> verifyOTP(@NotNull @RequestBody VerifyOTPRequestDto verifyOTPRequest) {
        String email = verifyOTPRequest.getEmail();
        Integer otp = verifyOTPRequest.getOtp();
           if(otp.toString().length() != 6){
               return ResponseEntity.badRequest().body(MetaBlogResponse.builder()
                       .success(false)
                       .message("Invalid OTP")
                       .build());
           }
            return otpService.verifyOTP(otp, email);
    }

}
