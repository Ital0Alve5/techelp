package com.techelp.api.dto.client;

public class MaintenanceRequestApprovalDto {
    private String message;
    private Double budget;

    public MaintenanceRequestApprovalDto(String message, Double budget) {
        this.message = message;
        this.budget = budget;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }
}

