package com.gimnasio.api.auth.dto;

import java.util.List;

// Datos del usuario sin datos sensibles
public record ResumenUsuario(
    String nombres, 
    String apellidoPaterno, 
    String apellidoMaterno,
    String email,
    List<String> roles
) {
    //Solo se muestran los roles, sin datos extras
    @Override
    public String toString() {
        return "ResumenUsuario [roles" + roles + "]";
    }
    
} 
