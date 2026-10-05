package com.gimnasio.api.clientes.dto;
import com.gimnasio.api.clientes.Cliente;

public record AccesoQrDTO(
    String nombreUsuario, 
    String codigoAccesoQr
) {
    public AccesoQrDTO(Cliente cliente) {
        this(cliente.getNombres(), cliente.getCodigoAcceso());
    }
}
