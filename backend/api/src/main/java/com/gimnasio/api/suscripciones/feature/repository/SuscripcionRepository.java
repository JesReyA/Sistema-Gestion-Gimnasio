package com.gimnasio.api.suscripciones.feature.repository;

import com.gimnasio.api.suscripciones.persistance.Suscripcion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuscripcionRepository extends JpaRepository<Suscripcion, Integer>{

}
