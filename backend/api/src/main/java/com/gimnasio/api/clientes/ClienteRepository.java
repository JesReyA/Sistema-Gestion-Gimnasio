package com.gimnasio.api.clientes;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;



public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    Optional<Cliente> findByCorreoElectronico(String correoElectronico);

    List<Cliente> findByNumeroCelular(String numeroCelular);

    boolean existsByCorreoElectronico(String correoElectronico);
    
    boolean existsByCurp(String curp);
}
