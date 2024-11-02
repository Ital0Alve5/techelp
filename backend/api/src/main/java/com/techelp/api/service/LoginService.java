package com.techelp.api.service;

import com.techelp.api.dto.LoginDto;
import com.techelp.api.model.ClientModel;
import com.techelp.api.model.EmployeeModel;
import com.techelp.api.repository.ClientRepository;
import com.techelp.api.repository.EmployeeRepository;
import com.techelp.api.security.service.JwtTokenService;
import com.techelp.api.exception.ValidationException;
import com.techelp.api.exception.InvalidPasswordException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenService tokenService;

    public Map<String, Object> checkClient(LoginDto client) {
        Map<String, String> errors = new HashMap<>();

        if (checkIfClientExistsByEmail(client.getEmail())) {
            errors.put("email", "E-mail inválido!");
        }

        if (!errors.isEmpty()) {
            throw new ValidationException("Erro de validação", errors);
        }

        ClientModel foundClient = clientRepository.findByEmail(client.getEmail()).orElseThrow();
        if (!passwordEncoder.matches(client.getPassword(), foundClient.getPassword())) {
            throw new InvalidPasswordException("Senha inválida!");
        }

        String token = tokenService.generateToken(foundClient, "client");
        return Map.of(
                "clientId", foundClient.getId(),
                "email", foundClient.getEmail(),
                "name", foundClient.getName(),
                "token", token);
    }

    public Map<String, Object> checkEmployee(LoginDto employee) {
        Map<String, String> errors = new HashMap<>();

        if (checkIfEmployeeExistsByEmail(employee.getEmail())) {
            errors.put("email", "E-mail inválido!");
        }

        if (!errors.isEmpty()) {
            throw new ValidationException("Erro de validação", errors);
        }

        EmployeeModel foundEmployee = employeeRepository.findByEmail(employee.getEmail()).orElseThrow();
        if (!passwordEncoder.matches(employee.getPassword(), foundEmployee.getPassword())) {
            throw new InvalidPasswordException("Senha inválida!");
        }

        String token = tokenService.generateToken(foundEmployee, "employee");
        return Map.of(
                "employeeId", foundEmployee.getId(),
                "email", foundEmployee.getEmail(),
                "name", foundEmployee.getName(),
                "token", token);
    }

    private Boolean checkIfClientExistsByEmail(String email) {
        return clientRepository.findByEmail(email).isEmpty();
    }

    private Boolean checkIfEmployeeExistsByEmail(String email) {
        return employeeRepository.findByEmail(email).isEmpty();
    }
}
