package com.techelp.api.controller;

import com.techelp.api.dto.LoginDto;
import com.techelp.api.dto.response.ApiResponse;
import com.techelp.api.dto.response.ErrorResponse;
import com.techelp.api.dto.response.SuccessResponse;
import com.techelp.api.exception.ValidationException;
import com.techelp.api.exception.InvalidPasswordException;
import com.techelp.api.service.LoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/login")
@CrossOrigin
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<ApiResponse> checkClient(@RequestBody LoginDto loginModel) {
        try {
            Map<String, Object> authData = loginService.checkClient(loginModel);
            SuccessResponse<Map<String, Object>> successResponse = new SuccessResponse<>(HttpStatus.OK.value(),
                    "Login realizado com sucesso", Optional.of(authData));
            return ResponseEntity.ok(successResponse);

        } catch (ValidationException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
                    ex.getErrors());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);

        } catch (InvalidPasswordException ex) {
            ErrorResponse errorResponse = new ErrorResponse("Erro de validação", HttpStatus.BAD_REQUEST.value(),
                    Map.of("password", ex.getMessage()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
