package com.gimnasio.api.auth.dto;

public record AuthResponse(
    String accessToken, 
    String tipoToken, 
    String refreshToken, 
    long expiraEn,
    ResumenUsuario usuario
) {
    @Override
    public String toString() {
        return "AuthResponse[usuario=" + usuario + "]";
    }

    // Agregar método de fábrica Bearer
}
