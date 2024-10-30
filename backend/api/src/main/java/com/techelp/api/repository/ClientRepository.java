package com.techelp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.techelp.api.model.ClientModel;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<ClientModel, Integer> {

    List<ClientModel> findByEmailAndPassword(String email, String password);
}
