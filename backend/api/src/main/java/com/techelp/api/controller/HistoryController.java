package com.techelp.api.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.techelp.api.dto.employee.HistoryDto;
import com.techelp.api.dto.response.ApiResponse;
import com.techelp.api.dto.response.ErrorResponse;
import com.techelp.api.dto.response.SuccessResponse;
import com.techelp.api.service.HistoryService;

@RestController
@RequestMapping("/api")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse> getRequests(@RequestParam(name = "filter", required = false) String filter) {
        try {
            if ("todas".equalsIgnoreCase(filter)) {
                List<HistoryDto> requests = historyService.getAllRequests();

                SuccessResponse<Map<String, List<HistoryDto>>> successResponse = new SuccessResponse<>(
                        HttpStatus.OK.value(),
                        "Solicitações listadas!", Optional.of(
                                Map.of("deviceCategories", requests)));

                return ResponseEntity.ok(successResponse);
            }

            if ("hoje".equalsIgnoreCase(filter)) {
                List<HistoryDto> requests = historyService.getLatestHistoryByStatusToday(1);

                SuccessResponse<Map<String, List<HistoryDto>>> successResponse = new SuccessResponse<>(
                        HttpStatus.OK.value(),
                        "Solicitações listadas!", Optional.of(
                                Map.of("deviceCategories", requests)));

                return ResponseEntity.ok(successResponse);
            }

            if ("abertas".equalsIgnoreCase(filter)) {
                List<HistoryDto> requests = historyService.getLatestHistoryByStatus(1);

                SuccessResponse<Map<String, List<HistoryDto>>> successResponse = new SuccessResponse<>(
                        HttpStatus.OK.value(),
                        "Solicitações listadas!", Optional.of(
                                Map.of("deviceCategories", requests)));

                return ResponseEntity.ok(successResponse);
            }

            ErrorResponse errorResponse = new ErrorResponse("Filtro inválido", HttpStatus.BAD_REQUEST.value(),
                    Map.of("message", "Filtro não reconhecido"));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);

        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de listagem", HttpStatus.BAD_REQUEST.value(),
                    Map.of("message", e.getMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

    }

}
