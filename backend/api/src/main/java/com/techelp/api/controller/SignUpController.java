package com.techelp.api.controller;

import com.techelp.api.dto.ClientDto;
import com.techelp.api.dto.EmailDto;
import com.techelp.api.dto.response.ApiResponse;
import com.techelp.api.dto.response.ErrorResponse;
import com.techelp.api.dto.response.SuccessResponse;
import com.techelp.api.exception.InvalidTempPasswordException;
import com.techelp.api.exception.ValidationException;
import com.techelp.api.service.EmailService;
import com.techelp.api.service.SignUpService;
import com.techelp.api.service.TempPasswordService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin
public class SignUpController {

	private final SignUpService signUpService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private TempPasswordService tempPasswordService;

	@PostMapping("/validateClient")
	public ResponseEntity<ApiResponse> validateClient(@RequestBody @Valid ClientDto client) {
		try {
			Map<String, String> validationErrors = signUpService.validate(client);
			if (!validationErrors.isEmpty()) {
				throw new ValidationException("Erro de validação", validationErrors);
			}
			SuccessResponse<String> successResponse = new SuccessResponse<>(HttpStatus.OK.value(),
					"Cliente validado", Optional.empty());
			return ResponseEntity.ok(successResponse);
		} catch (ValidationException ex) {
			ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
					ex.getErrors());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
		}
	}

	@PostMapping("/sendPassword")
	public ResponseEntity<ApiResponse> registerUser(@RequestBody EmailDto emailDto) {
		try {
			emailService.sendPasswordEmail(emailDto);

			SuccessResponse<String> successResponse = new SuccessResponse<>(HttpStatus.CREATED.value(),
					"E-mail enviado com sucesso!", null);
			return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
		} catch (Exception e) {
			ErrorResponse errorResponse = new ErrorResponse("Erro de serviço", HttpStatus.BAD_REQUEST.value(),
					Map.of("emailSender", "Erro ao enviar e-mail!"));
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
		}
	}

	/*
	 * api/signUp?tempPassword=9999
	 */
	@PostMapping("/signUp")
	public ResponseEntity<ApiResponse> addNewClient(@RequestParam String tempPassword,
			@RequestBody @Valid ClientDto clientDto) {

		try {
			tempPasswordService.confirmTempPassword(clientDto, tempPassword);
		} catch (InvalidTempPasswordException e) {
			ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
					Map.of("tempPassword", e.getMessage()));
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
		}

		try {
			ApiResponse response = signUpService.addClient(clientDto, tempPassword);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (ValidationException ex) {
			ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
					ex.getErrors());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
		}
	}

	@GetMapping("/")
	public String teste() {
		return "Isso aqui é um teste do Ítaloooooooo";
	}
}
