package com.group3.metaBlog.Admin.Controller;

import com.group3.metaBlog.Admin.DTO.AdminRequestDto;
import com.group3.metaBlog.Admin.Service.AdminBlogService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/blogs")
@AllArgsConstructor
public class AdminBlogController {

    private final AdminBlogService adminBlogService;

    @GetMapping("/pending")
    public ResponseEntity<Object> getPendingBlogs() {
        return adminBlogService.getPendingBlogs();
    }

    @GetMapping("/approved")
    public ResponseEntity<Object> getApprovedBlogs() {
        return adminBlogService.getApprovedBlogs();
    }

    @GetMapping("/rejected")
    public ResponseEntity<Object> getRejectedBlogs() {
        return adminBlogService.getRejectedBlogs();
    }

    @PutMapping("/update-status")
    public ResponseEntity<Object> updateBlogStatus(@RequestBody AdminRequestDto requestDto) {
        return adminBlogService.updateBlogStatus(requestDto);
    }
}
