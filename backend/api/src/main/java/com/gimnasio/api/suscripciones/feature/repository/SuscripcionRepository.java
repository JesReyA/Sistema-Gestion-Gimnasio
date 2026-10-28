package com.gimnasio.api.suscripciones.feature.repository;

import com.gimnasio.api.clientes.Cliente;
import com.gimnasio.api.suscripciones.persistance.Suscripcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface SuscripcionRepository extends JpaRepository<Suscripcion, Integer>{

    boolean existsByCliente(Cliente cliente);

    @Modifying
    void deleteByCliente(Cliente cliente);
}
