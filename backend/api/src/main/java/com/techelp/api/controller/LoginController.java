package com.techelp.api.controller;

import com.techelp.api.model.ClientModel;
import com.techelp.api.model.LoginModel;
import com.techelp.api.service.LoginService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public int checkClient(@RequestBody LoginModel loginModel) {
       return this.loginService.checkClient(loginModel.getEmail(),loginModel.getPassword());
    }
}
