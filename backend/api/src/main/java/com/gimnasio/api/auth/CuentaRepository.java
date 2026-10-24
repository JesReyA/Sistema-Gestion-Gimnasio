package com.gimnasio.api.auth;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface CuentaRepository extends JpaRepository<Cuenta, Integer> {

    Optional<Cuenta> findByCorreoElectronico(String correoElectronico);

    boolean existsByCorreoElectronico(String correoElectronico);
}
