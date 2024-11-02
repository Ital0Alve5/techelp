package com.techelp.api.dto.client;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaintenanceRequestDto {
    private int clientId;
    private int categoryId;
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