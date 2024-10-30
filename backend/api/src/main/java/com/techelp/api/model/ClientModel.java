package com.techelp.api.model;

import org.hibernate.validator.constraints.br.CPF;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.techelp.api.dto.ClientDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
// import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Component
@Scope("prototype")
@Entity
@Table(name = "Client")
@Getter
@Setter
public class ClientModel extends User {
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

    @Column(nullable = true, unique = false)
    @Pattern(regexp = "^(?:\\+55\\s?)?(?:\\(?\\d{2}\\)?\\s?)?\\d{4,5}[-\\s]?\\d{4}$", message = "Telefone inválido!")
    @NotBlank(message = "Telefone não pode estar vazio")
    private String phone;

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
        super();
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

        super(email, password);

        this.cpf = cpf;
        this.name = name;
        this.phone = phone;
        this.cep = cep;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.street = street;
        this.number = number;
        this.complement = complement;
    }

    static public ClientModel fromDto(ClientDto clientDto) {
        return new ClientModel(
                clientDto.cpf(),
                clientDto.name(),
                clientDto.email(),
                clientDto.phone(),
                clientDto.password(),
                clientDto.cep(),
                clientDto.neighborhood(),
                clientDto.city(),
                clientDto.state(),
                clientDto.street(),
                clientDto.number(),
                clientDto.complement());
    }
}
