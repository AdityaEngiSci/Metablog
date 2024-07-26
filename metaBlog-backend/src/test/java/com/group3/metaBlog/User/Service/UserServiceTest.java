package com.group3.metaBlog.User.Service;

import com.group3.metaBlog.Blog.Model.Blog;
import com.group3.metaBlog.Exception.MetaBlogException;
import com.group3.metaBlog.Jwt.ServiceLayer.JwtService;
import com.group3.metaBlog.User.DataTransferObject.UpdateUserDetailsDto;
import com.group3.metaBlog.User.Model.User;
import com.group3.metaBlog.User.Repository.IUserRepository;
import com.group3.metaBlog.Utils.MetaBlogResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private IUserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private UserService userService;

    private String token;
    private String email;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        token = "valid-token";
        email = "test@example.com";
        user = createUser(email);
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(email);
    }

    private User createUser(String email) {
        User user = new User();
        user.setEmail(email);
        user.setUsername("testUser");
        return user;
    }

    @Test
    void getUserByIdTest() {
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.getUserById(userId, token);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
        assertEquals(user, ((MetaBlogResponse) response.getBody()).getData());
    }

    @Test
    void getUserByIdNotFoundTest() {
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        MetaBlogException exception = assertThrows(MetaBlogException.class, () -> {
            userService.getUserById(userId, token);
        });

        assertEquals("User not found.", exception.getMessage());
    }

    @Test
    void getUserDetailsTest() {
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.getUserDetails(token);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
        assertEquals(user, ((MetaBlogResponse) response.getBody()).getData());
    }

    @Test
    void getUserDetailsNotFoundTest() {
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        MetaBlogException exception = assertThrows(MetaBlogException.class, () -> {
            userService.getUserDetails(token);
        });

        assertEquals("User not found.", exception.getMessage());
    }

    @Test
    void updateUserDetailsTest() {
        UpdateUserDetailsDto request = new UpdateUserDetailsDto(email, "Test Bio", "http://test.com/image.jpg", "http://test.com/github", "http://test.com/linkedin");
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.updateUserDetails(request, token);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
        verify(userRepository).save(user);
    }

    @Test
    void updateUserDetailsNotFoundTest() {
        UpdateUserDetailsDto request = new UpdateUserDetailsDto(email, "Test Bio", "http://test.com/image.jpg", "http://test.com/github", "http://test.com/linkedin");
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());

        MetaBlogException exception = assertThrows(MetaBlogException.class, () -> {
            userService.updateUserDetails(request, token);
        });

        assertEquals("User not found.", exception.getMessage());
    }

    @Test
    void getUserBlogsTest() {
        user.setBlogs(Arrays.asList(new Blog(), new Blog()));
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.getUserBlogs(token);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
        assertEquals(user.getBlogs(), ((MetaBlogResponse) response.getBody()).getData());
    }

    @Test
    void getUserBlogsNotFoundTest() {
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        MetaBlogException exception = assertThrows(MetaBlogException.class, () -> {
            userService.getUserBlogs(token);
        });

        assertEquals("User not found.", exception.getMessage());
    }

    @Test
    void getUserSavedBlogsTest() {
        user.setSavedBlogs(Arrays.asList(new Blog(), new Blog()));
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.getUserSavedBlogs(token);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
        assertEquals(user.getSavedBlogs(), ((MetaBlogResponse) response.getBody()).getData());
    }

    @Test
    void getUserSavedBlogsNotFoundTest() {
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        MetaBlogException exception = assertThrows(MetaBlogException.class, () -> {
            userService.getUserSavedBlogs(token);
        });

        assertEquals("User not found.", exception.getMessage());
    }

    @Test
    void saveBlogTest() {
        Long blogId = 1L;
        Blog blog = new Blog();
        blog.setId(blogId);
        user.setBlogs(Arrays.asList(blog));
        user.setSavedBlogs(new ArrayList<>());
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.saveBlog(blogId, token);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
        verify(userRepository).save(user);
    }

    @Test
    void saveBlogNotFoundTest() {
        Long blogId = 1L;
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        MetaBlogException exception = assertThrows(MetaBlogException.class, () -> {
            userService.saveBlog(blogId, token);
        });

        assertEquals("User not found.", exception.getMessage());
    }

    @Test
    void removeSavedBlogSuccess() {
        Long blogId = 1L;
        Blog blog = new Blog();
        blog.setId(blogId);
        user.setSavedBlogs(new ArrayList<>(Arrays.asList(blog)));
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.removeSavedBlog(blogId, token);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
        assertEquals(blog, ((MetaBlogResponse) response.getBody()).getData());
        verify(userRepository).save(user);
    }

    @Test
    void removeSavedBlogUserNotFound() {
        Long blogId = 1L;
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        MetaBlogException exception = assertThrows(MetaBlogException.class, () -> {
            userService.removeSavedBlog(blogId, token);
        });

        assertEquals("User not found.", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void removeSavedBlogNotFound() {
        Long blogId = 2L;
        Blog blog = new Blog();
        blog.setId(1L);
        user.setSavedBlogs(new ArrayList<>(Arrays.asList(blog)));
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        MetaBlogException exception = assertThrows(MetaBlogException.class, () -> {
            userService.removeSavedBlog(blogId, token);
        });

        assertEquals("Saved blog not found.", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }
}
