package com.group3.metaBlog.Admin.Service;

import com.group3.metaBlog.Admin.DTO.AdminResponseDto;
import com.group3.metaBlog.Admin.DTO.AdminRequestDto;
import com.group3.metaBlog.Enum.BlogStatus;
import com.group3.metaBlog.Admin.Repository.AdminBlogRepository;
import com.group3.metaBlog.Blog.Model.Blog;
import com.group3.metaBlog.Utils.MetaBlogResponse;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminBlogService {

    private final AdminBlogRepository adminBlogRepository;
    private static final Logger logger = LoggerFactory.getLogger(AdminBlogService.class);

    public ResponseEntity<Object> getPendingBlogs() {
        try {
            List<Blog> blogs = adminBlogRepository.findByStatus(BlogStatus.PENDING);
            List<AdminResponseDto> responseDtos = blogs.stream().map(blog -> AdminResponseDto.builder()
                    .id(blog.getId())
                    .title(blog.getTitle())
                    .content(blog.getContent())
                    .imageUrl(blog.getImageUrl())
                    .author(blog.getAuthor().getUsername())
                    .createdOn(blog.getCreatedOn())
                    .status(blog.getStatus().name())
                    .build()).toList();
            return ResponseEntity.ok(MetaBlogResponse.builder()
                    .success(true)
                    .message("Pending blogs retrieved successfully")
                    .data(responseDtos)
                    .build());
        } catch (Exception e) {
            logger.error("Error retrieving pending blogs: {}", e.getMessage());
            return new ResponseEntity<>(MetaBlogResponse.builder()
                    .success(false)
                    .message("Error retrieving pending blogs")
                    .build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getApprovedBlogs() {
        try {
            List<Blog> blogs = adminBlogRepository.findByStatus(BlogStatus.APPROVED);
            List<AdminResponseDto> responseDtos = blogs.stream().map(blog -> AdminResponseDto.builder()
                    .id(blog.getId())
                    .title(blog.getTitle())
                    .content(blog.getContent())
                    .imageUrl(blog.getImageUrl())
                    .author(blog.getAuthor().getUsername())
                    .createdOn(blog.getCreatedOn())
                    .status(blog.getStatus().name())
                    .build()).toList();
            return ResponseEntity.ok(MetaBlogResponse.builder()
                    .success(true)
                    .message("Approved blogs retrieved successfully")
                    .data(responseDtos)
                    .build());
        } catch (Exception e) {
            logger.error("Error retrieving approved blogs: {}", e.getMessage());
            return new ResponseEntity<>(MetaBlogResponse.builder()
                    .success(false)
                    .message("Error retrieving approved blogs")
                    .build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getRejectedBlogs() {
        try {
            List<Blog> blogs = adminBlogRepository.findByStatus(BlogStatus.REJECTED);
            List<AdminResponseDto> responseDtos = blogs.stream().map(blog -> AdminResponseDto.builder()
                    .id(blog.getId())
                    .title(blog.getTitle())
                    .content(blog.getContent())
                    .imageUrl(blog.getImageUrl())
                    .author(blog.getAuthor().getUsername())
                    .createdOn(blog.getCreatedOn())
                    .status(blog.getStatus().name())
                    .build()).toList();
            return ResponseEntity.ok(MetaBlogResponse.builder()
                    .success(true)
                    .message("Rejected blogs retrieved successfully")
                    .data(responseDtos)
                    .build());
        } catch (Exception e) {
            logger.error("Error retrieving rejected blogs: {}", e.getMessage());
            return new ResponseEntity<>(MetaBlogResponse.builder()
                    .success(false)
                    .message("Error retrieving rejected blogs")
                    .build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateBlogStatus(AdminRequestDto requestDto) {
        try {
            Blog blog = adminBlogRepository.findById(requestDto.getBlogId())
                    .orElseThrow(() -> new RuntimeException("Blog not found"));

            if ("APPROVE".equalsIgnoreCase(requestDto.getStatus())) {
                blog.setStatus(BlogStatus.APPROVED);
            } else if ("REJECT".equalsIgnoreCase(requestDto.getStatus())) {
                blog.setStatus(BlogStatus.REJECTED);
            } else {
                return new ResponseEntity<>(MetaBlogResponse.builder()
                        .success(false)
                        .message("Invalid status")
                        .build(), HttpStatus.BAD_REQUEST);
            }

            blog.setReviewedOn((double) System.currentTimeMillis());
            adminBlogRepository.save(blog);

            return ResponseEntity.ok(MetaBlogResponse.builder()
                    .success(true)
                    .message("Blog status updated successfully")
                    .data(null)
                    .build());
        } catch (Exception e) {
            logger.error("Error updating blog status: {}", e.getMessage());
            return new ResponseEntity<>(MetaBlogResponse.builder()
                    .success(false)
                    .message("Error updating blog status")
                    .build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
