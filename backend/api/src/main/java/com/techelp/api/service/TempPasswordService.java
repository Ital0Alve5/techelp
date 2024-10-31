package com.techelp.api.service;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techelp.api.dto.ClientDto;
import com.techelp.api.exception.InvalidTempPasswordException;
import com.techelp.api.model.TempPassword;
import com.techelp.api.repository.TempPasswordRepository;

@Service
public class TempPasswordService {

    @Autowired
    private TempPasswordRepository tempPasswordRepository;

    public String createAndAssociateTempPassword(String email) {
        String tempPasswordValue = String.format("%04d", new Random().nextInt(10000));
        Optional<TempPassword> existingTempPassword = tempPasswordRepository.findByEmail(email);

        if (existingTempPassword.isPresent()) {
            TempPassword tempPassword = existingTempPassword.get();
            tempPassword.setPassword(tempPasswordValue);
            tempPasswordRepository.save(tempPassword);
        } else {
            TempPassword tempPassword = new TempPassword(tempPasswordValue, email);
            tempPasswordRepository.save(tempPassword);
        }

        return tempPasswordValue;
    }

    public void confirmTempPassword(ClientDto clientDto, String tempPasswordValue) {
        Optional<TempPassword> tempPasswordOptional = tempPasswordRepository.findByEmailAndPassword(clientDto.email(), tempPasswordValue);

        if (!tempPasswordOptional.isPresent()) {
            throw new InvalidTempPasswordException("Senha temporária inválida ou expirada.");
        }

        tempPasswordRepository.delete(tempPasswordOptional.get());
    }
}
