package com.techelp.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.techelp.api.model.StatusModel;

@Repository
public interface StatusRepository extends JpaRepository<StatusModel, Integer> {
    Optional<StatusModel> findByName(String name);
}
