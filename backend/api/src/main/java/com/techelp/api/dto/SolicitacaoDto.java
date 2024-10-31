package com.techelp.api.dto;

import com.techelp.api.model.MaintenanceRequest;

import java.time.format.DateTimeFormatter;

public class SolicitacaoDto {

    private Long id;
    private String date;
    private String hour;
    private String deviceDescription;
    private String currentStatus;

    public SolicitacaoDto(MaintenanceRequest request) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter hourFormatter = DateTimeFormatter.ofPattern("HH:mm");

        this.id = request.getId();
        this.date = request.getDate().format(dateFormatter);
        this.hour = request.getDate().format(hourFormatter);
        this.deviceDescription = request.getDevice().getDeviceDescription();
        this.currentStatus = request.getStatus().getName();
    }

    // Getters e Setters
}
