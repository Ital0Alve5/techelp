package com.techelp.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.techelp.api.model.MaintenanceRequestModel;
import com.techelp.api.model.HistoryModel;
import com.techelp.api.service.MaintenanceBudgetService;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance-budgets")
public class MaintenanceBudgetController {

    private final MaintenanceBudgetService maintenanceBudgetService;

    @Autowired
    public MaintenanceBudgetController(MaintenanceBudgetService maintenanceBudgetService) {
        this.maintenanceBudgetService = maintenanceBudgetService;
    }

    @GetMapping("/{requestId}")
    public ResponseEntity<MaintenanceRequestModel> getMaintenanceBudget(@PathVariable int requestId) {
        MaintenanceRequestModel maintenanceRequest = maintenanceBudgetService.getMaintenanceRequestById(requestId);
        if (maintenanceRequest == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(maintenanceRequest);
    }

    @GetMapping("/{requestId}/history")
    public ResponseEntity<List<HistoryModel>> getMaintenanceRequestHistory(@PathVariable int requestId) {
        List<HistoryModel> history = maintenanceBudgetService.getMaintenanceRequestHistory(requestId);
        if (history == null || history.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(history);
    }

    @PutMapping("/{requestId}/approve")
    public ResponseEntity<String> approveMaintenanceRequest(@PathVariable int requestId) {
        boolean isApproved = maintenanceBudgetService.updateMaintenanceRequestStatus(requestId, "Aprovada");
        if (isApproved) {
            return ResponseEntity.ok("Orçamento aprovado com sucesso.");
        }
        return ResponseEntity.status(400).body("Falha ao aprovar o orçamento.");
    }

    @PutMapping("/{requestId}/reject")
    public ResponseEntity<String> rejectMaintenanceRequest(@PathVariable int requestId, @RequestParam String reason) {
        boolean isRejected = maintenanceBudgetService.updateMaintenanceRequestStatus(requestId, "Rejeitada", reason);
        if (isRejected) {
            return ResponseEntity.ok("Orçamento rejeitado com sucesso.");
        }
        return ResponseEntity.status(400).body("Falha ao rejeitar o orçamento.");
    }
}
