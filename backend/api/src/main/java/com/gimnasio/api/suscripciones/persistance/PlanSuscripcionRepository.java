package com.gimnasio.api.suscripciones.persistance;

import com.gimnasio.api.clientes.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlanSuscripcionRepository extends JpaRepository<PlanSuscripcion, Integer> {
    Optional<PlanSuscripcion> findByNombre(String nombre);
}
