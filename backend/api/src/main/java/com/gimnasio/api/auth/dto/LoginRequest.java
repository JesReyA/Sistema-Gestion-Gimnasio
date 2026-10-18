package com.gimnasio.api.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
    @NotBlank (message = "El correo es obligatorio")
    @Size(max=150)
    String email,

    @NotBlank (message = "La contraseña es obligatoria")
    @Size(max=64)
    String password
) {

    @Override
    public String toString() {
        return "LoginRequest [email=" + email +"]";
    }
    
}
