package com.group3.metaBlog.Comment.Service;

import com.group3.metaBlog.Blog.Model.Blog;
import com.group3.metaBlog.Blog.Repository.IBlogRepository;
import com.group3.metaBlog.Comment.DataTransferObject.CreateCommentDto;
import com.group3.metaBlog.Comment.Model.Comment;
import com.group3.metaBlog.Comment.Repository.ICommentRepository;
import com.group3.metaBlog.Exception.MetaBlogException;
import com.group3.metaBlog.Jwt.ServiceLayer.JwtService;
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

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CommentServiceTest {

    @Mock
    private ICommentRepository commentRepository;

    @Mock
    private IBlogRepository blogRepository;

    @Mock
    private IUserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private CommentService commentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createCommentSuccessTest() {
        CreateCommentDto request = new CreateCommentDto("Test content", 1L);
        String token = "Bearer testToken";
        String userEmail = "test@example.com";
        Blog blog = new Blog();
        blog.setId(1L);
        User user = new User();
        user.setEmail(userEmail);

        when(jwtService.extractUserEmailFromToken("testToken")).thenReturn(userEmail);
        when(blogRepository.findById(1L)).thenReturn(Optional.of(blog));
        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(user));
        when(commentRepository.save(any(Comment.class))).thenAnswer(i -> i.getArguments()[0]);

        ResponseEntity<Object> response = commentService.createComment(request, token);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
        verify(commentRepository, times(1)).save(any(Comment.class));
    }

    @Test
    void createCommentBlogNotFoundTest() {
        CreateCommentDto request = new CreateCommentDto("Test content", 1L);
        String token = "Bearer testToken";
        String userEmail = "test@example.com";

        when(jwtService.extractUserEmailFromToken("testToken")).thenReturn(userEmail);
        when(blogRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Object> response = commentService.createComment(request, token);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        MetaBlogResponse responseBody = (MetaBlogResponse) response.getBody();
        assertNotNull(responseBody);
        assertEquals("Blog not found.", responseBody.getMessage());
        assertFalse(responseBody.getSuccess());

        verify(commentRepository, never()).save(any(Comment.class));
    }

    @Test
    void createCommentUserNotFoundTest() {
        CreateCommentDto request = new CreateCommentDto("Test content", 1L);
        String token = "Bearer testToken";
        String userEmail = "test@example.com";

        when(jwtService.extractUserEmailFromToken("testToken")).thenReturn(userEmail);
        when(blogRepository.findById(1L)).thenReturn(Optional.of(new Blog()));
        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.empty());

        ResponseEntity<Object> response = commentService.createComment(request, token);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        MetaBlogResponse responseBody = (MetaBlogResponse) response.getBody();
        assertNotNull(responseBody);
        assertEquals("User not found.", responseBody.getMessage());
        assertFalse(responseBody.getSuccess());

        verify(commentRepository, never()).save(any(Comment.class));
    }

    @Test
    void getCommentsByBlogSuccessTest() {
        Long blogId = 1L;
        Blog blog = new Blog();
        blog.setId(blogId);
        List<Comment> comments = Arrays.asList(new Comment(), new Comment());

        when(blogRepository.findById(blogId)).thenReturn(Optional.of(blog));
        when(commentRepository.findByBlog(blog)).thenReturn(comments);

        ResponseEntity<Object> response = commentService.getCommentsByBlog(blogId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((MetaBlogResponse<?>) response.getBody()).getSuccess());
        assertEquals(2, ((List<Comment>) ((MetaBlogResponse) response.getBody()).getData()).size());
    }

    @Test
    void getCommentsByBlogNotFoundTest() {
        Long blogId = 1L;

        when(blogRepository.findById(blogId)).thenReturn(Optional.empty());

        ResponseEntity<Object> response = commentService.getCommentsByBlog(blogId);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

        MetaBlogResponse responseBody = (MetaBlogResponse) response.getBody();
        assertNotNull(responseBody);
        assertEquals("Blog not found.", responseBody.getMessage());
        assertFalse(responseBody.getSuccess());

        verify(commentRepository, never()).findByBlog(any(Blog.class));
    }

    @Test
    void createCommentInvalidTokenTest() {
        CreateCommentDto request = new CreateCommentDto("Test content", 1L);
        String token = "Bearer InvalidToken";

        when(jwtService.extractUserEmailFromToken("InvalidToken")).thenThrow(new MetaBlogException("Invalid token"));

        ResponseEntity<Object> response = commentService.createComment(request, token);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        MetaBlogResponse responseBody = (MetaBlogResponse) response.getBody();
        assertNotNull(responseBody);
        assertEquals("Invalid token", responseBody.getMessage());
        assertFalse(responseBody.getSuccess());

        verify(commentRepository, never()).save(any(Comment.class));
    }
}