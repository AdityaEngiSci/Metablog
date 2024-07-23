package com.group3.metaBlog.Blog.Controller;

import com.group3.metaBlog.Blog.DTO.BlogRequestDto;
import com.group3.metaBlog.Blog.Service.BlogService;
import com.group3.metaBlog.Utils.MetaBlogResponse;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/blogs")
@AllArgsConstructor
public class BlogController {

    private final BlogService blogService;
    private static final Logger logger = LoggerFactory.getLogger(BlogController.class);

    @PostMapping(path="/create-blog")
    public ResponseEntity<Object> createBlog(@ModelAttribute BlogRequestDto blogRequestDto, @RequestHeader("Authorization") String token) {
        if (token == null || token.isEmpty()) {
            logger.error("Token not provided");
            return ResponseEntity.status(401).body(MetaBlogResponse.builder()
                    .success(false)
                    .message("Token not provided")
                    .build());
        }

        logger.info("Creating blog with token: {}", token);
        ResponseEntity<Object> blogResponse = blogService.createBlog(blogRequestDto, token.replace("Bearer ", ""));
        return blogResponse;
    }

    @GetMapping("/all-blogs")
    public ResponseEntity<Object> getAllBlogs(@RequestHeader("Authorization") String token) {
        ResponseEntity<Object> response = blogService.getAllBlogs();
        return response;
    }

    @GetMapping("/my-blogs")
    public ResponseEntity<Object> getBlogsByUser(@RequestHeader("Authorization") String token) {
        if (token == null || token.isEmpty()) {
            logger.error("Token not provided");
            return ResponseEntity.status(401).body(MetaBlogResponse.builder()
                    .success(false)
                    .message("Token not provided")
                    .build());
        }

        logger.info("Fetching blogs for user with token: {}", token);
        return blogService.getBlogsByUser(token.replace("Bearer ", ""));
    }

    @GetMapping("/search")
    public ResponseEntity<Object> searchBlogsByTitle(@RequestParam String title, @RequestHeader("Authorization") String token) {
        ResponseEntity<Object> response = blogService.searchBlogsByTitle(title);
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getBlogById(@PathVariable Long id) {
        ResponseEntity<Object> response = blogService.getBlogById(id);
        return response;
    }
}
