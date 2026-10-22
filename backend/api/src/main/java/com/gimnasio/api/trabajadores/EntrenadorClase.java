package com.gimnasio.api.trabajadores;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clases.Clase;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "entrenadores_clase")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class EntrenadorClase {
    @EmbeddedId
    private EntrenadorClaseId id = new EntrenadorClaseId();

    @ManyToOne
    @JoinColumn(name = "entrenador_id")
    @MapsId("entrenador")
    @JsonBackReference("entrenador-entrenadorClase")
    private Entrenador entrenador;

    @ManyToOne
    @JoinColumn(name = "clase_id")
    @MapsId("clase")
    @JsonBackReference("clase-entrenadorClase")
    private Clase clase;

}
