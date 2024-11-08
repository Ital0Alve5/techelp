package com.techelp.api.service;

import com.techelp.api.dto.EmployeeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import com.techelp.api.model.EmployeeModel;
import com.techelp.api.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public EmployeeDto toEmployeeDto(EmployeeModel request) {
        EmployeeDto dto = new EmployeeDto(request.getId(), request.getEmail(), request.getPassword(), request.getName(),
                request.getBirthdate());

        return dto;
    }

    public List<EmployeeDto> getAllEmployees(String email) {
        return employeeRepository.findByEmailNot(email).stream().map(this::toEmployeeDto)
                .collect(Collectors.toList());
    }
}
