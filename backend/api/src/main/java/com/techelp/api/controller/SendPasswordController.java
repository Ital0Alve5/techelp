package com.techelp.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.techelp.api.dto.EmailDto;
import com.techelp.api.service.EmailService;

@RestController
@RequestMapping("/api")
public class SendPasswordController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendpassword")
    @ResponseStatus(HttpStatus.CREATED)
    public String registerUser(@RequestBody EmailDto emailDto) {
		return emailService.sendPasswordEmail(emailDto);
    }

}
