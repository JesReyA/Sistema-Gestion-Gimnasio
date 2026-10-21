package com.gimnasio.api.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gimnasio.api.auth.Cuenta;
import com.gimnasio.api.auth.CuentaRepository;

import org.springframework.transaction.annotation.Transactional;

@Service 
public class CustomUserDetailsService implements UserDetailsService{

    // Instancia del repository de cuenta
    private final CuentaRepository cuentaRepository;

    // Constructor que para el repositorio, en vez de usar Autowired
    CustomUserDetailsService(CuentaRepository cuentaRepository) {
        this.cuentaRepository = cuentaRepository;
    }

    @Override
    // Indica que el servicio solo realiza consultas, no hace actualizaciones
    @Transactional(readOnly= true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // Busca la cuenta, sino existe, lanza una excepción
        Cuenta cuenta = cuentaRepository.findByCorreoElectronico(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Se crea una lista de roles
        List<String> listaRoles = new ArrayList<>();

        // Si existe el cliente, se agrega el rol a la lista de roles de la cuenta
        if(cuenta.getCliente() != null ){
            listaRoles.add("ROLE_CLIENTE");
        }

        // Si existe el trabajador, se agrega el rol a la lista de roles de la cuenta
        if(cuenta.getTrabajador() != null){
        //  Se usa .name para obtener el String directamente del enum
            listaRoles.add("ROLE_" + cuenta.getTrabajador().getRol().name().toUpperCase());
        }

        if (listaRoles.isEmpty()){
            throw new IllegalStateException("No se encontraron permisos");
        }

        return new CuentaUserDetails(cuenta.getIdCuenta(), cuenta.getCorreoElectronico(), cuenta.getContrasena(), cuenta.getEstado(), listaRoles);
    }
}
