package com.techelp.api.controller.client;

import com.techelp.api.dto.client.AssignEmployeeDto;
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

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/maintenance-requests")
@CrossOrigin
public class MaintenanceRequestController {

    @Autowired
    private MaintenanceRequestService maintenanceRequestService;
    @Autowired
    private JwtTokenService jwtTokenService;

    // Extrai o email do token JWT
    private String extractEmailFromToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtTokenService.validateTokenAndRetrieveEmail(token);
        }
        return null;
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createRequest(@RequestBody MaintenanceRequestDto requestDto,
            @RequestHeader(name = "Authorization") String authHeader) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            MaintenanceRequestDto createdRequest = maintenanceRequestService.createRequest(requestDto, email);
            SuccessResponse<MaintenanceRequestDto> successResponse = new SuccessResponse<>(
                    HttpStatus.CREATED.value(), "Solicitação de manutenção criada com sucesso",
                    Optional.of(createdRequest));
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PutMapping("/assign")
    public ResponseEntity<ApiResponse> assignEmployeeAndEstimate(@RequestBody AssignEmployeeDto assignDto) {
        try {
            MaintenanceRequestDto updatedRequest = maintenanceRequestService.assignEmployeeAndEstimate(assignDto);
            SuccessResponse<MaintenanceRequestDto> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(), "Orçamento realizado!", Optional.of(updatedRequest));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllRequests() {
        List<MaintenanceRequestDto> requests = maintenanceRequestService.getAllRequests();
        SuccessResponse<List<MaintenanceRequestDto>> successResponse = new SuccessResponse<>(
                HttpStatus.OK.value(), "Lista de solicitações de manutenção", Optional.of(requests));
        return ResponseEntity.ok(successResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getRequestById(@PathVariable int id,
            @RequestHeader(name = "Authorization") String authHeader) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            MaintenanceRequestDto request = maintenanceRequestService.getRequestByIdAndEmail(id, email);
            SuccessResponse<MaintenanceRequestDto> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(), "Solicitação de manutenção encontrada", Optional.of(request));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.NOT_FOUND.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<ApiResponse> getRequestHistory(@PathVariable int id,
            @RequestHeader(name = "Authorization") String authHeader) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            List<HistoryDto> historyRecords = maintenanceRequestService.getRequestHistoryByEmail(id, email);

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

    @GetMapping("/client")
    public ResponseEntity<ApiResponse> getRequestsByClient(@RequestHeader(name = "Authorization") String authHeader) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            List<MaintenanceRequestDto> requests = maintenanceRequestService.getRequestsByClientEmail(email);
            SuccessResponse<Map<String, List<MaintenanceRequestDto>>> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(), "Lista de solicitações do cliente",
                    Optional.of(Map.of("maintenanceRequestsList", requests)));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.NOT_FOUND.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}
