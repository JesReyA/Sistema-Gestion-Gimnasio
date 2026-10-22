package com.gimnasio.api.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

// Datos necesarios para completar el registro de un usuario
public record RegistroRequest (
    @NotBlank(message="El nombre es obligatorio") 
    @Size(max=100)
    String nombres,
    
    @NotBlank (message = "El primer apellido es obligatorio")
    @Size(max=100)
    String apellidoPaterno,

    @Size(max=100)
    String apellidoMaterno, 

    @NotBlank(message="El correo es obligatorio")
    @Email(message = "El correo no es válido")
    @Size(max=150) 
    String email, 

    @NotBlank (message = "La contraseña es obligatoria")
    @Size(min=8, max=32, message = "La contraseña debe tener entre 8 y 32 caracteres")
    @Pattern(
        regexp = "^(?=.*[A-Za-z])(?=.*\\d).+$",
        message = "La contraseña debe incluir al menos una letra y un número"
    )
    String password
) {

    @Override
    public String toString() {
        return "RegistroRequest [email=" + email + "]";
    }
    
}
