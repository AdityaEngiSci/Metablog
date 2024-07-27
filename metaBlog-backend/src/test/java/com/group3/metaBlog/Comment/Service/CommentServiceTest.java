package com.group3.metaBlog.Comment.Service;

import com.group3.metaBlog.Blog.Model.Blog;
import com.group3.metaBlog.Blog.Repository.IBlogRepository;
import com.group3.metaBlog.Comment.DataTransferObject.CreateCommentDto;
import com.group3.metaBlog.Comment.Model.Comment;
import com.group3.metaBlog.Comment.Repository.ICommentRepository;
import com.group3.metaBlog.Exception.MetaBlogException;
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

    @InjectMocks
    private CommentService commentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createCommentSuccessTest() {
        CreateCommentDto request = new CreateCommentDto("Test content", 1L, 1L);
        Blog blog = new Blog();
        blog.setId(1L);
        User user = new User();
        user.setId(1L);

        when(blogRepository.findById(1L)).thenReturn(Optional.of(blog));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        ResponseEntity<Object> response = commentService.createComment(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
        verify(commentRepository, times(1)).save(any(Comment.class));
    }

    @Test
    void createCommentBlogNotFoundTest() {
        CreateCommentDto request = new CreateCommentDto("Test content", 1L, 1L);

        when(blogRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(MetaBlogException.class, () -> {
            commentService.createComment(request);
        });

        assertEquals("Blog not found.", exception.getMessage());
        verify(commentRepository, times(0)).save(any(Comment.class));
    }

    @Test
    void createCommentUserNotFoundTest() {
        CreateCommentDto request = new CreateCommentDto("Test content", 1L, 1L);
        Blog blog = new Blog();
        blog.setId(1L);

        when(blogRepository.findById(1L)).thenReturn(Optional.of(blog));
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(MetaBlogException.class, () -> {
            commentService.createComment(request);
        });

        assertEquals("User not found.", exception.getMessage());
        verify(commentRepository, times(0)).save(any(Comment.class));
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
        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
        assertEquals(2, ((List<Comment>) ((MetaBlogResponse) response.getBody()).getData()).size());
    }

    @Test
    void getCommentsByBlogNotFoundTest() {
        Long blogId = 1L;

        when(blogRepository.findById(blogId)).thenReturn(Optional.empty());

        Exception exception = assertThrows(MetaBlogException.class, () -> {
            commentService.getCommentsByBlog(blogId);
        });

        assertEquals("Blog not found.", exception.getMessage());
        verify(commentRepository, times(0)).findByBlog(any(Blog.class));
    }
}
