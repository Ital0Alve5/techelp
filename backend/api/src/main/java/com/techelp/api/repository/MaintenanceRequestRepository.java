package com.techelp.api.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.techelp.api.model.MaintenanceRequestModel;
import com.techelp.api.dto.RevenueDto;
import com.techelp.api.model.ClientModel;
import com.techelp.api.model.DeviceModel;
import com.techelp.api.model.EmployeeModel;

@Repository
public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequestModel, Integer> {
        List<MaintenanceRequestModel> findByClient(ClientModel client);

        List<MaintenanceRequestModel> findByDevice(DeviceModel device);

        List<MaintenanceRequestModel> findByClientEmail(String email);

        @Query("SELECT mr FROM MaintenanceRequestModel mr " +
                        "JOIN mr.historyRecords h " +
                        "JOIN h.employee e " +
                        "WHERE mr.id = :id " +
                        "AND e.email = :email")
        Optional<MaintenanceRequestModel> findByIdAndEmployeeEmail(@Param("id") int id, @Param("email") String email);

        @Query("SELECT mr FROM MaintenanceRequestModel mr " +
                        "JOIN mr.historyRecords h1 " +
                        "WHERE h1.status.id = 17 " +
                        "AND h1.date = (SELECT MAX(h2.date) FROM HistoryModel h2 WHERE h2.maintenanceRequest = mr)")
        List<MaintenanceRequestModel> findOpenRequests();

        @Query("SELECT mr FROM MaintenanceRequestModel mr " +
                        "JOIN mr.historyRecords h1 " +
                        "WHERE h1.employee = :employee " +
                        "AND h1.date = (SELECT MAX(h2.date) FROM HistoryModel h2 WHERE h2.maintenanceRequest = mr)")
        List<MaintenanceRequestModel> findAllByEmployeeWithCurrentStatus(EmployeeModel employee);

        @Query("SELECT mr FROM MaintenanceRequestModel mr " +
                        "JOIN mr.historyRecords h1 " +
                        "WHERE h1.status.id = 17 " +
                        "AND h1.date = (SELECT MAX(h2.date) FROM HistoryModel h2 WHERE h2.maintenanceRequest = mr) " +
                        "AND FUNCTION('DATE', h1.date) = CURRENT_DATE")
        List<MaintenanceRequestModel> findOpenRequestsCreatedToday();

        @Query("SELECT mr FROM MaintenanceRequestModel mr " +
                        "WHERE EXISTS (" +
                        "   SELECT 1 FROM HistoryModel h1 " +
                        "   WHERE h1.maintenanceRequest = mr " +
                        "   AND h1.date = (SELECT MAX(h2.date) FROM HistoryModel h2 WHERE h2.maintenanceRequest = mr) "
                        +
                        "   AND h1.status.name = 'Aberta' " + // Verifica se o status atual é "Aberta"
                        "   AND CAST(h1.date AS DATE) BETWEEN :startDate AND :endDate" +
                        ")")
        List<MaintenanceRequestModel> findRequestsByCreationDateRange(
                        @Param("startDate") LocalDate startDate,
                        @Param("endDate") LocalDate endDate);

        @Query("SELECT new com.techelp.api.dto.RevenueDto(c.name, SUM(m.budget)) " +
                        "FROM MaintenanceRequestModel m " +
                        "JOIN m.device d " +
                        "JOIN d.category c " +
                        "JOIN m.historyRecords h " +
                        "JOIN h.status s " +
                        "WHERE s.name = 'Finalizada' " +
                        "AND h.date = (SELECT MAX(h2.date) FROM HistoryModel h2 WHERE h2.maintenanceRequest = m) " +
                        "GROUP BY c.name")
        List<RevenueDto> findCategoryRevenues();

        @Query(value = "SELECT SUM(m.budget) as budget, DATE(h.date) as date " +
                        "FROM maintenance_request m " +
                        "INNER JOIN device d ON m.device_id = d.id " +
                        "INNER JOIN history h ON h.maintenance_request_id = m.id " +
                        "INNER JOIN status s ON h.status_id = s.id " +
                        "WHERE s.name = 'Finalizada' " +
                        "AND h.date = (SELECT MAX(h2.date) FROM history h2 WHERE h2.maintenance_request_id = m.id) " +
                        "AND DATE(h.date) BETWEEN CAST(:startDate AS DATE) AND CAST(:endDate AS DATE) " +
                        "GROUP BY DATE(h.date)", nativeQuery = true)
        List<Object[]> findBudgetGroupedByDateInRange(@Param("startDate") String startDate,
                        @Param("endDate") String endDate);

}
