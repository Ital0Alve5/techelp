package com.techelp.api.dto.client;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaintenanceRequestDto {
    private int id;
    private int categoryId;
    private int clientId;
    private String clientName;
    private String categoryName;
    private String deviceDescription;
    private String issueDescription;
    private Double budget;
    private String orientation;
    private String rejectReason;
    private String status;
    private String lastEmployee;
    private String date;
    private String hour;

}