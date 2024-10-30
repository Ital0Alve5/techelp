package com.techelp.api.service;

import com.techelp.api.model.ClientModel;
import com.techelp.api.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private ClientRepository clientRepository;

    public int checkClient(String email, String password){
        Optional<ClientModel> modelo =  this.clientRepository.findByEmail(email);
        if(modelo.isEmpty()) return 0;
        return modelo.get().getPassword().equals(password) ? modelo.get().getId() : 0;
    }

}
