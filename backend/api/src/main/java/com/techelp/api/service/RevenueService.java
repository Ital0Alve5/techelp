package com.techelp.api.service;

import com.techelp.api.dto.RevenueDto;
import com.techelp.api.repository.MaintenanceRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RevenueService {
    
    @Autowired
    private MaintenanceRequestRepository maintenanceRequestRepository;

    public List<RevenueDto> getCategoryRevenues() {
        return maintenanceRequestRepository.findCategoryRevenues();
    }

    public List<RevenueDto> getDateRevenuesInRange(String startDate, String endDate) {
        DateTimeFormatter dbFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    
        String formattedStartDate = LocalDate.parse(startDate, DateTimeFormatter.ofPattern("dd-MM-yyyy")).format(dbFormatter);
        String formattedEndDate = LocalDate.parse(endDate, DateTimeFormatter.ofPattern("dd-MM-yyyy")).format(dbFormatter);
    
        List<Object[]> results = maintenanceRequestRepository.findBudgetGroupedByDateInRange(formattedStartDate, formattedEndDate);
    
        return results.stream()
                      .map(row -> new RevenueDto(
                              (Double) row[0],
                              outputFormatter.format(LocalDate.parse(row[1].toString()))
                      ))
                      .collect(Collectors.toList());
    }
    
}
