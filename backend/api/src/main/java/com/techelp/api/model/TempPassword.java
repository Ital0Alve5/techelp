package com.techelp.api.model;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Component
@Scope("prototype")
@Entity
@Table(name = "temp_password")
@Getter
@Setter
public class TempPassword {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(nullable = false, unique = true)
    private String password;

    @Column(nullable = false, unique = false)
    private String email; 

    public TempPassword(String password, String email) {
        this.password = password;
        this.email = email;
    }

    public TempPassword() {}
}
