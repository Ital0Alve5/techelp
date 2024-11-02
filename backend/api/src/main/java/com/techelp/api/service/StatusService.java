package com.techelp.api.service;

import com.techelp.api.model.StatusModel;
import com.techelp.api.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusService {

    @Autowired
    private StatusRepository statusRepository;

    public StatusModel getStatusByName(String name) {
        return statusRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Status não encontrado com o nome: " + name));
    }

    public StatusModel createStatus(String name) {
        StatusModel status = new StatusModel();
        status.setName(name);
        return statusRepository.save(status);
    }
}
