package com.techelp.api.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.techelp.api.dto.EmployeeDto;
import com.techelp.api.exception.ValidationException;
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
                request.getBirthdate(), request.getIs_active());

        return dto;
    }

    public List<EmployeeDto> getAllEmployeesExceptMe(String email) {
        return employeeRepository.findByEmailNot(email).stream().map(this::toEmployeeDto)
                .collect(Collectors.toList());
    }

    public List<EmployeeDto> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(this::toEmployeeDto)
                .collect(Collectors.toList());
    }

    public EmployeeDto addEmployee(EmployeeDto employee) {
        if (employee.password().isEmpty()) {
            throw new RuntimeException("A senha é obrigatória");
        }
        Map<String, String> validationErrors = this.validate(employee);
        if (!validationErrors.isEmpty()) {
            throw new ValidationException("Erro de validação", validationErrors);
        }
        EmployeeModel newEmployee = new EmployeeModel();
        newEmployee.setBirthdate(employee.birthdate());
        newEmployee.setEmail(employee.email());
        newEmployee.setName(employee.name());
        newEmployee.setPassword(passwordEncoder.encode(employee.password()));
        newEmployee.setIs_active(true);
        return toEmployeeDto(employeeRepository.save(newEmployee));
    }

    public EmployeeDto editEmployee(String email, int id, EmployeeDto employee) {
        EmployeeModel employeeUpdated = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado com o ID: " + id));
        if (employeeUpdated.getEmail().equals(email)) {
            if (!employee.is_active()) {
                throw new RuntimeException("Funcionário não pode remover a si mesmo");
            }
        }
        if (!employeeUpdated.getEmail().equals(employee.email())) {
            Map<String, String> validationErrors = this.validate(employee);
            if (!validationErrors.isEmpty()) {
                throw new ValidationException("Erro de validação", validationErrors);
            }
        }
        employeeUpdated.setBirthdate(employee.birthdate());
        employeeUpdated.setEmail(employee.email());
        employeeUpdated.setName(employee.name());
        if (employee.is_active() != null) {
            employeeUpdated.setIs_active(employee.is_active());
        }
        return toEmployeeDto(employeeRepository.save(employeeUpdated));
    }

    public EmployeeDto getEmployeeById(int id) {
        EmployeeModel foundEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado com o ID: " + id));

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
