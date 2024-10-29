package com.techelp.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techelp.api.model.ClientModel;
import com.techelp.api.repository.ClientRepository;

@Service
public class SignUpService {

    @Autowired
    private ClientRepository clientRepository;

    public ClientModel addClient(ClientModel client){
        return this.clientRepository.save(client);
    }
    
}
