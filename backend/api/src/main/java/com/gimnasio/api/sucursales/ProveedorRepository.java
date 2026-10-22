package com.gimnasio.api.sucursales;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface ProveedorRepository extends JpaRepository<Proveedor, Integer>{

    List<Proveedor> getByTipoServicio(String tipoServicio);

    List<Proveedor> getByNombre(String nombre);

    boolean existsByNombre(String nombre);

}
