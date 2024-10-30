package com.techelp.api.model;

import org.hibernate.validator.constraints.br.CPF;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
@Component
@Scope("prototype")
@Entity
@Table(name = "Client")
public class ClientModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(nullable = false, unique = true)
    @CPF(message = "CPF inválido!")
    @NotBlank(message = "CPF não pode estar vazio")
    private String cpf;

    @Column(nullable = false, unique = false)
    @Pattern(regexp = "^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\\s]+$", message = "Nome aceita apenas letras!")
    @NotBlank(message = "Nome não pode estar vazio")
    private String name;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "E-mail não pode estar vazio")
    @Email(message = "E-mail inválido")
    private String email;

    @Column(nullable = true, unique = false)
    @Pattern(regexp = "^(?:\\+55\\s?)?(?:\\(?\\d{2}\\)?\\s?)?\\d{4,5}[-\\s]?\\d{4}$", message = "Telefone inválido!")
    @NotBlank(message = "Telefone não pode estar vazio")
    private String phone;

    @Column(nullable = false, unique = false)
    @Pattern(regexp = "^\\d{4}$", message = "A senha deve ser um número de 4 dígitos!")
    @NotBlank(message = "Senha não pode estar vazio")
    private String password;

    @Column(nullable = false, unique = false)
    @Pattern(regexp = "^\\d{5}-?\\d{3}$", message = "CEP inválido!")
    @NotBlank(message = "CEP não pode estar vazio")
    private String cep;

    @Column(nullable = false, unique = false)
    @Pattern(regexp = "^[A-Za-zÀ-ÖØ-öø-ÿ0-9' -]{2,}$", message = "Bairro inválido!")
    @NotBlank(message = "Bairro não pode estar vazio")
    private String neighborhood;

    @Column(nullable = false, unique = false)
    @Pattern(regexp = "^[A-Za-zÀ-ÖØ-öø-ÿ'´ ]{2,}$", message = "Cidade inválida!")
    @NotBlank(message = "Cidade não pode estar vazio")
    private String city;

    @Column(nullable = false, unique = false)
    @Pattern(regexp = "^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$", message = "UF inválida!")
    @NotBlank(message = "Estado não pode estar vazio")
    private String state;

    @Column(nullable = false, unique = false)
    @NotBlank(message = "Rua não pode estar vazio")
    private String street;

    @Column(nullable = false, unique = false)
    @Pattern(regexp = "^[0-9]+[A-Z]?[0-9]*[-/]*[A-Z0-9]*$", message = "Número da casa inválido!")
    @NotBlank(message = "Número da casa não pode estar vazio")
    private String number;

    @Column(nullable = false, unique = false)
    @NotBlank(message = "Complemento não pode estar vazio")
    private String complement;

    public ClientModel() {
    }
    public ClientModel(
            String cpf,
            String name,
            String email,
            String phone,
            String password,
            String cep,
            String neighborhood,
            String city,
            String state,
            String street,
            String number,
            String complement) {
        this.cpf = cpf;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.cep = cep;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.street = street;
        this.number = number;
        this.complement = complement;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCpf() {
        return this.cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCep() {
        return this.cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getNeighborhood() {
        return this.neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return this.state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getStreet() {
        return this.street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return this.number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getComplement() {
        return this.complement;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }
}
