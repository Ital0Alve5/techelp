package com.techelp.api.service;

import org.springframework.stereotype.Service;

import com.techelp.api.dto.ClientDto;
import com.techelp.api.dto.response.AuthData;
import com.techelp.api.exception.ValidationException;
import com.techelp.api.model.ClientModel;
import com.techelp.api.repository.ClientRepository;
import com.techelp.api.security.service.JwtTokenService;

import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@RequiredArgsConstructor
public class SignUpService {

    private final PasswordEncoder passwordEncoder;
    private final ClientRepository clientRepository;
    private final JwtTokenService tokenService;

    public AuthData addClient(ClientDto client, String password) {
        Map<String, String> validationErrors = validate(client);

        if (!validationErrors.isEmpty()) {
            throw new ValidationException("Erro de validação", validationErrors);
        }

        ClientModel clientModel = ClientModel.fromDto(client);
        clientModel.setPassword(passwordEncoder.encode(password));
        clientModel.setCep(removeNonNumeric(client.cep()));
        clientModel.setPhone(removeNonNumeric(client.phone()));
        clientModel.setCpf(removeNonNumeric(client.cpf()));

        clientRepository.save(clientModel);

        String token = tokenService.generateToken(clientModel, "client");
        AuthData authData = new AuthData(clientModel.getId(), clientModel.getName(), token);
        
        return authData;
    }

    public Map<String, String> validate(ClientDto client) {
        Map<String, String> errors = new HashMap<>();

        if (!checkIfUserExistsByEmail(client)) {
            errors.put("email", "E-mail já cadastrado.");
        }
        if (!checkIfUserExistsByCpf(client)) {
            errors.put("cpf", "CPF já cadastrado.");
        }
        if (!isValidCpf(client.cpf())) {
            errors.put("cpf", "CPF é inválido.");
        }

        return errors;
    }

    private Boolean checkIfUserExistsByEmail(ClientDto client) {
        return clientRepository.findByEmail(client.email()).isEmpty();
    }

    private Boolean checkIfUserExistsByCpf(ClientDto client) {
        return clientRepository.findByCpf(removeNonNumeric(client.cpf())).isEmpty();
    }

    private String removeNonNumeric(String value) {
        return value != null ? value.replaceAll("[^0-9]", "") : null;
    }

    private boolean isValidCpf(String cpf) {
        cpf = removeNonNumeric(cpf);
        if (cpf == null || cpf.length() != 11 || cpf.chars().distinct().count() == 1)
            return false;

        try {
            int[] cpfArray = cpf.chars().map(Character::getNumericValue).toArray();
            return validateCpfDigits(cpfArray);
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean validateCpfDigits(int[] cpfArray) {
        int firstCheckDigit = calculateCpfDigit(cpfArray, 10);
        int secondCheckDigit = calculateCpfDigit(cpfArray, 11);
        return firstCheckDigit == cpfArray[9] && secondCheckDigit == cpfArray[10];
    }

    private int calculateCpfDigit(int[] cpfArray, int multiplier) {
        int sum = 0;
        for (int i = 0; i < multiplier - 1; i++)
            sum += cpfArray[i] * (multiplier - i);
        return (sum * 10) % 11 == 10 ? 0 : (sum * 10) % 11;
    }
}
