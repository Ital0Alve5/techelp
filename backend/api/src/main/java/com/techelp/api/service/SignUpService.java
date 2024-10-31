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

import java.util.HashMap;
import java.util.Map;

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

        ResponseEntity<SignUpResponse> hasErrors = this.validate(client);

        if (hasErrors != null) {
            return hasErrors;
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

    private ResponseEntity<SignUpResponse> validate(ClientDto client) {

        Map<String, String> errors = new HashMap<>();

        if (!this.checkIfUserExistsByEmail(client)) {
            errors.put("email", "E-mail já cadastrado.");
        }

        if (!this.checkIfUserExistsByCpf(client)) {
            errors.put("cpf", "CPF já cadastrado.");
        }

        if (!this.isValidCpf(client.cpf())) {
            errors.put("cpf", "CPF é inválido.");
        }

        if (!errors.isEmpty()) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
                    errors);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }

        return null;
    }

    public Boolean checkIfUserExistsByEmail(ClientDto client) {
        return clientRepository.findByEmail(client.email()).isEmpty();
    }

    public Boolean checkIfUserExistsByCpf(ClientDto client) {

        return clientRepository.findByCpf(this.removeNonNumeric(client.cpf())).isEmpty();
    }

    private String removeNonNumeric(String value) {
        if (value == null) {
            return null;
        }

        return value.replaceAll("[^0-9]", "");
    }

    private boolean isValidCpf(String cpf) {
        cpf = this.removeNonNumeric(cpf);

        if (cpf == null || cpf.length() != 11 || cpf.chars().distinct().count() == 1) {
            return false;
        }

        try {
            int[] cpfArray = new int[11];
            for (int i = 0; i < 11; i++) {
                cpfArray[i] = Character.getNumericValue(cpf.charAt(i));
            }

            int sum1 = 0;
            for (int i = 0; i < 9; i++) {
                sum1 += cpfArray[i] * (10 - i);
            }
            int firstCheckDigit = (sum1 * 10) % 11;
            if (firstCheckDigit == 10)
                firstCheckDigit = 0;

            int sum2 = 0;
            for (int i = 0; i < 10; i++) {
                sum2 += cpfArray[i] * (11 - i);
            }
            int secondCheckDigit = (sum2 * 10) % 11;
            if (secondCheckDigit == 10)
                secondCheckDigit = 0;

            return firstCheckDigit == cpfArray[9] && secondCheckDigit == cpfArray[10];
        } catch (NumberFormatException e) {
            return false;
        }
    }

}
