package com.techelp.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.techelp.api.dto.SolicitacaoDto;
import com.techelp.api.service.ClientRequestsService;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clientRequests")
@CrossOrigin
public class ClientRequestsController {

    private final ClientRequestsService clientRequestsService;

    @GetMapping("/solicitacoes")
    public ResponseEntity<List<SolicitacaoDto>> getSolicitacoesCliente(@RequestParam Long clientId) {
        List<SolicitacaoDto> solicitacoes = clientRequestsService.getSolicitacoesByClientId(clientId);
        return ResponseEntity.ok(solicitacoes);
    }
}
