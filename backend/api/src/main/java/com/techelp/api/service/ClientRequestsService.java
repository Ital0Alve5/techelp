package com.techelp.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techelp.api.dto.SolicitacaoDto;
import com.techelp.api.repository.MaintenanceRequestRepository;
import com.techelp.api.model.MaintenanceRequest;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientRequestsService {

    @Autowired
    private MaintenanceRequestRepository maintenanceRequestRepository;

    public List<SolicitacaoDto> getSolicitacoesByClientId(Long clientId) {
        List<MaintenanceRequest> solicitacoes = maintenanceRequestRepository.findByClientId(clientId);
        return solicitacoes.stream().map(SolicitacaoDto::new).collect(Collectors.toList());
    }
}
