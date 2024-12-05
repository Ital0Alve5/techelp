package com.techelp.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "History")
@Getter
@Setter
public class HistoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private EmployeeModel employee;

    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    private StatusModel status;

    @ManyToOne
    @JoinColumn(name = "maintenance_request_id", nullable = false)
    private MaintenanceRequestModel maintenanceRequest; 

    @Column(nullable = false)
    private LocalDateTime date;

    public HistoryModel() {
    }

    public HistoryModel(EmployeeModel employee, StatusModel status, MaintenanceRequestModel maintenanceRequest,
                        LocalDateTime date) {
        this.employee = employee;
        this.status = status;
        this.maintenanceRequest = maintenanceRequest; 
        this.date = date;
    }
}
