package com.group3.metaBlog.Admin.Service;

import com.group3.metaBlog.Admin.DTO.AdminRequestDto;
import com.group3.metaBlog.Admin.DTO.AdminResponseDto;
import com.group3.metaBlog.Admin.Repository.IAdminBlogRepository;
import com.group3.metaBlog.Blog.Model.Blog;
import com.group3.metaBlog.Enum.BlogStatus;
import com.group3.metaBlog.User.Model.User;
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

class AdminServiceTest {

    private static final Long BLOG_ID_1 = 1L;
    private static final Long BLOG_ID_2 = 2L;
    private static final String APPROVE_STATUS = "APPROVE";
    private static final String REJECT_STATUS = "REJECT";
    private static final String INVALID_STATUS = "INVALID";
    private static final String PENDING_BLOG_1_TITLE = "Pending Blog 1";
    private static final String PENDING_BLOG_2_TITLE = "Pending Blog 2";
    private static final String APPROVED_BLOG_1_TITLE = "Approved Blog 1";
    private static final String APPROVED_BLOG_2_TITLE = "Approved Blog 2";
    private static final String REJECTED_BLOG_1_TITLE = "Rejected Blog 1";
    private static final String REJECTED_BLOG_2_TITLE = "Rejected Blog 2";
    private static final String TEST_EXCEPTION_MESSAGE = "Test exception";
    private static final String TEST_BLOG_TITLE = "Test Blog";
    private static final String TEST_USER_NAME = "testUser";
    private static final String TEST_CONTENT = "Test content";
    private static final String TEST_IMAGE_URL = "http://test.com/image.jpg";

    @Mock
    private IAdminBlogRepository adminBlogRepository;

    @InjectMocks
    private AdminBlogService adminBlogService;
    private AdminRequestDto requestDto;
    private Blog blog;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        requestDto = new AdminRequestDto();
        requestDto.setBlogId(1L);

        blog = new Blog();
        blog.setId(1L);
        blog.setStatus(BlogStatus.PENDING);
    }

    @Test
    void getPendingBlogsTest() {
        // Arrange
        List<Blog> pendingBlogs = Arrays.asList(
                createBlog(BLOG_ID_1, PENDING_BLOG_1_TITLE, BlogStatus.PENDING),
                createBlog(BLOG_ID_2, PENDING_BLOG_2_TITLE, BlogStatus.PENDING)
        );
        when(adminBlogRepository.findByStatus(BlogStatus.PENDING)).thenReturn(pendingBlogs);

        // Act
        ResponseEntity<Object> response = adminBlogService.getPendingBlogs();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
        assertEquals(2, ((List<AdminResponseDto>) ((MetaBlogResponse) response.getBody()).getData()).size());
    }

    @Test
    void getPendingBlogsExceptionTest() {
        // Arrange
        when(adminBlogRepository.findByStatus(BlogStatus.PENDING)).thenThrow(new RuntimeException(TEST_EXCEPTION_MESSAGE));

        // Act
        ResponseEntity<Object> response = adminBlogService.getPendingBlogs();

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertFalse(((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    void getApprovedBlogsTest() {
        // Arrange
        List<Blog> approvedBlogs = Arrays.asList(
                createBlog(BLOG_ID_1, APPROVED_BLOG_1_TITLE, BlogStatus.APPROVED),
                createBlog(BLOG_ID_2, APPROVED_BLOG_2_TITLE, BlogStatus.APPROVED)
        );
        when(adminBlogRepository.findByStatus(BlogStatus.APPROVED)).thenReturn(approvedBlogs);

        // Act
        ResponseEntity<Object> response = adminBlogService.getApprovedBlogs();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
        assertEquals(2, ((List<AdminResponseDto>) ((MetaBlogResponse) response.getBody()).getData()).size());
    }

    @Test
    void getApprovedBlogsExceptionTest() {
        // Arrange
        when(adminBlogRepository.findByStatus(BlogStatus.APPROVED)).thenThrow(new RuntimeException(TEST_EXCEPTION_MESSAGE));

        // Act
        ResponseEntity<Object> response = adminBlogService.getApprovedBlogs();

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertFalse(((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    void getRejectedBlogsTest() {
        // Arrange
        List<Blog> rejectedBlogs = Arrays.asList(
                createBlog(BLOG_ID_1, REJECTED_BLOG_1_TITLE, BlogStatus.REJECTED),
                createBlog(BLOG_ID_2, REJECTED_BLOG_2_TITLE, BlogStatus.REJECTED)
        );
        when(adminBlogRepository.findByStatus(BlogStatus.REJECTED)).thenReturn(rejectedBlogs);

        // Act
        ResponseEntity<Object> response = adminBlogService.getRejectedBlogs();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
        assertEquals(2, ((List<AdminResponseDto>) ((MetaBlogResponse) response.getBody()).getData()).size());
    }

    @Test
    void getRejectedBlogsExceptionTest() {
        // Arrange
        when(adminBlogRepository.findByStatus(BlogStatus.REJECTED)).thenThrow(new RuntimeException(TEST_EXCEPTION_MESSAGE));

        // Act
        ResponseEntity<Object> response = adminBlogService.getRejectedBlogs();

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertFalse(((MetaBlogResponse) response.getBody()).getSuccess());
    }

    @Test
    void updateBlogStatus_ApprovedStatus_Success() {
        requestDto.setStatus("APPROVED");
        when(adminBlogRepository.findById(1L)).thenReturn(Optional.of(blog));
        when(adminBlogRepository.save(any(Blog.class))).thenReturn(blog);

        ResponseEntity<Object> response = adminBlogService.updateBlogStatus(requestDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        MetaBlogResponse<?> metaBlogResponse = (MetaBlogResponse<?>) response.getBody();
        assertNotNull(metaBlogResponse);
        assertTrue(metaBlogResponse.getSuccess());
        assertEquals("Blog status updated successfully", metaBlogResponse.getMessage());
        assertEquals(BlogStatus.APPROVED, blog.getStatus());
        assertNotNull(blog.getReviewedOn());
        verify(adminBlogRepository).save(blog);
    }

    @Test
    void updateBlogStatus_RejectedStatus_Success() {
        requestDto.setStatus("REJECTED");
        when(adminBlogRepository.findById(1L)).thenReturn(Optional.of(blog));
        when(adminBlogRepository.save(any(Blog.class))).thenReturn(blog);

        ResponseEntity<Object> response = adminBlogService.updateBlogStatus(requestDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        MetaBlogResponse<?> metaBlogResponse = (MetaBlogResponse<?>) response.getBody();
        assertNotNull(metaBlogResponse);
        assertTrue(metaBlogResponse.getSuccess());
        assertEquals("Blog status updated successfully", metaBlogResponse.getMessage());
        assertEquals(BlogStatus.REJECTED, blog.getStatus());
        assertNotNull(blog.getReviewedOn());
        verify(adminBlogRepository).save(blog);
    }

    @Test
    void updateBlogStatus_InvalidStatus_BadRequest() {
        requestDto.setStatus("INVALID");
        when(adminBlogRepository.findById(1L)).thenReturn(Optional.of(blog));

        ResponseEntity<Object> response = adminBlogService.updateBlogStatus(requestDto);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        MetaBlogResponse<?> metaBlogResponse = (MetaBlogResponse<?>) response.getBody();
        assertNotNull(metaBlogResponse);
        assertFalse(metaBlogResponse.getSuccess());
        assertEquals("Invalid status", metaBlogResponse.getMessage());
        verify(adminBlogRepository, never()).save(any(Blog.class));
    }

    @Test
    void updateBlogStatus_BlogNotFound_ThrowsException() {
        when(adminBlogRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Object> response = adminBlogService.updateBlogStatus(requestDto);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        MetaBlogResponse<?> metaBlogResponse = (MetaBlogResponse<?>) response.getBody();
        assertNotNull(metaBlogResponse);
        assertFalse(metaBlogResponse.getSuccess());
        assertEquals("Error updating blog status", metaBlogResponse.getMessage());
        verify(adminBlogRepository, never()).save(any(Blog.class));
    }

    @Test
    void updateBlogStatus_ExceptionDuringExecution_InternalServerError() {
        when(adminBlogRepository.findById(1L)).thenThrow(new RuntimeException("Unexpected error"));

        ResponseEntity<Object> response = adminBlogService.updateBlogStatus(requestDto);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        MetaBlogResponse<?> metaBlogResponse = (MetaBlogResponse<?>) response.getBody();
        assertNotNull(metaBlogResponse);
        assertFalse(metaBlogResponse.getSuccess());
        assertEquals("Error updating blog status", metaBlogResponse.getMessage());
        verify(adminBlogRepository, never()).save(any(Blog.class));
    }

    private Blog createBlog(Long id, String title, BlogStatus status) {
        Blog blog = new Blog();
        blog.setId(id);
        blog.setTitle(title);
        blog.setContent(TEST_CONTENT);
        blog.setImageUrl(TEST_IMAGE_URL);
        blog.setCreatedOn((double) System.currentTimeMillis());
        blog.setStatus(status);
        User author = new User();
        author.setUsername(TEST_USER_NAME);
        blog.setAuthor(author);
        return blog;
    }
}
