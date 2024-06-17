package com.group3.metaBlog.Authentication.Service;

import com.group3.metaBlog.Authentication.DataTransferObject.RegisterRequestDto;
import org.springframework.http.ResponseEntity;

public interface IAuthenticationService {

    public ResponseEntity<Object> register(RegisterRequestDto request);
    public ResponseEntity<Object> forgetPassword(String email);
    public ResponseEntity<Object> findUser(String email);

}
