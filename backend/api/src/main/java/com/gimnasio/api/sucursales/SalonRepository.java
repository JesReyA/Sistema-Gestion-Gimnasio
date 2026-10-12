package com.gimnasio.api.sucursales;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.gimnasio.api.sucursales.Sucursal;



public interface SalonRepository extends JpaRepository<Salon, Integer> {

    List<Salon> getByNumeroSalon(String numeroSalon);

    boolean existsByNumeroSalon(String numeroSalon);

}
