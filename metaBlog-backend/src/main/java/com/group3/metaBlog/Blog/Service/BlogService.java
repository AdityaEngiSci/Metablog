package com.group3.metaBlog.Blog.Service;

import com.group3.metaBlog.Blog.DTO.BlogRequestDto;
import com.group3.metaBlog.Blog.DTO.BlogResponseDto;
import com.group3.metaBlog.Blog.Model.Blog;
import com.group3.metaBlog.Blog.Repository.BlogRepository;
import com.group3.metaBlog.Enum.BlogStatus;
import com.group3.metaBlog.Image.Model.Image;
import com.group3.metaBlog.Image.Service.ImageService;
import com.group3.metaBlog.Jwt.ServiceLayer.JwtService;
import com.group3.metaBlog.User.Model.User;
import com.group3.metaBlog.User.Repository.IUserRepository;
import com.group3.metaBlog.Utils.MetaBlogResponse;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;
    private final IUserRepository userRepository;
    private final JwtService jwtService;
    private final ImageService imageService;
    private static final Logger logger = LoggerFactory.getLogger(BlogService.class);

    public ResponseEntity<Object> createBlog(BlogRequestDto blogRequestDto, String token) {
        try {
            String userEmail = jwtService.extractUserEmailFromToken(token);
            Optional<User> userOptional = userRepository.findByEmail(userEmail);
            if (!userOptional.isPresent()) {
                logger.error("User not found: {}", userEmail);
                return new ResponseEntity<>(MetaBlogResponse.builder()
                        .success(false)
                        .message("User not found")
                        .build(), HttpStatus.NOT_FOUND);
            }
            User user = userOptional.get();

            if (blogRepository.existsByTitleAndContent(blogRequestDto.getTitle(), blogRequestDto.getContent())) {
                logger.error("Blog already exists with title: {} and content: {}", blogRequestDto.getTitle(), blogRequestDto.getContent());
                return new ResponseEntity<>(MetaBlogResponse.builder()
                        .success(false)
                        .message("Blog already exists")
                        .build(), HttpStatus.CONFLICT);
            }

            Image blog_image = imageService.uploadImage(blogRequestDto.getImage());
            String blog_image_url = blog_image.getUrl();

            Blog blog = Blog.builder()
                    .title(blogRequestDto.getTitle())
                    .content(blogRequestDto.getContent())
                    .imageUrl(blog_image_url)
                    .createdOn((double) System.currentTimeMillis())
                    .status(BlogStatus.PENDING)
                    .build();
            blog.setAuthor(user);

            blogRepository.save(blog);
            logger.info("Blog created: {}", blog.getId());

            BlogResponseDto responseDto = BlogResponseDto.builder()
                    .id(blog.getId())
                    .title(blog.getTitle())
                    .content(blog.getContent())
                    .imageUrl(blog.getImageUrl())
                    .author(blog.getAuthor().getUsername())
                    .createdOn(blog.getCreatedOn())
                    .status(blog.getStatus().name())
                    .build();

            return ResponseEntity.ok(MetaBlogResponse.builder()
                    .success(true)
                    .message("Blog created successfully")
                    .data(responseDto)
                    .build());
        } catch (Exception e) {
            logger.error("Error creating blog: {}", e.getMessage());
            return new ResponseEntity<>(MetaBlogResponse.builder()
                    .success(false)
                    .message("Error creating blog")
                    .build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getAllBlogs() {
        try {
            List<Blog> blogs = blogRepository.findAll();
            logger.info("Retrieved {} blogs", blogs.size());
            List<BlogResponseDto> responseDtos = blogs.stream().map(blog -> BlogResponseDto.builder()
                    .id(blog.getId())
                    .title(blog.getTitle())
                    .content(blog.getContent())
                    .imageUrl(blog.getImageUrl())
                    .author(blog.getAuthor().getUsername())
                    .status(blog.getStatus().toString())
                    .createdOn(blog.getCreatedOn())
                    .build()).toList();
            return ResponseEntity.ok(MetaBlogResponse.builder()
                    .success(true)
                    .message("Blogs retrieved successfully")
                    .data(responseDtos)
                    .build());
        } catch (Exception e) {
            logger.error("Error retrieving blogs: {}", e.getMessage());
            return new ResponseEntity<>(MetaBlogResponse.builder()
                    .success(false)
                    .message("Error retrieving blogs")
                    .build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getBlogsByUser(String token) {
        try {
            String userEmail = jwtService.extractUserEmailFromToken(token);
            Optional<User> userOptional = userRepository.findByEmail(userEmail);
            if (!userOptional.isPresent()) {
                logger.error("User not found: {}", userEmail);
                return new ResponseEntity<>(MetaBlogResponse.builder()
                        .success(false)
                        .message("User not found")
                        .build(), HttpStatus.NOT_FOUND);
            }
            User user = userOptional.get();
            List<Blog> blogs = blogRepository.findByAuthorId(user.getId());
            logger.info("Retrieved {} blogs for user {}", blogs.size(), user.getUsername());
            List<BlogResponseDto> responseDtos = blogs.stream().map(blog -> BlogResponseDto.builder()
                    .id(blog.getId())
                    .title(blog.getTitle())
                    .content(blog.getContent())
                    .imageUrl(blog.getImageUrl())
                    .author(blog.getAuthor().getUsername())
                    .status(blog.getStatus().name())
                    .createdOn(blog.getCreatedOn())
                    .build()).toList();
            return ResponseEntity.ok(MetaBlogResponse.builder()
                    .success(true)
                    .message("Blogs retrieved successfully")
                    .data(responseDtos)
                    .build());
        } catch (Exception e) {
            logger.error("Error retrieving user's blogs: {}", e.getMessage());
            return new ResponseEntity<>(MetaBlogResponse.builder()
                    .success(false)
                    .message("Error retrieving user's blogs")
                    .build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<Object> searchBlogsByTitle(String title) {
        try {
            List<Blog> blogs = blogRepository.findByTitleContaining(title);
            logger.info("Blogs retrieved with title containing '{}': {}", title, blogs.size());

            // Increment like count for each retrieved blog
            blogs.forEach(blog -> {
                blog.setViewCount(blog.getViewCount() + 1);
                blogRepository.save(blog);
            });

            List<BlogResponseDto> responseDtos = blogs.stream().map(blog -> BlogResponseDto.builder()
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
                    .message("Blogs retrieved successfully")
                    .data(responseDtos)
                    .build());
        } catch (Exception e) {
            logger.error("Error searching blogs by title: {}", e.getMessage());
            return new ResponseEntity<>(MetaBlogResponse.builder()
                    .success(false)
                    .message("Error searching blogs")
                    .build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
