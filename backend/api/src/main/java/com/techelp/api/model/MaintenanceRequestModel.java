package com.techelp.api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.techelp.api.dto.client.MaintenanceRequestDto;

@Entity
@Table(name = "maintenance_request")
@Getter
@Setter
public class MaintenanceRequestModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    @JsonManagedReference
    private ClientModel client;

    @ManyToOne
    @JoinColumn(name = "device_id", nullable = false)
    private DeviceModel device;

    @Column(nullable = true)
    private Double budget;

    @Column(nullable = true)
    private String orientation;

    @Column(nullable = true)
    private String maintenance_description;

    @Column(nullable = true)
    private String reject_reason;

    @OneToMany(mappedBy = "maintenanceRequest") 
    private List<HistoryModel> historyRecords;

    public MaintenanceRequestModel() {
    }

    public MaintenanceRequestModel(ClientModel client, DeviceModel device) {
        this.client = client;
        this.device = device;
    }

    public static MaintenanceRequestModel fromDto(MaintenanceRequestDto dto, ClientModel client) {
        MaintenanceRequestModel request = new MaintenanceRequestModel();
        request.setClient(client);

        DeviceModel device = new DeviceModel();
        device.setDevice_description(dto.getDeviceDescription());
        device.setIssue_description(dto.getIssueDescription());
        request.setDevice(device);

        request.setBudget(dto.getBudget());
        request.setOrientation(dto.getOrientation());
        request.setReject_reason(dto.getRejectReason());

        return request;
    }
}
