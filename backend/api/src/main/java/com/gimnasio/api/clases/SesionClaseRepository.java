package com.gimnasio.api.clases;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDate;

public interface SesionClaseRepository extends JpaRepository<SesionClase, Integer>{

    List<SesionClase> getByFecha(LocalDate fecha);


}
