package com.gimnasio.api.trabajadores;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EntrenadorClaseId {

    @Column(name = "entrenador_id")
    private Integer entrenador;

    @Column(name = "clase_id")
    private Integer clase;
}
