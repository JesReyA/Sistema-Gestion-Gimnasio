package com.gimnasio.api.accesorios;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccesorioEjercicioId implements Serializable {
    @Column(name = "accesorio_id")
    private Integer accesorio;

    @Column(name = "ejercicio_id")
    private Integer ejercicio;
}
