package com.techelp.api.service;

import com.techelp.api.dto.ClientDto;
import com.techelp.api.dto.EmployeeDto;
import com.techelp.api.exception.ValidationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.techelp.api.model.EmployeeModel;
import com.techelp.api.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    
    private final PasswordEncoder passwordEncoder;

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
        Map<String, String> validationErrors = this.validate(employee);
            if (!validationErrors.isEmpty()) {
				throw new ValidationException("Erro de validação", validationErrors);
	}
        EmployeeModel newEmployee = new EmployeeModel();
        newEmployee.setBirthdate(employee.datebirth());
        newEmployee.setEmail(employee.email());
        newEmployee.setName(employee.name());
        newEmployee.setPassword(passwordEncoder.encode(employee.password()));

        return toEmployeeDto(employeeRepository.save(newEmployee));
    }

    public EmployeeDto editEmployee(String email, int id, EmployeeDto employee){
        EmployeeModel employeeUpdated = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Funcionário não encontrado com o ID: " + id));
        if(employeeUpdated.getEmail() == email) {
            throw new RuntimeException("Funcionário não pode editar a si mesmo");
        }
        Map<String, String> validationErrors = this.validate(employee);
            if (!validationErrors.isEmpty()) {
				throw new ValidationException("Erro de validação", validationErrors);
	        }
        employeeUpdated.setBirthdate(employee.datebirth());
        employeeUpdated.setEmail(employee.email());
        employeeUpdated.setName(employee.name());
        return toEmployeeDto(employeeRepository.save(employeeUpdated));
    }

    public EmployeeDto getEmployeeById(int id){
        EmployeeModel foundEmployee = employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Funcionário não encontrado com o ID: " + id));
    
        return toEmployeeDto(foundEmployee);
    }

     public Map<String, String> validate(EmployeeDto employee) {
        Map<String, String> errors = new HashMap<>();

        if (!checkIfEmployeeExistsByEmail(employee)) {
            errors.put("email", "E-mail já cadastrado.");
        }

        return errors;
    }
    private Boolean checkIfEmployeeExistsByEmail(EmployeeDto employee) {
        return employeeRepository.findByEmail(employee.email()).isEmpty();
    }
}
