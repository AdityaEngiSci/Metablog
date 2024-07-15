package com.group3.metaBlog.Blog.Model;

import com.group3.metaBlog.Enum.BlogStatus;
import com.group3.metaBlog.User.Model.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "blogs")
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    @Column(nullable = true)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id")
    private User author;

    private Double createdOn;

    private Double reviewedOn;

    @Column(nullable = false)
    private int viewCount = 0;

    @Enumerated(EnumType.STRING)
    private BlogStatus status;
}
