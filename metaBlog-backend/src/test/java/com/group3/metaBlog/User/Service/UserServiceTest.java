package com.group3.metaBlog.User.Service;

import com.group3.metaBlog.Blog.Model.Blog;
import com.group3.metaBlog.Jwt.ServiceLayer.JwtService;
import com.group3.metaBlog.User.DataTransferObject.UserDetailsResponseDto;
import com.group3.metaBlog.User.Model.User;
import com.group3.metaBlog.User.Repository.IUserRepository;
import com.group3.metaBlog.Utils.MetaBlogResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
public class UserServiceTest {

    @Mock
    private IUserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private Logger logger;

    @InjectMocks
    private UserService userService;

    private User user;
    private Blog blog;
    private String token;

    @BeforeEach
    public void setUp() {
        user = new User();
        user.setEmail("test@example.com");
        user.setImageURL("imageURL");
        user.setPassword("password");
        user.setLinkedinURL("linkedinURL");
        user.setGithubURL("githubURL");
        user.setBio("bio");
        user.setBlogs(new ArrayList<>());
        user.setSavedBlogs(new ArrayList<>());

        blog = new Blog();
        blog.setId(1L);
        blog.setTitle("Test Blog");
        blog.setContent("Test Content");
        blog.setImageUrl("Test Image URL");
        blog.setAuthor(user);

        token = "testToken";
    }

    @Test
    public void GetUserByIdSuccessTest() {
        Long userId = 1L;
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.getUserById(userId, token);

        verify(userRepository).findById(userId);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(true, ((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    public void GetUserByIdUserNotFoundTest() {
        Long userId = 1L;
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        ResponseEntity<Object> response = userService.getUserById(userId, token);

        verify(userRepository).findById(userId);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals(false, ((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    public void GetUserDetailsSuccessTest() {
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.getUserDetails(token);

        verify(userRepository).findByEmail(user.getEmail());
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(true, ((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    public void GetUserDetailsUserNotFoundTest() {
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        ResponseEntity<Object> response = userService.getUserDetails(token);

        verify(userRepository).findByEmail(user.getEmail());
        assertEquals(400, response.getStatusCodeValue());
        assertEquals(false, ((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    public void UpdateUserDetailsSuccessTest() {
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        UserDetailsResponseDto userDetails = UserDetailsResponseDto.builder()
                .bio("new bio")
                .imageURL("new imageURL")
                .githubURL("new githubURL")
                .linkedinURL("new linkedinURL")
                .build();

        ResponseEntity<Object> response = userService.updateUserDetails(userDetails, token);

        verify(userRepository).save(user);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(true, ((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    public void UpdateUserDetailsUserNotFoundTest() {
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        UserDetailsResponseDto userDetails = UserDetailsResponseDto.builder()
                .bio("new bio")
                .imageURL("new imageURL")
                .githubURL("new githubURL")
                .linkedinURL("new linkedinURL")
                .build();

        ResponseEntity<Object> response = userService.updateUserDetails(userDetails, token);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals(false, ((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    public void GetUserBlogsSuccessTest() {
        user.getBlogs().add(blog);
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.getUserBlogs(token);

        verify(userRepository).findByEmail(user.getEmail());
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(true, ((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    public void GetUserBlogsUserNotFoundTest() {
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        ResponseEntity<Object> response = userService.getUserBlogs(token);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals(false, ((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    public void GetUserSavedBlogsSuccessTest() {
        user.getSavedBlogs().add(blog);
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.getUserSavedBlogs(token);

        verify(userRepository).findByEmail(user.getEmail());
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(true, ((MetaBlogResponse) response.getBody()).getSuccess());
    }
    @Test
    public void SaveBlogBlogNotFoundTest() {
        user.getBlogs().clear(); // Ensure the user has no blogs
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.saveBlog(1L, token);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals(false, ((MetaBlogResponse) response.getBody()).getSuccess());
        assertEquals("Blog not found.", ((MetaBlogResponse) response.getBody()).getMessage());
    }
    @Test
    public void RemoveSavedBlogSavedBlogNotFoundTest() {
        user.getSavedBlogs().clear(); // Ensure the user has no saved blogs
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.removeSavedBlog(1L, token);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals(false, ((MetaBlogResponse) response.getBody()).getSuccess());
        assertEquals("Saved blog not found.", ((MetaBlogResponse) response.getBody()).getMessage());
    }

    @Test
    public void GetUserSavedBlogsUserNotFoundTest() {
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        ResponseEntity<Object> response = userService.getUserSavedBlogs(token);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals(false, ((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    public void SaveBlogSuccessTest() {
        user.getBlogs().add(blog);
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.saveBlog(blog.getId(), token);

        verify(userRepository).save(user);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(true, ((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    public void SaveBlogUserNotFoundTest() {
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        ResponseEntity<Object> response = userService.saveBlog(blog.getId(), token);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals(false, ((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    public void RemoveSavedBlogSuccessTest() {
        user.getSavedBlogs().add(blog);
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = userService.removeSavedBlog(blog.getId(), token);

        verify(userRepository).save(user);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(true, ((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    public void RemoveSavedBlogUserNotFoundTest() {
        when(jwtService.extractUserEmailFromToken(token)).thenReturn(user.getEmail());
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        ResponseEntity<Object> response = userService.removeSavedBlog(blog.getId(), token);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals(false, ((MetaBlogResponse) response.getBody()).getSuccess());
    }
}
