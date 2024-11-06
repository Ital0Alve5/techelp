package com.techelp.api.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techelp.api.dto.employee.HistoryDto;
import com.techelp.api.model.EmployeeModel;
import com.techelp.api.model.HistoryModel;
import com.techelp.api.model.MaintenanceRequestModel;
import com.techelp.api.model.StatusModel;
import com.techelp.api.repository.HistoryRepository;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    public HistoryModel createHistoryEntry(MaintenanceRequestModel request, EmployeeModel employee, StatusModel status,
            LocalDateTime date) {
        HistoryModel history = new HistoryModel();
        history.setMaintenanceRequest(request);
        history.setEmployee(employee);
        history.setStatus(status);
        history.setDate(date);

        return historyRepository.save(history);
    }

    public List<HistoryModel> getHistoryByRequest(MaintenanceRequestModel request) {
        return historyRepository.findByMaintenanceRequest(request);
    }

    public HistoryModel getLatestHistoryByRequest(MaintenanceRequestModel request) {
        return historyRepository.findByMaintenanceRequest(request)
                .stream()
                .max((h1, h2) -> h1.getDate().compareTo(h2.getDate()))
                .orElse(null);
    }

    public List<HistoryDto> getLatestHistoryByStatus(Integer statusId) {
        List<Object[]> results = historyRepository.findLatestHistoryByStatusNative(statusId);

        return results.stream().map(result -> {
            HistoryDto dto = new HistoryDto();
            dto.setDate(result[0] != null ? result[0].toString() : "");
            dto.setClientName(result[1] != null ? result[1].toString() : "");
            dto.setDeviceDescription(result[2] != null ? result[2].toString() : "");
            dto.setDeviceIssueDescription(result[3] != null ? result[3].toString() : "");
            dto.setStatusName(result[4] != null ? result[4].toString() : "");

            return dto;
        }).collect(Collectors.toList());
    }

    public List<HistoryDto> getLatestHistoryByStatusToday(Integer statusId) {
        List<Object[]> results = historyRepository.findLatestHistoryByStatusToday(statusId);

        return results.stream().map(result -> {
            HistoryDto dto = new HistoryDto();
            dto.setDate(result[0] != null ? result[0].toString() : "");
            dto.setClientName(result[1] != null ? result[1].toString() : "");
            dto.setDeviceDescription(result[2] != null ? result[2].toString() : "");
            dto.setDeviceIssueDescription(result[3] != null ? result[3].toString() : "");
            dto.setStatusName(result[4] != null ? result[4].toString() : "");

            return dto;
        }).collect(Collectors.toList());
    }

    public List<HistoryDto> getAllRequests() {
        List<Object[]> results = historyRepository.findAllRequests();

        return results.stream().map(result -> {
            HistoryDto dto = new HistoryDto();
            dto.setDate(result[0] != null ? result[0].toString() : "");
            dto.setClientName(result[1] != null ? result[1].toString() : "");
            dto.setDeviceDescription(result[2] != null ? result[2].toString() : "");
            dto.setDeviceIssueDescription(result[3] != null ? result[3].toString() : "");
            dto.setStatusName(result[4] != null ? result[4].toString() : "");

            return dto;
        }).collect(Collectors.toList());
    }
}
