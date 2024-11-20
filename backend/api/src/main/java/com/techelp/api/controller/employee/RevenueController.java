package com.techelp.api.controller.employee;

import com.techelp.api.dto.RevenueDto;
import com.techelp.api.dto.response.ApiResponse;
import com.techelp.api.dto.response.ErrorResponse;
import com.techelp.api.dto.response.SuccessResponse;
import com.techelp.api.exception.ValidationException;
import com.techelp.api.security.service.JwtTokenService;
import com.techelp.api.service.RevenueService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/employee")
@CrossOrigin
public class RevenueController {

    @Autowired
    private RevenueService revenueService;
    @Autowired
    private JwtTokenService jwtTokenService;

    private String extractEmailFromToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtTokenService.validateTokenAndRetrieveEmail(token);
        }
        return null;
    }

    @GetMapping("/revenue/by-category")
    private ResponseEntity<ApiResponse> getRevenueByCategory(@RequestHeader(name = "Authorization") String authHeader) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            List<RevenueDto> request = revenueService.getCategoryRevenues();
            SuccessResponse<List<RevenueDto>> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(), "Receitas por categoria!", Optional.of(request));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.NOT_FOUND.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @GetMapping("/revenue/by-date-range")
    private ResponseEntity<ApiResponse> getRevenueByDateRange(
            @RequestParam String startDate,
            @RequestParam String endDate,
            @RequestHeader(name = "Authorization") String authHeader) {
        String email = extractEmailFromToken(authHeader);
    
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }
    
        try {
            List<RevenueDto> request = revenueService.getDateRevenuesInRange(startDate, endDate);
            SuccessResponse<List<RevenueDto>> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(), "Receitas por data no intervalo!", Optional.of(request));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.NOT_FOUND.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }    
}