package com.techelp.api.service;

import com.techelp.api.model.EmployeeModel;
import com.techelp.api.model.HistoryModel;
import com.techelp.api.model.MaintenanceRequestModel;
import com.techelp.api.model.StatusModel;
import com.techelp.api.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoryService {

    @Autowired
    private HistoryRepository historyRepository;

    public HistoryModel createHistoryEntry(MaintenanceRequestModel request, EmployeeModel employee, StatusModel status, LocalDateTime date) {
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
}
