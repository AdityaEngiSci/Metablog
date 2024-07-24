package com.group3.metaBlog.User.Service;

import com.group3.metaBlog.User.DataTransferObject.UpdateUserDetailsDto;
import org.springframework.http.ResponseEntity;

public interface IUserService {
    ResponseEntity<Object> getUserById(Long id);
    ResponseEntity<Object> getUserDetails(String email);
    ResponseEntity<Object> updateUserDetails(UpdateUserDetailsDto request);
    ResponseEntity<Object> getUserBlogs(String email);
    ResponseEntity<Object> getUserSavedBlogs(String email);
    ResponseEntity<Object> saveBlog(Long blogId, String email);
    ResponseEntity<Object> removeSavedBlog(Long blogId, String email);
}
