package com.techelp.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {

    @NotBlank(message = "E-mail não pode estar vazio!")
    @Email(message = "E-mail inválido")
    private String email;

    @Pattern(regexp = "^\\d{4}$", message = "A senha deve ser um número de 4 dígitos!")
    @NotBlank(message = "Senha não pode estar vazia!")
    private String password;

    private String userType;

    public LoginDto() {
    }

    public LoginDto(String email, String password, String userType) {
        this.email = email;
        this.password = password;
        this.userType = userType;
    }
}
