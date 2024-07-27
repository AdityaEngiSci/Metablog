package com.group3.metaBlog.Blog.Repository;

import com.group3.metaBlog.Blog.Model.Blog;
import com.group3.metaBlog.Enum.BlogStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IBlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByTitleContaining(String title);
    boolean existsByTitleAndContent(String title, String content);
    List<Blog> findByStatus(BlogStatus status);

    List<Blog> findByAuthorId(Long authorId); // Add this method to find blogs by author ID
}
