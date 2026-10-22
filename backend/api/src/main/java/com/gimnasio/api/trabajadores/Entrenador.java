package com.gimnasio.api.trabajadores;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "entrenadores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Entrenador {
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "trabajador_id")
    private Integer trabajadorId;

    //mapeado
    @OneToOne
    @MapsId
    @JoinColumn (name = "trabajador_id")
    @JsonBackReference("trabajador-entrenador")
    private Trabajador trabajador;

    //mapeado
    @OneToMany(mappedBy = "entrenador")
    @JsonManagedReference("entrenador-entrenadorClase")
    private List<EntrenadorClase> entrenadorClase = new ArrayList<>();

    @Lob
    @Column(name = "certificaciones", columnDefinition = "text")
    private String certificaciones;

    @NotNull
    @Column(name = "especialidad", nullable = false, length = 100)
    private String especialidad;

}
