package com.techelp.api.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techelp.api.dto.response.ApiResponse;
import com.techelp.api.dto.response.SuccessResponse;
import java.util.Optional;

@RestController
@CrossOrigin
public class LogoutController {

    @GetMapping("/logout")
    public ResponseEntity<ApiResponse> logout() {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .path("/")
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .maxAge(0)
                .build();

        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new SuccessResponse<>(HttpStatus.OK.value(), "Deslogado!", Optional.empty()));
    }
}
