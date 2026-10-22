package com.gimnasio.api.accesorios;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.rutinas.Ejercicio;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "accesorios_ejercicios")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class AccesorioEjercicio {
    @EmbeddedId
    @EqualsAndHashCode.Include
    private AccesorioEjercicioId id = new AccesorioEjercicioId();

    @ManyToOne
    @JoinColumn(name = "accesorio_id", nullable = false)
    @MapsId("accesorio")
    @JsonBackReference("accesorio-accesorioEjercicio")
    private Accesorio accesorio;

    @ManyToOne
    @JoinColumn(name = "ejercicio_id", nullable = false)
    @MapsId("ejercicio")
    @JsonBackReference("ejercicio-accesorioEjercicio")
    private Ejercicio ejercicio;
}
