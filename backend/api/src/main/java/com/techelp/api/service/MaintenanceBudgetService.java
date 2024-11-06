package com.techelp.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.techelp.api.model.MaintenanceRequestModel;
import com.techelp.api.model.HistoryModel;
import com.techelp.api.repository.MaintenanceRequestRepository;
import com.techelp.api.repository.HistoryRepository;

import java.util.List;

@Service
public class MaintenanceBudgetService {

    private final MaintenanceRequestRepository maintenanceRequestRepository;
    private final HistoryRepository historyRepository;

    @Autowired
    public MaintenanceBudgetService(MaintenanceRequestRepository maintenanceRequestRepository, HistoryRepository historyRepository) {
        this.maintenanceRequestRepository = maintenanceRequestRepository;
        this.historyRepository = historyRepository;
    }

    public MaintenanceRequestModel getMaintenanceRequestById(int requestId) {
        return maintenanceRequestRepository.findById(requestId).orElse(null);
    }

    public List<HistoryModel> getMaintenanceRequestHistory(int requestId) {
        MaintenanceRequestModel maintenanceRequest = getMaintenanceRequestById(requestId);
        if (maintenanceRequest != null) {
            return historyRepository.findByMaintenanceRequest(maintenanceRequest);
        }
        return null;
    }

    public boolean updateMaintenanceRequestStatus(int requestId, String status) {
        return updateMaintenanceRequestStatus(requestId, status, null);
    }


    public boolean updateMaintenanceRequestStatus(int requestId, String status, String rejectReason) {
        MaintenanceRequestModel maintenanceRequest = getMaintenanceRequestById(requestId);
        if (maintenanceRequest == null) {
            return false;
        }
        
        if (!"Orçada".equals(maintenanceRequest.getStatus())) {
            return false; // Não permite aprovação ou rejeição se não estiver orçada
        }

        maintenanceRequest.setStatus(status);
        if ("Rejeitada".equals(status)) {
            maintenanceRequest.setReject_reason(rejectReason);
        }

        maintenanceRequestRepository.save(maintenanceRequest);
        return true;
    }
}
