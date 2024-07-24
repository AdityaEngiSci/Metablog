package com.group3.metaBlog.User.Controller;

import com.group3.metaBlog.User.DataTransferObject.UpdateUserDetailsDto;
import com.group3.metaBlog.User.Service.IUserService;
import com.group3.metaBlog.Utils.MetaBlogResponse;
import jakarta.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final IUserService userService;
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Long id) {
        try {
            return userService.getUserById(id);
        } catch (IllegalArgumentException e) {
            logger.error("Error fetching user details for ID: {}", id);
            logger.error("Message of the error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(MetaBlogResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }
    @GetMapping("/details")
    public ResponseEntity<Object> getUserDetails(@NotNull @RequestParam String email) {
        try {
            return userService.getUserDetails(email);
        } catch (IllegalArgumentException e) {
            logger.error("Error fetching user details for email: {}", email);
            logger.error("Message of the error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(MetaBlogResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/update")
    public ResponseEntity<Object> updateUserDetails(@NotNull @RequestBody UpdateUserDetailsDto request) {
        try {
            return userService.updateUserDetails(request);
        } catch (IllegalArgumentException e) {
            logger.error("Error updating user details for email: {}", request.getEmail());
            logger.error("Message of the error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(MetaBlogResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/blogs")
    public ResponseEntity<Object> getUserBlogs(@NotNull @RequestParam String email) {
        try {
            return userService.getUserBlogs(email);
        } catch (IllegalArgumentException e) {
            logger.error("Error fetching user blogs for email: {}", email);
            logger.error("Message of the error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(MetaBlogResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/saved-blogs")
    public ResponseEntity<Object> getUserSavedBlogs(@NotNull @RequestParam String email) {
        try {
            return userService.getUserSavedBlogs(email);
        } catch (IllegalArgumentException e) {
            logger.error("Error fetching saved blogs for email: {}", email);
            logger.error("Message of the error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(MetaBlogResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/save-blog")
    public ResponseEntity<Object> saveBlog(@NotNull @RequestParam Long blogId, @NotNull @RequestParam String email) {
        try {
            return userService.saveBlog(blogId, email);
        } catch (IllegalArgumentException e) {
            logger.error("Error saving blog for email: {}", email);
            logger.error("Message of the error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(MetaBlogResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/remove-saved-blog")
    public ResponseEntity<Object> removeSavedBlog(@NotNull @RequestParam Long blogId, @NotNull @RequestParam String email) {
        try {
            return userService.removeSavedBlog(blogId, email);
        } catch (IllegalArgumentException e) {
            logger.error("Error removing saved blog for email: {}", email);
            logger.error("Message of the error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(MetaBlogResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }
}
