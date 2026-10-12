package com.gimnasio.api.clases;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface ClaseRepository extends JpaRepository<Clase, Integer>{

    List<Clase> findByNombre(String nombre);

    List<Clase> findByTematica(String tematica);

    boolean existsByNombre(String nombre);

}
