package com.techelp.api.controller.client;

import com.techelp.api.dto.client.AssignEmployeeDto;
import com.techelp.api.dto.client.MaintenanceRequestDto;
import com.techelp.api.model.ClientModel;
import com.techelp.api.model.EmployeeModel;
import com.techelp.api.model.HistoryModel;
import com.techelp.api.model.MaintenanceRequestModel;
import com.techelp.api.repository.ClientRepository;
import com.techelp.api.repository.EmployeeRepository;
import com.techelp.api.service.MaintenanceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/maintenance-requests")
public class MaintenanceRequestController {

    @Autowired
    private MaintenanceRequestService maintenanceRequestService;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/create")
    public ResponseEntity<MaintenanceRequestModel> createRequest(@RequestBody MaintenanceRequestDto requestDto) {
        MaintenanceRequestModel createdRequest = maintenanceRequestService.createRequest(requestDto);
        return ResponseEntity.ok(createdRequest);
    }

    @PutMapping("/assign")
    public ResponseEntity<MaintenanceRequestModel> assignEmployeeAndEstimate(@RequestBody AssignEmployeeDto assignDto) {
        Optional<EmployeeModel> employee = employeeRepository.findById(assignDto.getEmployeeId());
        if (employee.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        MaintenanceRequestModel updatedRequest = maintenanceRequestService.assignEmployeeAndEstimate(
                assignDto.getMaintenanceRequestId(), employee.get(), assignDto.getBudget());
        return ResponseEntity.ok(updatedRequest);
    }

    @GetMapping
    public ResponseEntity<List<MaintenanceRequestDto>> getAllRequests() {
        List<MaintenanceRequestDto> requests = maintenanceRequestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRequestModel> getRequestById(@PathVariable int id) {
        return maintenanceRequestService.getRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<List<HistoryModel>> getRequestHistory(@PathVariable int id) {
        Optional<MaintenanceRequestModel> request = maintenanceRequestService.getRequestById(id);
        if (request.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<HistoryModel> historyRecords = maintenanceRequestService.getRequestHistory(id);
        return ResponseEntity.ok(historyRecords);
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<MaintenanceRequestModel>> getRequestsByClient(@PathVariable int clientId) {
        Optional<ClientModel> client = clientRepository.findById(clientId);
        if (client.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<MaintenanceRequestModel> requests = maintenanceRequestService.getRequestsByClient(client.get());
        return ResponseEntity.ok(requests);
    }
}
