package com.gimnasio.api.sucursales;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface SucursalRepository extends JpaRepository<Sucursal, Integer> {

    List<Sucursal> findByCodigoPostal(String codigoPostal);

    boolean existsByNombre(String nombre);

}
