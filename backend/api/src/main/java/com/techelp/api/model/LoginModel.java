package com.techelp.api.model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class LoginModel {

    @Column(nullable = false, unique = true)
    @NotBlank(message = "E-mail não pode estar vazio")
    @Email(message = "E-mail inválido")
    private String email;

    @Column(nullable = false, unique = false)
    @Pattern(regexp = "^\\d{4}$", message = "A senha deve ser um número de 4 dígitos!")
    @NotBlank(message = "Senha não pode estar vazio")
    private String password;

    public LoginModel(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public LoginModel() {
    }

    public @NotBlank(message = "E-mail não pode estar vazio") @Email(message = "E-mail inválido") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "E-mail não pode estar vazio") @Email(message = "E-mail inválido") String email) {
        this.email = email;
    }

    public @Pattern(regexp = "^\\d{4}$", message = "A senha deve ser um número de 4 dígitos!") @NotBlank(message = "Senha não pode estar vazio") String getPassword() {
        return password;
    }

    public void setPassword(@Pattern(regexp = "^\\d{4}$", message = "A senha deve ser um número de 4 dígitos!") @NotBlank(message = "Senha não pode estar vazio") String password) {
        this.password = password;
    }
}
