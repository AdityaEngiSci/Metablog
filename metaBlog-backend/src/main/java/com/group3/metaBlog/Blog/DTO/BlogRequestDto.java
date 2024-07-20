package com.group3.metaBlog.Blog.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlogRequestDto {
    private String title;
    private String content;
    private MultipartFile image;
}
