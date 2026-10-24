package com.gimnasio.api.rutinas;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "rutinas_ejercicios")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RutinaEjercicio {

    @EmbeddedId
    @EqualsAndHashCode.Include
    private RutinaEjercicioId id = new RutinaEjercicioId();

    //mapeada
    @ManyToOne
    @MapsId("rutina")
    @JoinColumn(name = "rutina_id")
    @JsonBackReference("rutina-rutinaEjercicio")
    private Rutina rutina;

    //ejercicioId
    @ManyToOne
    @MapsId("ejercicio")
    @JoinColumn(name = "ejercicio_id")
    @JsonBackReference("ejercicio-rutinaEjercicio")
    private Ejercicio ejercicio;

    @NotNull
    @Size(min = 1)
    @Column(name = "orden")
    private Integer orden;

    @NotNull
    @Size(min = 1)
    @Column(name = "series")
    private Integer series;

    @NotNull
    @Size(min = 1)
    @Column(name = "repeticiones")
    private Integer repeticiones;

}
