//package com.group3.metaBlog.Admin.Service;
//
//import com.group3.metaBlog.Admin.DTO.AdminRequestDto;
//import com.group3.metaBlog.Admin.DTO.AdminResponseDto;
//import com.group3.metaBlog.Admin.Repository.AdminBlogRepository;
//import com.group3.metaBlog.Blog.Model.Blog;
//import com.group3.metaBlog.Enum.BlogStatus;
//import com.group3.metaBlog.User.Model.User;
//import com.group3.metaBlog.Utils.MetaBlogResponse;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//class AdminServiceTest {
//
//    @Mock
//    private AdminBlogRepository adminBlogRepository;
//
//    @InjectMocks
//    private AdminBlogService adminBlogService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void getPendingBlogsTest() {
//        // Arrange
//        List<Blog> pendingBlogs = Arrays.asList(
//                createBlog(1L, "Pending Blog 1", BlogStatus.PENDING),
//                createBlog(2L, "Pending Blog 2", BlogStatus.PENDING)
//        );
//        when(adminBlogRepository.findByStatus(BlogStatus.PENDING)).thenReturn(pendingBlogs);
//
//        // Act
//        ResponseEntity<Object> response = adminBlogService.getPendingBlogs();
//
//        // Assert
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
//        assertEquals(2, ((List<AdminResponseDto>) ((MetaBlogResponse) response.getBody()).getData()).size());
//    }
//
//    @Test
//    void getPendingBlogsExceptionTest() {
//        // Arrange
//        when(adminBlogRepository.findByStatus(BlogStatus.PENDING)).thenThrow(new RuntimeException("Test exception"));
//
//        // Act
//        ResponseEntity<Object> response = adminBlogService.getPendingBlogs();
//
//        // Assert
//        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
//        assertFalse(((MetaBlogResponse) response.getBody()).getSuccess());
//    }
//
//    @Test
//    void getApprovedBlogsTest() {
//        // Arrange
//        List<Blog> approvedBlogs = Arrays.asList(
//                createBlog(1L, "Approved Blog 1", BlogStatus.APPROVED),
//                createBlog(2L, "Approved Blog 2", BlogStatus.APPROVED)
//        );
//        when(adminBlogRepository.findByStatus(BlogStatus.APPROVED)).thenReturn(approvedBlogs);
//
//        // Act
//        ResponseEntity<Object> response = adminBlogService.getApprovedBlogs();
//
//        // Assert
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
//        assertEquals(2, ((List<AdminResponseDto>) ((MetaBlogResponse) response.getBody()).getData()).size());
//    }
//
//    @Test
//    void getApprovedBlogsExceptionTest() {
//        // Arrange
//        when(adminBlogRepository.findByStatus(BlogStatus.APPROVED)).thenThrow(new RuntimeException("Test exception"));
//
//        // Act
//        ResponseEntity<Object> response = adminBlogService.getApprovedBlogs();
//
//        // Assert
//        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
//        assertFalse(((MetaBlogResponse) response.getBody()).getSuccess());
//    }
//
//    @Test
//    void getRejectedBlogsTest() {
//        // Arrange
//        List<Blog> rejectedBlogs = Arrays.asList(
//                createBlog(1L, "Rejected Blog 1", BlogStatus.REJECTED),
//                createBlog(2L, "Rejected Blog 2", BlogStatus.REJECTED)
//        );
//        when(adminBlogRepository.findByStatus(BlogStatus.REJECTED)).thenReturn(rejectedBlogs);
//
//        // Act
//        ResponseEntity<Object> response = adminBlogService.getRejectedBlogs();
//
//        // Assert
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
//        assertEquals(2, ((List<AdminResponseDto>) ((MetaBlogResponse) response.getBody()).getData()).size());
//    }
//
//    @Test
//    void getRejectedBlogsExceptionTest() {
//        // Arrange
//        when(adminBlogRepository.findByStatus(BlogStatus.REJECTED)).thenThrow(new RuntimeException("Test exception"));
//
//        // Act
//        ResponseEntity<Object> response = adminBlogService.getRejectedBlogs();
//
//        // Assert
//        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
//        assertFalse(((MetaBlogResponse) response.getBody()).getSuccess());
//    }
//
//    @Test
//    void updateBlogStatusApproveTest() {
//        // Arrange
//        AdminRequestDto requestDto = new AdminRequestDto(1L, "APPROVE");
//        Blog blog = createBlog(1L, "Test Blog", BlogStatus.PENDING);
//        when(adminBlogRepository.findById(1L)).thenReturn(Optional.of(blog));
//
//        // Act
//        ResponseEntity<Object> response = adminBlogService.updateBlogStatus(requestDto);
//
//        // Assert
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
//        verify(adminBlogRepository).save(argThat(savedBlog ->
//                savedBlog.getStatus() == BlogStatus.APPROVED && savedBlog.getReviewedOn() != null
//        ));
//    }
//
//    @Test
//    void updateBlogStatusRejectTest() {
//        // Arrange
//        AdminRequestDto requestDto = new AdminRequestDto(1L, "REJECT");
//        Blog blog = createBlog(1L, "Test Blog", BlogStatus.PENDING);
//        when(adminBlogRepository.findById(1L)).thenReturn(Optional.of(blog));
//
//        // Act
//        ResponseEntity<Object> response = adminBlogService.updateBlogStatus(requestDto);
//
//        // Assert
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertTrue(((MetaBlogResponse) response.getBody()).getSuccess());
//        verify(adminBlogRepository).save(argThat(savedBlog ->
//                savedBlog.getStatus() == BlogStatus.REJECTED && savedBlog.getReviewedOn() != null
//        ));
//    }
//
//    @Test
//    void updateBlogStatusInvalidStatusTest() {
//        // Arrange
//        AdminRequestDto requestDto = new AdminRequestDto(1L, "INVALID");
//        Blog blog = createBlog(1L, "Test Blog", BlogStatus.PENDING);
//        when(adminBlogRepository.findById(1L)).thenReturn(Optional.of(blog));
//
//        // Act
//        ResponseEntity<Object> response = adminBlogService.updateBlogStatus(requestDto);
//
//        // Assert
//        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
//        assertFalse(((MetaBlogResponse) response.getBody()).getSuccess());
//    }
//
//    @Test
//    void updateBlogStatusBlogNotFoundTest() {
//        // Arrange
//        AdminRequestDto requestDto = new AdminRequestDto(1L, "APPROVE");
//        when(adminBlogRepository.findById(1L)).thenReturn(Optional.empty());
//
//        // Act
//        ResponseEntity<Object> response = adminBlogService.updateBlogStatus(requestDto);
//
//        // Assert
//        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
//        assertFalse(((MetaBlogResponse) response.getBody()).getSuccess());
//    }
//
//    @Test
//    void updateBlogStatusExceptionTest() {
//        // Arrange
//        AdminRequestDto requestDto = new AdminRequestDto(1L, "APPROVE");
//        when(adminBlogRepository.findById(1L)).thenThrow(new RuntimeException("Test exception"));
//
//        // Act
//        ResponseEntity<Object> response = adminBlogService.updateBlogStatus(requestDto);
//
//        // Assert
//        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
//        assertFalse(((MetaBlogResponse) response.getBody()).getSuccess());
//    }
//
//    private Blog createBlog(Long id, String title, BlogStatus status) {
//        Blog blog = new Blog();
//        blog.setId(id);
//        blog.setTitle(title);
//        blog.setContent("Test content");
//        blog.setImageUrl("http://test.com/image.jpg");
//        blog.setCreatedOn((double) System.currentTimeMillis());
//        blog.setStatus(status);
//        User author = new User();
//        author.setUsername("testUser");
//        blog.setAuthor(author);
//        return blog;
//    }
//}