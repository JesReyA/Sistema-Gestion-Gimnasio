package com.gimnasio.api.trabajadores;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gimnasio.api.common.enums.RolTrabajador;


public interface TrabajadorRepository extends JpaRepository<Trabajador, Integer>{

    Optional<Trabajador> findByRfc(String rfc);

    List<Trabajador> findByRol(RolTrabajador rol);

    boolean existsByRfc(String rfc);
}
