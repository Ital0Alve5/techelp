package com.techelp.api.service;

import com.techelp.api.dto.LoginDto;
import com.techelp.api.model.ClientModel;
import com.techelp.api.repository.ClientRepository;
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
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenService tokenService;

    public Map<String, Object> checkClient(LoginDto client) {
        Map<String, String> errors = new HashMap<>();

        if (checkIfUserExistsByEmail(client.getEmail())) {
            errors.put("email", "E-mail inválido.");
        }

        if (!errors.isEmpty()) {
            throw new ValidationException("Erro de validação", errors);
        }

        ClientModel newClient = clientRepository.findByEmail(client.getEmail()).orElseThrow();
        if (!passwordEncoder.matches(client.getPassword(), newClient.getPassword())) {
            throw new InvalidPasswordException("Senha inválida.");
        }

        String token = tokenService.generateToken(newClient, "client");
        return Map.of(
            "id", newClient.getId(),
            "name", newClient.getName(),
            "token", token
        );
    }

    private Boolean checkIfUserExistsByEmail(String email) {
        return clientRepository.findByEmail(email).isEmpty();
    }
}
