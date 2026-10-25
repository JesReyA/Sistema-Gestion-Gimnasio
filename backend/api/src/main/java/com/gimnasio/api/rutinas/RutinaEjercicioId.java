package com.gimnasio.api.rutinas;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RutinaEjercicioId implements Serializable {

    @Column(name = "rutina_id")
    private Integer rutina;

    @Column(name = "ejercicio_id")
    private Integer ejercicio;
}
