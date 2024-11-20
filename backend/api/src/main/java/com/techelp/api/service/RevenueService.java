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

    public List<RevenueDto> getDateRevenues() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    List<Object[]> results = maintenanceRequestRepository.findBudgetGroupedByDate();

    return results.stream()
                  .map(row -> new RevenueDto(
                          (Double) row[0],
                          formatter.format(LocalDate.parse(row[1].toString()))
                  ))
                  .collect(Collectors.toList());
    }

}
