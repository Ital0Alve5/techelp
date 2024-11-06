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

    @Query(nativeQuery = true, value = """
                SELECT DISTINCT ON (h.maintenance_request_id)
                    h.date,
                    c.name AS client_name,
                    d.device_description,
                    d.issue_description AS device_issue_description,
                    s.name AS status_name
                FROM public.history h
                JOIN public.maintenance_request mr ON h.maintenance_request_id = mr.id
                JOIN public.device d ON mr.device_id = d.id
                JOIN public.client c ON mr.client_id = c.id
                JOIN public.status s ON h.status_id = s.id
                WHERE h.status_id = :statusId
                ORDER BY h.maintenance_request_id, h.date DESC;
            """)
    List<Object[]> findLatestHistoryByStatusNative(@Param("statusId") Integer statusId);

    @Query(nativeQuery = true, value = """
                SELECT DISTINCT ON (h.maintenance_request_id)
                    h.date,
                    c.name AS client_name,
                    d.device_description,
                    d.issue_description AS device_issue_description,
                    s.name AS status_name
                FROM public.history h
                JOIN public.maintenance_request mr ON h.maintenance_request_id = mr.id
                JOIN public.device d ON mr.device_id = d.id
                JOIN public.client c ON mr.client_id = c.id
                JOIN public.status s ON h.status_id = s.id
                WHERE h.status_id = :statusId
                AND DATE(date) = CURRENT_DATE
                ORDER BY h.maintenance_request_id, h.date DESC;
            """)
    List<Object[]> findLatestHistoryByStatusToday(@Param("statusId") Integer statusId);

    @Query(nativeQuery = true, value = """
                SELECT DISTINCT ON (h.maintenance_request_id)
                    h.date,
                    c.name AS client_name,
                    d.device_description,
                    d.issue_description AS device_issue_description,
                    s.name AS status_name
                FROM public.history h
                JOIN public.maintenance_request mr ON h.maintenance_request_id = mr.id
                JOIN public.device d ON mr.device_id = d.id
                JOIN public.client c ON mr.client_id = c.id
                JOIN public.status s ON h.status_id = s.id
                ORDER BY h.maintenance_request_id, h.date DESC;
            """)
    List<Object[]> findAllRequests();

}
