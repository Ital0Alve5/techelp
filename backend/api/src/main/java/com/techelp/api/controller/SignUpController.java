package com.techelp.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.techelp.api.model.Client;
import com.techelp.api.service.SignUpService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class SignUpController {

	@Autowired
	private SignUpService signUpService;

	@PostMapping("/signUp")
	public Client addNewClient(@RequestBody Client client) {
		return this.signUpService.addClient(client);
	}

	@GetMapping("/")
	public String teste() {
		return "Isso aqui é um teste do Ítaloooooooo";
	}
}
