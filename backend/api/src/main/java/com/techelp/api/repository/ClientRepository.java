package com.techelp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techelp.api.model.ClientModel;

@Repository
public interface ClientRepository extends JpaRepository<ClientModel, Integer> {}
