package com.gimnasio.api.rutinas;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.accesorios.AccesorioEjercicio;
import com.gimnasio.api.maquinas.Maquina;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "ejercicios")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Ejercicio {
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ejercicio")
    private Integer idEjercicio;

    //mapeada
    @ManyToOne
    @JoinColumn(name = "maquina_id")
    @JsonBackReference("maquina-ejercicio")
    private Maquina maquina;

    //mapeada
    @OneToMany(mappedBy = "ejercicio")
    @JsonManagedReference("ejercicio-rutinaEjercicio")
    private List<RutinaEjercicio> rutinaEjercicio = new ArrayList<>();

    //mapeada
    @OneToMany(mappedBy = "ejercicio")
    @JsonManagedReference("ejercicio-accesorioEjercicio")
    private List<AccesorioEjercicio> accesorioEjercicio = new ArrayList<>();

    @NotBlank
    @Column(name = "nombre", length = 100)
    private String nombre;

    @NotBlank
    @Column(name = "grupo_muscular", length = 100)
    private String grupoMuscular;

    @Lob
    @Column(name = "explicacion", columnDefinition = "text")
    private String explicacion;
}
