package com.techelp.api.controller.employee;

import com.techelp.api.dto.EmployeeDto;
import com.techelp.api.dto.client.HistoryDto;
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

import java.time.LocalDate;
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

    @GetMapping("employee/maintenance-requests/{id}")
    public ResponseEntity<ApiResponse> getRequestById(@PathVariable int id,
            @RequestHeader(name = "Authorization") String authHeader) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            MaintenanceRequestDto request = maintenanceRequestService.getRequestByIdAndEmployeeEmail(id, email);
            SuccessResponse<MaintenanceRequestDto> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(), "Solicitação de manutenção encontrada", Optional.of(request));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.NOT_FOUND.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @GetMapping("employee/maintenance-requests/{id}/history")
    public ResponseEntity<ApiResponse> getRequestHistory(@PathVariable int id,
            @RequestHeader(name = "Authorization") String authHeader) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            List<HistoryDto> historyRecords = maintenanceRequestService.getRequestHistoryByEmployeeEmail(id);

            if (historyRecords.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Erro na busca por histórico!", HttpStatus.NOT_FOUND.value(),
                                Map.of("history", "Solicitação de manutenção não encontrada para o usuário.")));
            }

            SuccessResponse<List<HistoryDto>> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(), "Histórico da solicitação encontrado!", Optional.of(historyRecords));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.NOT_FOUND.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
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

    @GetMapping("employee/maintenance-requests/date-range")
    public ResponseEntity<ApiResponse> getOpenRequestsByDateRange(@RequestParam String startDate,
            @RequestParam String endDate,
            @RequestHeader(name = "Authorization") String authHeader

    ) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {

            LocalDate convertStartDate = LocalDate.parse(startDate);
            LocalDate convertEndDate = LocalDate.parse(endDate);

            List<MaintenanceRequestDto> requests = maintenanceRequestService.getOpenRequestsByDateRange(email,
                    convertStartDate, convertEndDate);
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

    @PutMapping("employee/maintenance-requests/{id}/make-budget")
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

    @PutMapping("employee/maintenance-requests/{id}/redirect")
    public ResponseEntity<ApiResponse> redirectRequest(
            @PathVariable int id,
            @RequestHeader(name = "Authorization") String authHeader,
            @RequestBody EmployeeDto employeeDto) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            MaintenanceRequestDto approvedRequest = maintenanceRequestService.redirectRequestToAnotherEmployee(id,
                    email, employeeDto.email());
            SuccessResponse<MaintenanceRequestDto> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(),
                    String.format("Tarefa redirecionada para: %s", approvedRequest.getLastEmployee()),
                    Optional.of(approvedRequest));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PutMapping("employee/maintenance-requests/{id}/perform-maintenance")
    public ResponseEntity<ApiResponse> performMaintenance(@PathVariable int id,
            @RequestHeader(name = "Authorization") String authHeader,
            @RequestBody MaintenanceRequestDto performedMaintenance) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            MaintenanceRequestDto performRequest = maintenanceRequestService.performMaintenance(id,
                    email, performedMaintenance.getOrientation(), performedMaintenance.getMaintenanceDescription());
            SuccessResponse<MaintenanceRequestDto> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(),
                    String.format("Tarefa arrumada com sucesso!", performRequest.getLastEmployee()),
                    Optional.of(performRequest));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

    }

}