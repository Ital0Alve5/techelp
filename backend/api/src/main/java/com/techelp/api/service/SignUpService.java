package com.techelp.api.service;

import org.springframework.stereotype.Service;

import com.techelp.api.dto.ClientDto;
import com.techelp.api.dto.response.AuthResponse;
import com.techelp.api.dto.response.ErrorResponse;
import com.techelp.api.dto.response.SignUpResponse;
import com.techelp.api.model.ClientModel;
import com.techelp.api.repository.ClientRepository;
import com.techelp.api.security.service.JwtTokenService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class SignUpService {

    private final PasswordEncoder passwordEncoder;
    private final ClientRepository clientRepository;
    private final JwtTokenService tokenService;

    public ResponseEntity<SignUpResponse> addClient(ClientDto client) {
        if (!this.checkIfUserExistsByEmail(client)) {
            ErrorResponse error = new ErrorResponse("Email já cadastrado.", HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } else if (!this.checkIfUserExistsByCpf(client)) {
            ErrorResponse error = new ErrorResponse("CPF já cadastrado.", HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } else if (!this.checkPasswordConfirmation(client)) {
            ErrorResponse error = new ErrorResponse("As senhas não são iguais.", HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }

        ClientModel clientModel = ClientModel.fromDto(client);

        clientModel.setPassword(passwordEncoder.encode(clientModel.getPassword()));
        clientModel.setCep(this.removeNonNumeric(client.cep()));
        clientModel.setPhone(this.removeNonNumeric(client.phone()));
        clientModel.setCpf(this.removeNonNumeric(client.cpf()));

        clientRepository.save(clientModel);

        String token = tokenService.generateToken(clientModel, "client");

        return ResponseEntity.ok(new AuthResponse(clientModel.getId(), clientModel.getName(), token));
    }

    public Boolean checkIfUserExistsByEmail(ClientDto client) {
        return clientRepository.findByEmail(client.email()).isEmpty();
    }

    public Boolean checkIfUserExistsByCpf(ClientDto client) {

        return clientRepository.findByCpf(this.removeNonNumeric(client.cpf())).isEmpty();
    }

    private Boolean checkPasswordConfirmation(ClientDto clientDto) {
        return clientDto.password().equals(clientDto.confirmPassword());
    }

    private String removeNonNumeric(String value) {
        if (value == null) {
            return null;
        }

        return value.replaceAll("[^0-9]", "");
    }

}
