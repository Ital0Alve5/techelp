package com.techelp.api.dto.employee;

public class HistoryDto {

    private String date;
    private String clientName;
    private String deviceDescription;
    private String deviceIssueDescription;
    private String statusName;
    private Integer statusId;
    private Integer employeeId;
    private Integer maintenanceRequestId;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getDeviceDescription() {
        return deviceDescription;
    }

    public void setDeviceDescription(String deviceDescription) {
        this.deviceDescription = deviceDescription;
    }

    public String getDeviceIssueDescription() {
        return deviceIssueDescription;
    }

    public void setDeviceIssueDescription(String deviceIssueDescription) {
        this.deviceIssueDescription = deviceIssueDescription;
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

    public Integer getStatusId() {
        return statusId;
    }

    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public Integer getMaintenanceRequestId() {
        return maintenanceRequestId;
    }

    public void setMaintenanceRequestId(Integer maintenanceRequestId) {
        this.maintenanceRequestId = maintenanceRequestId;
    }

}
