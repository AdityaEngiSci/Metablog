package com.group3.metaBlog.User.Service;

import com.group3.metaBlog.Blog.Model.Blog;
import com.group3.metaBlog.Exception.MetaBlogException;
import com.group3.metaBlog.Jwt.ServiceLayer.JwtService;
import com.group3.metaBlog.User.DataTransferObject.UpdateUserDetailsDto;
import com.group3.metaBlog.User.Model.User;
import com.group3.metaBlog.User.Repository.IUserRepository;
import com.group3.metaBlog.Utils.MetaBlogResponse;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements IUserService {

    private final IUserRepository userRepository;
    private final JwtService jwtService;
    private final Logger logger = LoggerFactory.getLogger(UserService.class);

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    logger.error("User not found with email: {}", email);
                    return new MetaBlogException("User not found.");
                });
    }

    @Override
    public ResponseEntity<Object> getUserById(Long id, String token) {
        String email = jwtService.extractUserEmailFromToken(token);
        logger.info("Fetching user details for ID: {} with email: {}", id, email);
        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("User not found with ID: {}", id);
                    return new MetaBlogException("User not found.");
                });

        return ResponseEntity.ok().body(MetaBlogResponse.builder()
                .success(true)
                .message("User details fetched successfully.")
                .data(user)
                .build());
    }

    @Override
    public ResponseEntity<Object> getUserDetails(String token) {
        String email = jwtService.extractUserEmailFromToken(token);
        logger.info("Fetching user details for email: {}", email);
        User user = findUserByEmail(email);

        return ResponseEntity.ok().body(MetaBlogResponse.builder()
                .success(true)
                .message("User details fetched successfully.")
                .data(user)
                .build());
    }

    @Override
    public ResponseEntity<Object> updateUserDetails(UpdateUserDetailsDto request, String token) {
        String email = jwtService.extractUserEmailFromToken(token);
        logger.info("Updating user details for email: {}", email);
        User user = findUserByEmail(email);

        user.setBio(request.getBio());
        user.setImageURL(request.getImageURL());
        user.setGithubURL(request.getGithubURL());
        user.setLinkedinURL(request.getLinkedinURL());

        userRepository.save(user);
        return ResponseEntity.ok().body(MetaBlogResponse.builder()
                .success(true)
                .message("User details updated successfully.")
                .data(user)
                .build());
    }

    @Override
    public ResponseEntity<Object> getUserBlogs(String token) {
        String email = jwtService.extractUserEmailFromToken(token);
        logger.info("Fetching blogs for user with email: {}", email);
        User user = findUserByEmail(email);

        List<Blog> blogs = user.getBlogs();
        return ResponseEntity.ok().body(MetaBlogResponse.builder()
                .success(true)
                .message("User blogs fetched successfully.")
                .data(blogs)
                .build());
    }

    @Override
    public ResponseEntity<Object> getUserSavedBlogs(String token) {
        String email = jwtService.extractUserEmailFromToken(token);
        logger.info("Fetching saved blogs for user with email: {}", email);
        User user = findUserByEmail(email);

        List<Blog> savedBlogs = user.getSavedBlogs();
        return ResponseEntity.ok().body(MetaBlogResponse.builder()
                .success(true)
                .message("User saved blogs fetched successfully.")
                .data(savedBlogs)
                .build());
    }

    @Override
    public ResponseEntity<Object> saveBlog(Long blogId, String token) {
        String email = jwtService.extractUserEmailFromToken(token);
        logger.info("Saving blog with id: {} for user with email: {}", blogId, email);
        User user = findUserByEmail(email);

        Blog blog = user.getBlogs().stream().filter(b -> b.getId().equals(blogId))
                .findFirst()
                .orElseThrow(() -> {
                    logger.error("Blog not found with id: {}", blogId);
                    return new MetaBlogException("Blog not found.");
                });

        user.getSavedBlogs().add(blog);
        userRepository.save(user);

        return ResponseEntity.ok().body(MetaBlogResponse.builder()
                .success(true)
                .message("Blog saved successfully.")
                .data(blog)
                .build());
    }

    @Override
    public ResponseEntity<Object> removeSavedBlog(Long blogId, String token) {
        String email = jwtService.extractUserEmailFromToken(token);
        logger.info("Removing saved blog with id: {} for user with email: {}", blogId, email);
        User user = findUserByEmail(email);

        Blog blog = user.getSavedBlogs().stream().filter(b -> b.getId().equals(blogId))
                .findFirst()
                .orElseThrow(() -> {
                    logger.error("Saved blog not found with id: {}", blogId);
                    return new MetaBlogException("Saved blog not found.");
                });

        user.getSavedBlogs().remove(blog);
        userRepository.save(user);

        return ResponseEntity.ok().body(MetaBlogResponse.builder()
                .success(true)
                .message("Saved blog removed successfully.")
                .data(blog)
                .build());
    }
}
