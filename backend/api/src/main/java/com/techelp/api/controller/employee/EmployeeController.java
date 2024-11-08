package com.techelp.api.controller.employee;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techelp.api.dto.EmployeeDto;
import com.techelp.api.dto.response.ApiResponse;
import com.techelp.api.dto.response.ErrorResponse;
import com.techelp.api.dto.response.SuccessResponse;
import com.techelp.api.exception.ValidationException;
import com.techelp.api.security.service.JwtTokenService;
import com.techelp.api.service.EmployeeService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private JwtTokenService jwtTokenService;

    private String extractEmailFromToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtTokenService.validateTokenAndRetrieveEmail(token);
        }
        return null;
    }

    @GetMapping("employee/maintenance-requests/all-employees")
    public ResponseEntity<ApiResponse> getAllEmployees(@RequestHeader(name = "Authorization") String authHeader) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            List<EmployeeDto> requests = employeeService.getAllEmployees(email);
            SuccessResponse<Map<String, List<EmployeeDto>>> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(), "Lista de solicitações do funcionário",
                    Optional.of(Map.of("allEmployeesList", requests)));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.NOT_FOUND.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

}