package com.techelp.api.controller.client;

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
@RequestMapping("/api")
@CrossOrigin
public class ClientMaintenanceRequestController {

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

    @PostMapping("client/maintenance-requests/create")
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
                    HttpStatus.CREATED.value(), "Solicitação criada com sucesso",
                    Optional.of(createdRequest));
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @GetMapping("/maintenance-requests")
    public ResponseEntity<ApiResponse> getAllRequests() {
        List<MaintenanceRequestDto> requests = maintenanceRequestService.getAllRequests();
        SuccessResponse<List<MaintenanceRequestDto>> successResponse = new SuccessResponse<>(
                HttpStatus.OK.value(), "Lista de solicitações de manutenção", Optional.of(requests));
        return ResponseEntity.ok(successResponse);
    }

    @GetMapping("client/maintenance-requests/{id}")
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

    @GetMapping("client/maintenance-requests/{id}/history")
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

    @GetMapping("client/maintenance-requests")
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

    @PutMapping("/client/maintenance-requests/{id}/approve-budget")
    public ResponseEntity<ApiResponse> approveBudget(
            @PathVariable int id,
            @RequestHeader(name = "Authorization") String authHeader) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            MaintenanceRequestDto approvedRequest = maintenanceRequestService.approveBudget(id);
            SuccessResponse<MaintenanceRequestDto> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(),
                    String.format("Serviço Aprovado no Valor R$ %.2f", approvedRequest.getBudget()),
                    Optional.of(approvedRequest));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PutMapping("/client/maintenance-requests/{id}/reject")
    public ResponseEntity<ApiResponse> rejectRequest(
            @PathVariable int id,
            @RequestHeader(name = "Authorization") String authHeader,
            @RequestBody MaintenanceRequestDto maintenanceRequestDto) {

        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        String rejectReason = maintenanceRequestDto.getRejectReason();
        if (rejectReason == null || rejectReason.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Motivo de rejeição não pode estar vazio", HttpStatus.BAD_REQUEST.value(),
                            null));
        }

        try {
            MaintenanceRequestDto rejectedRequest = maintenanceRequestService.rejectRequest(id, rejectReason);
            SuccessResponse<MaintenanceRequestDto> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(),
                    "Serviço Rejeitado",
                    Optional.of(rejectedRequest));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PutMapping("/client/maintenance-requests/{id}/redeem")
    public ResponseEntity<ApiResponse> redeemRequest(
            @PathVariable int id,
            @RequestHeader(name = "Authorization") String authHeader) {

        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }
        try {
            MaintenanceRequestDto redeemdRequest = maintenanceRequestService.redeemRequest(id);
            SuccessResponse<MaintenanceRequestDto> successResponse = new SuccessResponse<>(
                    HttpStatus.OK.value(),
                    "Solicitação resgatada",
                    Optional.of(redeemdRequest));
            return ResponseEntity.ok(successResponse);
        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @GetMapping("/client/maintenance-requests/{id}/confirm-payment")
    public ResponseEntity<ApiResponse> confirmPayment(@PathVariable int id,
            @RequestHeader(name = "Authorization") String authHeader) {
        String email = extractEmailFromToken(authHeader);

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Token inválido ou expirado", HttpStatus.UNAUTHORIZED.value(), null));
        }

        try {
            MaintenanceRequestDto performRequest = maintenanceRequestService.confirmPayment(id);
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
