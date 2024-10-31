package com.techelp.api.controller;

import com.techelp.api.dto.LoginDto;
import com.techelp.api.dto.response.LoginResponse;
import com.techelp.api.model.ClientModel;
import com.techelp.api.service.LoginService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<LoginResponse> checkClient(@RequestBody LoginDto loginModel) {
       return this.loginService.checkClient(loginModel);
    }
}
