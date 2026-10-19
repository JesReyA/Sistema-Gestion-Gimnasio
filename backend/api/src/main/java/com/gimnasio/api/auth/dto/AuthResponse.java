package com.gimnasio.api.auth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

// Si un campo es nulo, no lo incluye en el JSON, esto cuida el token de que el campo salga vacío, 
// al llamar este DTO siempre se debe pasar con null en el parámetro del refreshToken (para web) 
// ya que se manejará con cookies. Por eso solo aplica al refreshToken

@JsonInclude (JsonInclude.Include.NON_NULL)
public record AuthResponse(
    String accessToken, 
    String tipoToken,
    long expiraEn,
    ResumenUsuario usuario,

    @JsonInclude (JsonInclude.Include.NON_NULL)
    String refreshToken
) {
    @Override
    public String toString() {
        return "AuthResponse[usuario=" + usuario + "]";
    }
}
