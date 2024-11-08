package com.techelp.api.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.techelp.api.model.MaintenanceRequestModel;
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
            "JOIN mr.historyRecords h1 " +
            "WHERE h1.employee = :employee " +
            "AND FUNCTION('DATE', h1.date) BETWEEN :startDate AND :endDate " +
            "AND h1.date = (SELECT MAX(h2.date) FROM HistoryModel h2 WHERE h2.maintenanceRequest = mr)")
    List<MaintenanceRequestModel> findAllByEmployeeWithDateRange(
            @Param("employee") EmployeeModel employee,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);

}
