package com.techelp.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techelp.api.model.Client;
import com.techelp.api.repository.ClientRepository;

@Service
public class SignUpService {

    @Autowired
    private ClientRepository clientRepository;

    public Client addClient(Client client){
        return this.clientRepository.save(client);
    }
    
}
