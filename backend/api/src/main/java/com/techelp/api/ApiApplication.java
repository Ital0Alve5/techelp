package com.techelp.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@SpringBootApplication
public class ApiApplication {

	@GetMapping("/")
	public String teste() {
		return "opa, tamo aí!";
	}

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

}
