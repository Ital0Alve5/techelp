package com.techelp.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techelp.api.security.service.JwtTokenService;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CheckAuth {

    private final JwtTokenService jwtTokenService;

    @GetMapping("/check-auth")
    public ResponseEntity<Map<String, Object>> checkAuth(
            @RequestHeader(name = "Authorization", required = false) String authHeader) {
        Map<String, Object> response = new HashMap<>();

        String token = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }

        if (token != null) {
            try {
                String loginEmail = jwtTokenService.validateTokenAndRetrieveEmail(token);
                if (loginEmail != null) {
                    String userType = jwtTokenService.getUserTypeFromToken(token);
                    String userName = jwtTokenService.getUserNameFromToken(token);

                    response.put("authenticated", true);
                    response.put("userType", userType);
                    response.put("userName", userName);
                    response.put("email", loginEmail);

                    return ResponseEntity.ok(response);
                }
            } catch (Exception e) {
                response.put("error", "Token inválido ou expirado");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        }

        response.put("authenticated", false);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}
