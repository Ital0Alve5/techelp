package com.techelp.api.dto;

import org.hibernate.validator.constraints.br.CPF;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ClientDto(
    int id,
        @NotBlank(message = "E-mail não pode estar vazio") @Email(message = "E-mail inválido!") String email,
        String password,
        @CPF(message = "CPF inválido!") @NotBlank(message = "CPF não pode estar vazio!") String cpf,
        @Pattern(regexp = "^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s]+$", message = "Nome aceita apenas letras!") @NotBlank(message = "Nome não pode estar vazio!") String name,
        @Pattern(regexp = "^(?:\\+55\\s?)?(?:\\(?\\d{2}\\)?\\s?)?\\d{4,5}[-\\s]?\\d{4}$", message = "Telefone inválido!") @NotBlank(message = "Telefone não pode estar vazio!") String phone,
        @Pattern(regexp = "^\\d{5}-?\\d{3}$", message = "CEP inválido!") @NotBlank(message = "CEP não pode estar vazio!") String cep,
        @Pattern(regexp = "^[A-Za-zÀ-ÖØ-öø-ÿ0-9' -]{2,}$", message = "Bairro inválido!") @NotBlank(message = "Bairro não pode estar vazio!") String neighborhood,
        @Pattern(regexp = "^[A-Za-zÀ-ÖØ-öø-ÿ'´ ]{2,}$", message = "Cidade inválida!") @NotBlank(message = "Cidade não pode estar vazio!") String city,
        @Pattern(regexp = "^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$", message = "UF inválida!") @NotBlank(message = "Estado não pode estar vazio!") String state,
        @NotBlank(message = "Rua não pode estar vazio") String street,
        @Pattern(regexp = "^[0-9]+[A-Z]?[0-9]*[-/]*[A-Z0-9]*$", message = "Número da casa inválido!") @NotBlank(message = "Número da casa não pode estar vazio!") String number,
        String complement) {
}
