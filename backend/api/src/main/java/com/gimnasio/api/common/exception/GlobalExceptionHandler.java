package com.gimnasio.api.common.exception;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice 
public class GlobalExceptionHandler {

    // Excepción personalizada para fallos en login
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> credenciales(){
        return ResponseEntity.status(401).body(Map.of("mensaje", "Correo o contraseña incorrectos"));
    }

    // Excepcion 409 para IllegalStateException
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, String>> conflicto (IllegalStateException e){
        return ResponseEntity.status(409).body(Map.of("mensaje", e.getMessage()));

    }
}
