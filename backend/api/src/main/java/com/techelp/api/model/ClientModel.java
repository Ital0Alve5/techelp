package com.techelp.api.model;

import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.techelp.api.dto.ClientDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

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
    private String cpf;

    @Column(nullable = true, unique = false)
    private String phone;

    @Column(nullable = false, unique = false)
    private String cep;

    @Column(nullable = false, unique = false)
    private String neighborhood;

    @Column(nullable = false, unique = false)
    private String city;

    @Column(nullable = false, unique = false)
    private String state;

    @Column(nullable = false, unique = false)
    private String street;

    @Column(nullable = false, unique = false)
    private String number;

    @Column(nullable = true, unique = false)
    private String complement;

    @OneToMany(mappedBy = "client")
    @JsonBackReference
    @JsonIgnore
    private List<MaintenanceRequestModel> maintenanceRequests;

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

        super(email, password, name);

        this.cpf = cpf;
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
