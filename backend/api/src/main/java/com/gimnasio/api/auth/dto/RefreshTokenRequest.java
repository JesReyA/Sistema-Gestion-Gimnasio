package com.gimnasio.api.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RefreshTokenRequest(

    @NotBlank(message = "El refresh token es obligatorio")
    @Size(max = 512)
    String refreshToken

) {
    @Override
    public String toString() {
        return "RefreshTokenRequest[***]";
    }
}