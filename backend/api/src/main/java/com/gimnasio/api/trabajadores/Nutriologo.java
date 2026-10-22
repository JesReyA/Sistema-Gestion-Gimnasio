package com.gimnasio.api.trabajadores;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.nutricion.PlanAlimentacion;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name ="nutriologos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Nutriologo {
    //id trabajador

    @Id
    @EqualsAndHashCode.Include
    @Column(name = "trabajador_id")
    private Integer trabajadorId;

    @OneToOne
    @MapsId
    @JoinColumn (name = "trabajador_id")
    @JsonBackReference("trabajador-nutriologo")
    private Trabajador trabajador;

    //mapeada
    @OneToMany(mappedBy = "nutriologo")
    @JsonManagedReference("nutriologo-planAlimentacion")
    private List<PlanAlimentacion> planAlimentacion = new ArrayList<>();

    @NotNull
    @Column(name = "cedula_profesional", length = 50, unique = true, nullable = false)
    private String cedulaProfesional;

    @NotNull
    @Column(name = "especialidad", length = 100)
    private String especialidad;

}


