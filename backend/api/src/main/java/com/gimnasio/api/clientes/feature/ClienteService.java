package com.gimnasio.api.clientes.feature;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gimnasio.api.auth.Cuenta;
import com.gimnasio.api.auth.CuentaRepository;
import com.gimnasio.api.clientes.Cliente;
import com.gimnasio.api.clientes.dto.AccesoQrDTO;


@Service 
public class ClienteService {
    private CuentaRepository cuentaRepository;

    public ClienteService(CuentaRepository cuentaRepository) {
        this.cuentaRepository = cuentaRepository;
    }

    @Transactional (readOnly = true)
    public AccesoQrDTO obtenerCodigoQR (String correo){
        Cuenta cuenta = cuentaRepository.findByCorreoElectronico(correo)
        .orElseThrow(() -> new IllegalStateException("No existe la cuenta"));

        Cliente cliente = cuenta.getCliente();

        if(cliente == null) throw new IllegalStateException("La cuenta no está asociada a un cliente");
        
        return new AccesoQrDTO(cliente);
    }

}
