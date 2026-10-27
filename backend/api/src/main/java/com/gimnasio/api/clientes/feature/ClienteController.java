package com.gimnasio.api.clientes.feature;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gimnasio.api.clientes.dto.AccesoQrDTO;
import com.gimnasio.api.security.CuentaUserDetails;

@RestController 
@RequestMapping ("/api/clientes")
public class ClienteController {

    private ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("/qr")
    @PreAuthorize ("hasRole('CLIENTE')")
    public AccesoQrDTO qr(@AuthenticationPrincipal CuentaUserDetails usuario){
        return clienteService.obtenerCodigoQR(usuario.getUsername());
    }


}
