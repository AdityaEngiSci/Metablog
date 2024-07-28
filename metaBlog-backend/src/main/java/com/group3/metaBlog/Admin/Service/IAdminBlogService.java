package com.group3.metaBlog.Admin.Service;

import com.group3.metaBlog.Admin.DTO.AdminRequestDto;
import org.springframework.http.ResponseEntity;

public interface IAdminBlogService {
    ResponseEntity<Object> getPendingBlogs();
    ResponseEntity<Object> getApprovedBlogs();
    ResponseEntity<Object> getRejectedBlogs();
    ResponseEntity<Object> updateBlogStatus(AdminRequestDto requestDto);
}
