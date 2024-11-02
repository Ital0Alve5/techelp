package com.techelp.api.model;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Component
@Scope("prototype")
@Entity
@Table(name = "Category")
@Getter
@Setter
public class CategoryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Nome não pode estar vazio")
    private String name;

    @Column(nullable = false, unique = false)
    private Boolean is_active;

    public CategoryModel() {
    }

    public CategoryModel(
            String name, Boolean is_active) {
        this.name = name;
        this.is_active = is_active;
    }
}
