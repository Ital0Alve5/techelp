package com.techelp.api.controller.employee;

import com.techelp.api.dto.client.MaintenanceRequestDto;
import com.techelp.api.dto.response.ApiResponse;
import com.techelp.api.dto.response.ErrorResponse;
import com.techelp.api.dto.response.SuccessResponse;
import com.techelp.api.exception.ValidationException;
import com.techelp.api.security.service.JwtTokenService;
import com.techelp.api.service.MaintenanceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class EmployeeMaintenanceRequestController {

    @Autowired
    private MaintenanceRequestService maintenanceRequestService;
    @Autowired
    private JwtTokenService jwtTokenService;

    private String extractEmailFromToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtTokenService.validateTokenAndRetrieveEmail(token);
        }
        return null;
    }

    @GetMapping("employee/maintenance-requests/all")
    public ResponseEntity<ApiResponse> getAllRequests(@RequestHeader(name = "Authorization") String authHeader) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            List<MaintenanceRequestDto> requests = maintenanceRequestService.getAllRequestsOfEmployee(email);
            SuccessResponse<Map<String, List<MaintenanceRequestDto>>> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(), "Lista de solicitações do funcionário",
                    Optional.of(Map.of("maintenanceRequestsList", requests)));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.NOT_FOUND.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @GetMapping("employee/maintenance-requests/open")
    public ResponseEntity<ApiResponse> getOpenRequests() {
        try {
            List<MaintenanceRequestDto> requests = maintenanceRequestService.getOpenRequests();
            SuccessResponse<Map<String, List<MaintenanceRequestDto>>> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(), "Lista de solicitações abertas",
                    Optional.of(Map.of("maintenanceRequestsList", requests)));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.NOT_FOUND.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @GetMapping("employee/maintenance-requests/open-today")
    public ResponseEntity<ApiResponse> getTodayOpenRequests() {
        try {
            List<MaintenanceRequestDto> requests = maintenanceRequestService.getTodayOpenRequests();
            SuccessResponse<Map<String, List<MaintenanceRequestDto>>> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(), "Lista de solicitações abertas hoje",
                    Optional.of(Map.of("maintenanceRequestsList", requests)));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.NOT_FOUND.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PutMapping("/employee/maintenance-requests/{id}/make-budget")
    public ResponseEntity<ApiResponse> makeBudget(
            @PathVariable int id,
            @RequestHeader(name = "Authorization") String authHeader,
            @RequestBody MaintenanceRequestDto approvalDto) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            MaintenanceRequestDto approvedRequest = maintenanceRequestService.makeBudget(id, email, approvalDto);
            SuccessResponse<MaintenanceRequestDto> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(),
                    String.format("Serviço orçado no Valor R$ %.2f", approvedRequest.getBudget()),
                    Optional.of(approvedRequest));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}