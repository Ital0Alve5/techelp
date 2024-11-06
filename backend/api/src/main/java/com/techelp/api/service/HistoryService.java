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
        List<HistoryModel> historyModels = historyRepository.findLatestHistoryByStatusNative(statusId);

        return historyModels.stream().map(history -> {
            HistoryDto dto = new HistoryDto();
            dto.setStatusId(history.getStatus() != null ? history.getStatus().getId() : -1);
            dto.setEmployeeId(history.getEmployee() != null ? history.getEmployee().getId() : -1);
            dto.setMaintenanceRequestId(
                    history.getMaintenanceRequest() != null ? history.getMaintenanceRequest().getId() : -1);

            dto.setDate(history.getDate() != null ? history.getDate().toString() : "");

            return dto;
        }).collect(Collectors.toList());
    }
}
