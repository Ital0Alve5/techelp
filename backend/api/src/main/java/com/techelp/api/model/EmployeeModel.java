package com.techelp.api.model;

import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Component
@Scope("prototype")
@Entity
@Table(name = "Employee")
@Getter
@Setter
public class EmployeeModel extends User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = false)
    @NotBlank(message = "Senha não pode estar vazio")
    private String password;

    @Column(nullable = false, unique = false)
    @NotBlank(message = "Data de nascimento não pode estar vazia")
    private String birthdate;

    @OneToMany(mappedBy = "employee")
    private List<HistoryModel> historyRecords;

    @Column(unique = false)
    private Boolean is_active;

    public EmployeeModel() {
        super();
    }

    public EmployeeModel(
            String name,
            String email,
            String password) {

        super(email, password, name);
    }
}
