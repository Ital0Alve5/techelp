package com.techelp.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.techelp.api.model.TempPassword;
import java.util.Optional;

@Repository
public interface TempPasswordRepository extends JpaRepository<TempPassword, Integer> {

    Optional<TempPassword> findByEmail(String email);

    Optional<TempPassword> findByEmailAndPassword(String email, String password);
}
