package com.group3.metaBlog.Admin.Controller;

import com.group3.metaBlog.Admin.DTO.AdminRequestDto;
import com.group3.metaBlog.Admin.Service.AdminBlogService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/blogs")
@AllArgsConstructor
public class AdminBlogController {

    private final AdminBlogService adminBlogService;
    private static final Logger logger = LoggerFactory.getLogger(AdminBlogController.class);

    @GetMapping("/pending")
    public ResponseEntity<Object> getPendingBlogs(@RequestHeader("Authorization") String token) {
        ResponseEntity<Object> response = adminBlogService.getPendingBlogs();
        return response;
    }

    @GetMapping("/approved")
    public ResponseEntity<Object> getApprovedBlogs(@RequestHeader("Authorization") String token) {
        ResponseEntity<Object> response = adminBlogService.getApprovedBlogs();
        return response;
    }

    @GetMapping("/rejected")
    public ResponseEntity<Object> getRejectedBlogs(@RequestHeader("Authorization") String token) {
        ResponseEntity<Object> response = adminBlogService.getRejectedBlogs();
        return response;
    }

    @PutMapping("/update-status")
    public ResponseEntity<Object> updateBlogStatus(@RequestBody AdminRequestDto requestDto, @RequestHeader("Authorization") String token) {
        ResponseEntity<Object> response = adminBlogService.updateBlogStatus(requestDto);
        return response;
    }
}
