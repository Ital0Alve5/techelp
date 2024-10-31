package com.techelp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.techelp.api.model.MaintenanceRequest;

import java.util.List;

public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {
    List<MaintenanceRequest> findByClientId(Long clientId);
}
