package com.techelp.api.dto.client;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignEmployeeDto {
    private int maintenanceRequestId;
    private int employeeId;
    private Double budget;
}
