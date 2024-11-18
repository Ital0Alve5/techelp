package com.techelp.api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techelp.api.dto.EmployeeDto;
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

    public EmployeeDto addEmployee(EmployeeDto employee){
        EmployeeModel newEmployee = new EmployeeModel();
        newEmployee.setBirthdate(employee.birthdate());
        newEmployee.setEmail(employee.email());
        newEmployee.setName(employee.name());

        return toEmployeeDto(employeeRepository.save(newEmployee));
    }

    public EmployeeDto editEmployee(String email, int id, EmployeeDto employee){
        EmployeeModel employeeUpdated = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Funcionário não encontrado com o ID: " + id));
        if(employeeUpdated.getEmail() == email) {
            throw new RuntimeException("Funcionário não pode editar a si mesmo");
        }
        employeeUpdated.setBirthdate(employee.birthdate());
        employeeUpdated.setEmail(employee.email());
        employeeUpdated.setName(employee.name());
        return toEmployeeDto(employeeRepository.save(employeeUpdated));
    }

    public EmployeeDto getEmployeeById(int id){
        EmployeeModel foundEmployee = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Funcionário não encontrado com o ID: " + id));
    
        return toEmployeeDto(foundEmployee);
    }
}
