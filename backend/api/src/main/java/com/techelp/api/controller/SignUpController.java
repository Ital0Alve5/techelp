package com.techelp.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.techelp.api.dto.ClientDto;
import com.techelp.api.dto.response.AuthResponse;
import com.techelp.api.dto.response.SignUpResponse;
import com.techelp.api.service.SignUpService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
public class SignUpController {
	private final SignUpService signUpService;

	@PostMapping("/signUp")
	public ResponseEntity<SignUpResponse> addNewClient(@RequestBody @Valid ClientDto client) {

		return signUpService.addClient(client);

		// ClientModel newClient = clientRepository.findByEmail(client).get();

		// if(passwordEncoder.matches(newClient.getPassword(), client.getPassword())){
		// String token = tokenService.generateToken(newClient, "client");
		// }
	}

	@GetMapping("/")
	public String teste() {
		return "Isso aqui é um teste do Ítaloooooooo";
	}
}
