package com.techelp.api.model;

import jakarta.persistence.*;
import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Component
@Scope("prototype")
@Entity
@Table(name = "Device")
@Getter
@Setter
public
class DeviceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @NotNull(message = "Categoria não pode estar vazia")
    private CategoryModel category;

    @Column(nullable = false, unique = false)
    @NotBlank(message = "Descrição do aparelho não pode estar vazio")
    private String device_description;

    @Column(nullable = false, unique = false)
    @NotBlank(message = "Descrição do defeito não pode estar vazio")
    private String issue_description;

    @OneToMany(mappedBy = "device")
    private List<MaintenanceRequestModel> maintenanceRequests;

    public DeviceModel() {
    }

    public DeviceModel(
            CategoryModel category, String device_description, String issue_description) {
        this.category = category;
        this.device_description = device_description;
        this.issue_description = issue_description;
    }

}
