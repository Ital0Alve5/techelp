package com.techelp.api.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class MaintenanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "device_id", nullable = false)
    private Device device;

    @Column(precision = 10, scale = 2)
    private BigDecimal budget;

    @Column(length = 255)
    private String orientation;

    @Column(length = 255)
    private String rejectReason;

    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    private Status status;

    // Getters e Setters
}
