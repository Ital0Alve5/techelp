package com.techelp.api.dto;

public record ClientDto(
        int id,
        String email,
        String password,
        String confirmPassword,
        String cpf,
        String name,
        String phone,
        String cep,
        String neighborhood,
        String city,
        String state,
        String street,
        String number,
        String complement) {
}
