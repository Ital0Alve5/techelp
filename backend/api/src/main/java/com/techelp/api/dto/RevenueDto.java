package com.techelp.api.dto;

import java.text.DateFormat;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RevenueDto {
    private String category;
    private Double budget;
    private String date;

    public RevenueDto(String category, Double budget){
        this.category = category;
        this.budget = budget;
    }

    public RevenueDto(Double budget, String date){
        this.budget = budget;
        this.date = date;
    }

}
