package com.group3.metaBlog.Authentication.Service;

import com.group3.metaBlog.Authentication.DataTransferObject.RegisterRequestDto;
import org.springframework.http.ResponseEntity;

public interface IAuthenticationService {

    ResponseEntity<Object> register(RegisterRequestDto request);

    ResponseEntity<Object> forgetPassword(String email);

    ResponseEntity<Object> findUser(String email);

}
