package com.techelp.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/maintenance-budgets")
public class MaintenanceBudgetController {

    @GetMapping("/hello")
    public String helloWorld() {
        return "Olá Mundo";
    }
}
