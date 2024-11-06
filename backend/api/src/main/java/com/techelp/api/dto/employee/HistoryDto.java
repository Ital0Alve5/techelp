package com.techelp.api.dto.employee;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HistoryDto {
    private int statusId;
    private int employeeId;
    private int maintenanceRequestId;
    private String date;
}