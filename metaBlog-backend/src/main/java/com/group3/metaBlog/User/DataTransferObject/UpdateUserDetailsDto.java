package com.group3.metaBlog.User.DataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserDetailsDto {
    private String email;
    private String bio;
    private String imageURL;
    private String githubURL;
    private String linkedinURL;
}
