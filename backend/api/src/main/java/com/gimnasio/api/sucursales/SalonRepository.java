package com.gimnasio.api.sucursales;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface SalonRepository extends JpaRepository<Salon, Integer> {

    List<Salon> getByNumeroSalon(String numeroSalon);

    boolean existsByNumeroSalon(String numeroSalon);

}
