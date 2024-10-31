package com.techelp.api.service;

import com.techelp.api.dto.LoginDto;
import com.techelp.api.dto.response.AuthResponse;
import com.techelp.api.dto.response.ErrorResponse;
import com.techelp.api.model.ClientModel;
import com.techelp.api.repository.ClientRepository;
import com.techelp.api.security.service.JwtTokenService;
import com.techelp.api.dto.response.LoginResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {

    @Autowired
    private ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService tokenService;

    public ResponseEntity<LoginResponse> checkClient(LoginDto client){
        Map<String, String> errors = new HashMap<>();

        if(this.checkIfUserExistsByEmail(client.getEmail())){
                errors.put("email", "E-mail inválido.");
        }      
                if (!errors.isEmpty()) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
                    errors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
        ClientModel newClient = clientRepository.findByEmail(client.getEmail()).get();
        if(passwordEncoder.matches(client.getPassword(),newClient.getPassword())){
            String token = tokenService.generateToken(newClient, "client");
            return ResponseEntity.ok(new AuthResponse(newClient.getId(), newClient.getName(), token));
        }
        errors.put("password", "Senha inválida.");
        ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
        errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);        
    }

    public Boolean checkIfUserExistsByEmail(String email){
        return clientRepository.findByEmail(email).isEmpty();
    }
        
}
