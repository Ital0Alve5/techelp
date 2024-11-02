package com.techelp.api.service;

import com.techelp.api.dto.client.AssignEmployeeDto;
import com.techelp.api.dto.client.HistoryDto;
import com.techelp.api.dto.client.MaintenanceRequestDto;
import com.techelp.api.exception.ValidationException;
import com.techelp.api.model.*;
import com.techelp.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MaintenanceRequestService {

    @Autowired
    private MaintenanceRequestRepository maintenanceRequestRepository;
    @Autowired
    private HistoryRepository historyRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private DeviceRepository deviceRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private StatusRepository statusRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter HOUR_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    public MaintenanceRequestDto createRequest(MaintenanceRequestDto dto) {
        ClientModel client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new ValidationException("Erro de validação",
                        Map.of("clientId", "Cliente não encontrado")));

        CategoryModel category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ValidationException("Erro de validação",
                        Map.of("categoryId", "Categoria não encontrada")));

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

        maintenanceRequestRepository.save(request);

        StatusModel openStatus = statusRepository.findByName("Aberta")
                .orElseThrow(() -> new ValidationException("Erro de validação",
                        Map.of("status", "Status 'Aberta' não encontrado")));

        HistoryModel historyEntry = new HistoryModel();
        historyEntry.setMaintenanceRequest(request);
        historyEntry.setStatus(openStatus);
        historyEntry.setDate(LocalDateTime.now());

        historyRepository.save(historyEntry);

        return toMaintenanceRequestDto(request);
    }

    public MaintenanceRequestDto assignEmployeeAndEstimate(AssignEmployeeDto assignDto) {
        MaintenanceRequestModel request = maintenanceRequestRepository.findById(assignDto.getMaintenanceRequestId())
                .orElseThrow(() -> new ValidationException("Erro de validação",
                        Map.of("maintenanceRequestId", "Solicitação não encontrada")));

        EmployeeModel employee = new EmployeeModel();

        StatusModel estimatingStatus = statusRepository.findByName("Em orçamento")
                .orElseThrow(
                        () -> new ValidationException("Erro de validação", Map.of("status", "Status não encontrado")));

        HistoryModel historyEntry = new HistoryModel(employee, estimatingStatus, request, LocalDateTime.now());
        historyRepository.save(historyEntry);

        request.setBudget(assignDto.getBudget());
        maintenanceRequestRepository.save(request);

        return toMaintenanceRequestDto(request);
    }

    public List<MaintenanceRequestDto> getAllRequests() {
        return maintenanceRequestRepository.findAll().stream()
                .map(this::toMaintenanceRequestDto)
                .collect(Collectors.toList());
    }

    public MaintenanceRequestDto getRequestById(int id) {
        return maintenanceRequestRepository.findById(id)
                .map(this::toMaintenanceRequestDto)
                .orElseThrow(() -> new ValidationException("Erro de validação",
                        Map.of("id", "Solicitação de manutenção não encontrada")));
    }

    public List<MaintenanceRequestDto> getRequestsByClient(int clientId) {
        ClientModel client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ValidationException("Erro de validação",
                        Map.of("clientId", "Cliente não encontrado")));
        return maintenanceRequestRepository.findByClient(client).stream()
                .map(this::toMaintenanceRequestDto)
                .collect(Collectors.toList());
    }

    public List<HistoryDto> getRequestHistory(int requestId) {
        MaintenanceRequestModel request = maintenanceRequestRepository.findById(requestId)
                .orElseThrow(() -> new ValidationException("Erro de validação",
                        Map.of("requestId", "Solicitação não encontrada")));
        return historyRepository.findByMaintenanceRequest(request).stream()
                .map(history -> {
                    HistoryDto dto = new HistoryDto();
                    dto.setStatus(history.getStatus().getName());
                    dto.setEmployeeName(history.getEmployee() != null ? history.getEmployee().getName() : null);
                    dto.setDate(
                            history.getDate().format(DATE_FORMATTER) + " " + history.getDate().format(HOUR_FORMATTER));
                    return dto;
                }).collect(Collectors.toList());
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

}
