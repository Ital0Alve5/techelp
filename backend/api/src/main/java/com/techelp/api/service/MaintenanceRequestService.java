package com.techelp.api.service;

import com.techelp.api.dto.client.MaintenanceRequestDto;
import com.techelp.api.model.CategoryModel;
import com.techelp.api.model.ClientModel;
import com.techelp.api.model.DeviceModel;
import com.techelp.api.model.EmployeeModel;
import com.techelp.api.model.HistoryModel;
import com.techelp.api.model.MaintenanceRequestModel;
import com.techelp.api.model.StatusModel;
import com.techelp.api.repository.CategoryRepository;
import com.techelp.api.repository.ClientRepository;
import com.techelp.api.repository.DeviceRepository;
import com.techelp.api.repository.HistoryRepository;
import com.techelp.api.repository.MaintenanceRequestRepository;
import com.techelp.api.repository.StatusRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MaintenanceRequestService {

    @Autowired
    private MaintenanceRequestRepository maintenanceRequestRepository;

    @Autowired
    private HistoryService historyService;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private HistoryRepository historyRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter HOUR_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    public MaintenanceRequestModel createRequest(MaintenanceRequestDto dto) {
        ClientModel client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        CategoryModel category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        DeviceModel device = new DeviceModel();
        device.setCategory(category);
        device.setDevice_description(dto.getDeviceDescription());
        device.setIssue_description(dto.getIssueDescription());
        device = deviceRepository.save(device); 

        MaintenanceRequestModel request = new MaintenanceRequestModel();
        request.setClient(client);
        request.setDevice(device);
        request.setBudget(dto.getBudget());
        request.setOrientation(dto.getOrientation());
        request.setReject_reason(dto.getRejectReason());

        MaintenanceRequestModel createdRequest = maintenanceRequestRepository.save(request);

        StatusModel openStatus = statusRepository.findByName("Aberta")
                .orElseThrow(() -> new RuntimeException("Status 'Aberta' não encontrado"));

        HistoryModel historyEntry = new HistoryModel();
        historyEntry.setMaintenanceRequest(createdRequest);
        historyEntry.setStatus(openStatus);
        historyEntry.setEmployee(null); 
        historyEntry.setDate(LocalDateTime.now());

        historyRepository.save(historyEntry);

        return createdRequest;
    }

    public MaintenanceRequestModel assignEmployeeAndEstimate(int requestId, EmployeeModel employee, Double budget) {
        MaintenanceRequestModel request = maintenanceRequestRepository.findById(requestId)
                .orElseThrow(
                        () -> new RuntimeException("Solicitação de manutenção não encontrada com o ID: " + requestId));

        StatusModel estimatingStatus = statusRepository.findByName("Em orçamento")
                .orElseThrow(() -> new RuntimeException("Status não encontrado"));

        HistoryModel historyEntry = new HistoryModel(employee, estimatingStatus, request, LocalDateTime.now());
        historyRepository.save(historyEntry);

        request.setBudget(budget);
        return maintenanceRequestRepository.save(request);
    }

    public List<MaintenanceRequestDto> getAllRequests() {
        List<MaintenanceRequestModel> requests = maintenanceRequestRepository.findAll();
        return requests.stream()
                .map(this::toMaintenanceRequestDto)
                .collect(Collectors.toList());
    }

    public MaintenanceRequestDto toMaintenanceRequestDto(MaintenanceRequestModel request) {
        MaintenanceRequestDto dto = new MaintenanceRequestDto();

        dto.setClientId(request.getClient().getId());
        dto.setCategoryId(request.getDevice().getCategory().getId());
        dto.setDeviceDescription(request.getDevice().getDevice_description());
        dto.setIssueDescription(request.getDevice().getIssue_description());
        dto.setBudget(request.getBudget());
        dto.setOrientation(request.getOrientation());
        dto.setRejectReason(request.getReject_reason());

        historyRepository.findLatestHistoryByRequest(request).ifPresent(history -> {
            dto.setStatus(history.getStatus().getName());
            dto.setLastEmployee(history.getEmployee() != null ? history.getEmployee().getName() : null);
        });

        historyRepository.findFirstHistoryByRequest(request).ifPresent(history -> {
            dto.setDate(history.getDate().format(DATE_FORMATTER));
            dto.setHour(history.getDate().format(HOUR_FORMATTER));
        });

        return dto;
    }

    public Optional<MaintenanceRequestModel> getRequestById(int id) {
        return maintenanceRequestRepository.findById(id);
    }

    public MaintenanceRequestModel updateRequest(int id, MaintenanceRequestModel requestDetails) {
        MaintenanceRequestModel request = maintenanceRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Requisição de manutenção não encontrada com o ID: " + id));

        request.setBudget(requestDetails.getBudget());
        request.setOrientation(requestDetails.getOrientation());
        request.setReject_reason(requestDetails.getReject_reason());
        request.setClient(requestDetails.getClient());
        request.setDevice(requestDetails.getDevice());

        return maintenanceRequestRepository.save(request);
    }

    public void deleteRequest(int id) {
        maintenanceRequestRepository.deleteById(id);
    }

    public List<MaintenanceRequestModel> getRequestsByClient(ClientModel client) {
        return maintenanceRequestRepository.findByClient(client);
    }

    public List<HistoryModel> getRequestHistory(int requestId) {
        MaintenanceRequestModel request = maintenanceRequestRepository.findById(requestId)
                .orElseThrow(
                        () -> new RuntimeException("Solicitação de manutenção não encontrada com o ID: " + requestId));

        return historyService.getHistoryByRequest(request);
    }
}
