package com.techelp.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.techelp.api.model.HistoryModel;
import com.techelp.api.model.MaintenanceRequestModel;

@Repository
public interface HistoryRepository extends JpaRepository<HistoryModel, Integer> {
    List<HistoryModel> findByMaintenanceRequest(MaintenanceRequestModel maintenanceRequest);

    @Query("SELECT h FROM HistoryModel h WHERE h.maintenanceRequest = :request ORDER BY h.date DESC")
    Optional<HistoryModel> findLatestHistoryByRequest(@Param("request") MaintenanceRequestModel request);

    @Query("SELECT h FROM HistoryModel h WHERE h.maintenanceRequest = :request ORDER BY h.date ASC")
    Optional<HistoryModel> findFirstHistoryByRequest(@Param("request") MaintenanceRequestModel request);
}
