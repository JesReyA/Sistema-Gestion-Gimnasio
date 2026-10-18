package com.gimnasio.api.auth.dto;

import java.util.List;

public record ResumenUsuario(
    String nombres, 
    String apellidoPaterno, 
    String apellidoMaterno,
    String email,
    List<String> roles
) {
} 
