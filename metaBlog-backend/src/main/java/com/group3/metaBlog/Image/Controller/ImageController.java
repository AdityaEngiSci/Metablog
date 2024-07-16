package com.group3.metaBlog.Image.Controller;

import com.group3.metaBlog.Exception.MetaBlogException;
import com.group3.metaBlog.Image.Model.Image;
import com.group3.metaBlog.Image.Service.ImageService;
import com.group3.metaBlog.Utils.MetaBlogResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/images")
public class ImageController {
    private ImageService imageService;

    @PostMapping("/upload-profile-image")
    public ResponseEntity<Object> uploadProfileImage(@RequestParam("file") MultipartFile file,@RequestHeader("Authorization") String token) {
        try {
            Image image = imageService.uploadImage(file);
            return imageService.setUserUrl(image.getUrl(),token);
        } catch (IllegalArgumentException | MetaBlogException e) {
            return ResponseEntity.badRequest().body(MetaBlogResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/get-profile-image")
    public ResponseEntity<Object> getImage(@RequestHeader("Authorization") String token) {
        try {
            return imageService.getProfileImage(token);
        } catch (IllegalArgumentException | MetaBlogException e) {
            return ResponseEntity.badRequest().body(MetaBlogResponse.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build());
        }
    }
}
