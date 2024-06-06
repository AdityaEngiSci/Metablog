package com.group3.metaBlog.Utils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;


@Data
@Builder
public class MetaBlogResponse<T> {
    private Boolean success;
    private String message;
    private T data;

}
