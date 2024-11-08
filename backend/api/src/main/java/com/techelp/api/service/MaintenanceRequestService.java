package com.techelp.api.service;

import com.techelp.api.dto.client.AssignEmployeeDto;
import com.techelp.api.dto.client.HistoryDto;
import com.techelp.api.dto.client.MaintenanceRequestDto;
import com.techelp.api.exception.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
import com.techelp.api.repository.EmployeeRepository;
import com.techelp.api.repository.HistoryRepository;
import com.techelp.api.repository.MaintenanceRequestRepository;
import com.techelp.api.repository.StatusRepository;

@Service
public class MaintenanceRequestService {

        @Autowired
        private MaintenanceRequestRepository maintenanceRequestRepository;
        @Autowired
        private HistoryRepository historyRepository;
        @Autowired
        private ClientRepository clientRepository;
        @Autowired
        private EmployeeRepository employeeRepository;
        @Autowired
        private DeviceRepository deviceRepository;
        @Autowired
        private CategoryRepository categoryRepository;
        @Autowired
        private StatusRepository statusRepository;

        private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        private static final DateTimeFormatter HOUR_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

        public MaintenanceRequestDto createRequest(MaintenanceRequestDto dto, String email) {
                ClientModel client = clientRepository.findByEmail(email)
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("email", "Cliente não encontrado")));

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
                MaintenanceRequestModel request = maintenanceRequestRepository
                                .findById(assignDto.getMaintenanceRequestId())
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("maintenanceRequestId", "Solicitação não encontrada")));

                EmployeeModel employee = new EmployeeModel();

                StatusModel estimatingStatus = statusRepository.findByName("Em orçamento")
                                .orElseThrow(
                                                () -> new ValidationException("Erro de validação",
                                                                Map.of("status", "Status não encontrado")));

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

        public MaintenanceRequestDto getRequestByIdAndEmail(int id, String email) {
                MaintenanceRequestModel request = maintenanceRequestRepository.findById(id)
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("id", "Solicitação de manutenção não encontrada")));

                if (!request.getClient().getEmail().equals(email)) {
                        throw new ValidationException("Erro de autorização",
                                        Map.of("id", "Usuário não autorizado a acessar esta solicitação de manutenção"));
                }

                return toMaintenanceRequestDto(request);
        }

        public List<MaintenanceRequestDto> getRequestsByClientEmail(String email) {
                ClientModel client = clientRepository.findByEmail(email)
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("email", "Cliente não encontrado")));

                return maintenanceRequestRepository.findByClient(client).stream()
                                .map(this::toMaintenanceRequestDto)
                                .collect(Collectors.toList());
        }

        public List<HistoryDto> getRequestHistoryByEmail(int requestId, String email) {
                MaintenanceRequestModel request = maintenanceRequestRepository.findById(requestId)
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("requestId", "Solicitação de manutenção não encontrada")));

                if (!request.getClient().getEmail().equals(email)) {
                        throw new ValidationException("Erro de autorização",
                                        Map.of("requestId",
                                                        "Usuário não autorizado a acessar este histórico de manutenção"));
                }

                return historyRepository.findByMaintenanceRequest(request).stream()
                                .map(history -> {
                                        HistoryDto dto = new HistoryDto();
                                        dto.setStatus(history.getStatus().getName());
                                        dto.setEmployeeName(
                                                        history.getEmployee() != null ? history.getEmployee().getName()
                                                                        : null);
                                        dto.setDate(history.getDate().format(DATE_FORMATTER) + " "
                                                        + history.getDate().format(HOUR_FORMATTER));
                                        return dto;
                                })
                                .collect(Collectors.toList());
        }

        public MaintenanceRequestDto toMaintenanceRequestDto(MaintenanceRequestModel request) {
                MaintenanceRequestDto dto = new MaintenanceRequestDto();

                dto.setId(request.getId());
                dto.setCategoryName(request.getDevice().getCategory().getName());

                dto.setClientId(request.getClient().getId());
                dto.setClientName(request.getClient().getName());
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

        public MaintenanceRequestDto approveBudget(int requestId) {
                MaintenanceRequestModel request = maintenanceRequestRepository.findById(requestId)
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("id", "Solicitação não encontrada")));

                StatusModel approvedStatus = statusRepository.findByName("Aprovada")
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("status", "Status 'Orçada' não encontrado")));

                HistoryModel lastHistoryEntry = historyRepository.findLatestHistoryByRequest(request)
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("status", "Último registro no histórico não encontrado")));

                HistoryModel historyEntry = new HistoryModel();
                historyEntry.setMaintenanceRequest(request);
                historyEntry.setStatus(approvedStatus);
                historyEntry.setDate(LocalDateTime.now());
                historyEntry.setEmployee(lastHistoryEntry.getEmployee());

                historyRepository.save(historyEntry);

                return toMaintenanceRequestDto(request);
        }

        public MaintenanceRequestDto rejectRequest(int requestId, String rejectReason) {
                MaintenanceRequestModel request = maintenanceRequestRepository.findById(requestId)
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("id", "Solicitação não encontrada")));

                request.setReject_reason(rejectReason);
                maintenanceRequestRepository.save(request);

                StatusModel rejectedStatus = statusRepository.findByName("Rejeitada")
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("status", "Status 'Rejeitada' não encontrado")));

                HistoryModel lastHistoryEntry = historyRepository.findLatestHistoryByRequest(request)
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("status", "Último registro no histórico não encontrado")));

                HistoryModel historyEntry = new HistoryModel();
                historyEntry.setMaintenanceRequest(request);
                historyEntry.setStatus(rejectedStatus);
                historyEntry.setDate(LocalDateTime.now());
                historyEntry.setEmployee(lastHistoryEntry.getEmployee());

                historyRepository.save(historyEntry);

                return toMaintenanceRequestDto(request);
        }

        // --------------------- employee -----------------------

        public List<MaintenanceRequestDto> getAllRequestsOfEmployee(String email) {
                EmployeeModel employee = employeeRepository.findByEmail(email)
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("email", "Funcionário não encontrado")));

                return maintenanceRequestRepository.findAllByEmployeeWithCurrentStatus(employee).stream()
                                .map(this::toMaintenanceRequestDto)
                                .collect(Collectors.toList());
        }

        public List<MaintenanceRequestDto> getOpenRequests() {
                return maintenanceRequestRepository.findOpenRequests().stream()
                                .map(this::toMaintenanceRequestDto)
                                .collect(Collectors.toList());
        }

        public List<MaintenanceRequestDto> getTodayOpenRequests() {
                return maintenanceRequestRepository.findOpenRequestsCreatedToday().stream()
                                .map(this::toMaintenanceRequestDto)
                                .collect(Collectors.toList());
        }

        public MaintenanceRequestDto makeBudget(int requestId, String email,
                        MaintenanceRequestDto maintenanceRequestDto) {
                EmployeeModel employee = employeeRepository.findByEmail(email)
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("email", "Funcionário não encontrado")));

                MaintenanceRequestModel request = maintenanceRequestRepository.findById(requestId)
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("id", "Solicitação não encontrada")));

                request.setBudget(maintenanceRequestDto.getBudget());
                maintenanceRequestRepository.save(request);

                StatusModel budgetedStatus = statusRepository.findByName("Orçada")
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("status", "Status 'Aprovada' não encontrado")));

                HistoryModel historyEntry = new HistoryModel();
                historyEntry.setEmployee(employee);
                historyEntry.setMaintenanceRequest(request);
                historyEntry.setStatus(budgetedStatus);
                historyEntry.setDate(LocalDateTime.now());

                historyRepository.save(historyEntry);

                return toMaintenanceRequestDto(request);
        }

        public MaintenanceRequestDto getRequestByIdAndEmployeeEmail(int id, String email) {
                MaintenanceRequestModel request = maintenanceRequestRepository.findById(id)
                                .orElseThrow(() -> new ValidationException("Erro de validação",
                                                Map.of("id", "Solicitação de manutenção não encontrada")));

                boolean isOpen = request.getHistoryRecords().stream()
                                .max(Comparator.comparing(HistoryModel::getDate)) 
                                .map(history -> history.getStatus().getId() == 17) 
                                .orElse(false);

                if (!isOpen) {
                        request = maintenanceRequestRepository.findByIdAndEmployeeEmail(id, email)
                                        .orElseThrow(() -> new ValidationException("Erro de autorização",
                                                        Map.of("id", "Usuário não autorizado a acessar esta solicitação de manutenção")));
                }

                return toMaintenanceRequestDto(request);
        }
}
