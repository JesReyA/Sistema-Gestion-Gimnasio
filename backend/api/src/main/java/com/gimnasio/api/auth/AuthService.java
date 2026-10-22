package com.gimnasio.api.auth;

import com.gimnasio.api.clientes.ClienteRepository;
import com.gimnasio.api.common.enums.EstadoCuenta;
import com.gimnasio.api.security.CuentaUserDetails;
import com.gimnasio.api.security.JwtService;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gimnasio.api.auth.dto.AuthResponse;
import com.gimnasio.api.auth.dto.LoginRequest;
import com.gimnasio.api.auth.dto.RegistroRequest;
import com.gimnasio.api.auth.dto.ResumenUsuario;
import com.gimnasio.api.clientes.Cliente;

import org.springframework.transaction.annotation.Transactional;

@Service 
public class AuthService {
    private final ClienteRepository clienteRepository;
    private final CuentaRepository cuentaRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    

    public AuthService(ClienteRepository clienteRepository, CuentaRepository cuentaRepository,
            PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.clienteRepository = clienteRepository;
        this.cuentaRepository = cuentaRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Transactional 
    public ResumenUsuario registro (RegistroRequest input){

        if(cuentaRepository.existsByCorreoElectronico(input.email())){
            throw new IllegalStateException("Correo ya registrado");
        }

        Cliente cliente = new Cliente();
        cliente.setNombres(input.nombres());
        cliente.setApellidoPaterno(input.apellidoPaterno());
        cliente.setApellidoMaterno(input.apellidoMaterno());
        cliente.setCorreoElectronico(input.email());

        clienteRepository.save(cliente);

        Cuenta cuenta = new Cuenta();
        cuenta.setCorreoElectronico(input.email());
        cuenta.setContrasena(passwordEncoder.encode(input.password()));
        cuenta.setEstado(EstadoCuenta.pendiente);
        cuenta.setCliente(cliente);

        cuentaRepository.save(cuenta);

        return new ResumenUsuario(
            cliente.getNombres(),
            cliente.getApellidoPaterno(), 
            cliente.getApellidoMaterno(), 
            cuenta.getCorreoElectronico(),
            List.of("ROLE_CLIENTE")
        );
        
    }

    private ResumenUsuario armarResumenUsuario (Cuenta cuenta, List<String> roles){
            String nombres;
            String paterno;
            String materno;

            if(cuenta.getCliente() != null){
                nombres = cuenta.getCliente().getNombres();
                paterno = cuenta.getCliente().getApellidoPaterno(); 
                materno = cuenta.getCliente().getApellidoMaterno(); 
            }else if(cuenta.getTrabajador() != null){
                nombres = cuenta.getTrabajador().getNombres();
                paterno = cuenta.getTrabajador().getApellidoPaterno(); 
                materno = cuenta.getTrabajador().getApellidoMaterno(); 
            }else{
                throw new IllegalStateException("La cuenta no pertenece a cliente ni trabajador");
            }

            return new ResumenUsuario(nombres, paterno, materno, cuenta.getCorreoElectronico(), roles);
        }

    @Transactional (readOnly = true)
    public AuthResponse login (LoginRequest input){

        Authentication auth =  authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                input.email(), input.password())
        );

        CuentaUserDetails usuario = (CuentaUserDetails) auth.getPrincipal();
        String token = jwtService.generateToken(usuario);

        Cuenta cuenta = cuentaRepository.findByCorreoElectronico(input.email())
        .orElseThrow(() -> new IllegalStateException("Cuenta no encontrada"));

        List<String> roles = usuario.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).toList();

        ResumenUsuario resumen= armarResumenUsuario(cuenta, roles);

        return new AuthResponse(token, "Bearer", jwtService.getExpirationTime(), resumen , null);
    }

}
