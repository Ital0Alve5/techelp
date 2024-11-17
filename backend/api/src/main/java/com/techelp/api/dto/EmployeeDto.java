package com.techelp.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record EmployeeDto(int id,
        @NotBlank(message = "E-mail não pode estar vazio") @Email(message = "E-mail inválido") String email,
        @Pattern(regexp = "^[0-9]{4}$", message = "A senha deve ser um número de 4 dígitos!") String password,
        @Pattern(regexp = "^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s]+$", message = "Nome aceita apenas letras!") @NotBlank(message = "Nome não pode estar vazio") String name,
        @NotBlank(message = "Data de nascimento não pode estar vazia") String birthdate,
        Boolean is_active) {
}
