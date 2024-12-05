package com.techelp.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.techelp.api.model.EmployeeModel;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeModel, Integer> {
    Optional<EmployeeModel> findByEmail(String email);

    Optional<EmployeeModel> findById(int id);

    List<EmployeeModel> findByEmailNot(String email);
}
