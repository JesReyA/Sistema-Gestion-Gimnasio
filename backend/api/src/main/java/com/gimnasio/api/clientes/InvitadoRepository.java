package com.gimnasio.api.clientes;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



public interface InvitadoRepository extends JpaRepository<Invitado, Integer>{

    List<Invitado> getByCorreoElectronico(String correoElectronico);

    List<Invitado> getByNumeroCelular(String numeroCelular);

    boolean existsByCorreoElectronico(String correoElectronico);


}
