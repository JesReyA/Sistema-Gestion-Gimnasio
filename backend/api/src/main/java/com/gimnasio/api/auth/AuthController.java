package com.gimnasio.api.auth;

import jakarta.annotation.security.PermitAll;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gimnasio.api.auth.dto.AuthResponse;
import com.gimnasio.api.auth.dto.LoginRequest;
import com.gimnasio.api.auth.dto.RegistroRequest;
import com.gimnasio.api.auth.dto.ResumenUsuario;
import com.gimnasio.api.security.CuentaUserDetails;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController 
@RequestMapping ("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Metodo y endpoint de login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> autenticar (@Valid @RequestBody LoginRequest loginRequest){
        AuthResponse respuesta = authService.login(loginRequest);

        return ResponseEntity.ok(respuesta);
    }
    

    // Metodo y endpoint para registro
    @PostMapping("/registro")
    public ResponseEntity<ResumenUsuario> registro(@Valid @RequestBody RegistroRequest registroRequest){

        ResumenUsuario resumenUsuario = authService.registro(registroRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(resumenUsuario);
        
    }

    // Metodo para obtener datos del usuario y mostrarlos en el perfil
    @GetMapping ("/me")
    public ResumenUsuario me (@AuthenticationPrincipal CuentaUserDetails usuario){
        return authService.obtenerDatosPerfil(usuario);
    }
    
}