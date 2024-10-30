package com.techelp.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.techelp.api.model.ClientModel;
import com.techelp.api.service.SignUpService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SignUpController {

	@Autowired
	private SignUpService signUpService;

	@PostMapping("/signUp")
	public ResponseEntity<ClientModel> addNewClient(@RequestBody @Valid ClientModel client) {
		return ResponseEntity.ok(signUpService.addClient(client));
	}

	@GetMapping("/")
	public String teste() {
		return "Isso aqui é um teste do Ítaloooooooo";
	}
}
