package com.gimnasio.api.clases;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.sucursales.Salon;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Entity 
@Table (name="sesiones_clase")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class SesionClase {
    @Id
    @EqualsAndHashCode.Include
    @Column (name="id_sesion", nullable = false)
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer idSesion;

    @NotNull 
    @Column (nullable=false)
    private LocalDate fecha;

    @NotNull 
    @Column (name="hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @NotNull 
    @Column (name="hora_fin", nullable = false)
    private LocalTime horaFin;

    @NotNull 
    @Positive 
    @Column (nullable = false)
    private Integer aforo;

    public enum estadoSesion{
        programada,
        en_curso,
        finalizada,
        cancelada
    }

    @NotNull 
    @Column (nullable = false)
    @Enumerated(EnumType.STRING)
    private estadoSesion estado = estadoSesion.programada;

    //mapeada
    @NotNull 
    @ManyToOne 
    @JoinColumn (name="clase_id")
    @JsonBackReference ("clase-sesionClase")
    private Clase clase;

    //mapeada
    @NotNull 
    @ManyToOne 
    @JoinColumn (name="salon_id")
    @JsonBackReference ("salon-sesionClase")
    private Salon salon;

    //mapeada
    @OneToMany(mappedBy = "sesionClase")
    @JsonManagedReference("inscripcionesClase-sesionesClase")
    private List<InscripcionClase> inscripcionClase = new ArrayList<>();

}