package com.group3.metaBlog.OTP.Service;

public interface IOTPService {
    Integer generateOTP();

    boolean registerOTP(Integer otp_code, Long userId);
}
