package com.gimnasio.api.trabajadores;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "entrenadores")
public class Entrenador {
    //
    //queda pendiente de ver como unir la relacion con Trabajadores

    @Id
    @Column(name = "trabajador_id")
    private Integer trabajadorId;

    //completo
    @OneToOne
    @MapsId
    @JoinColumn (name = "trabajador_id")
    @JsonBackReference("trabajador-entrenador")
    private Trabajador trabajador;

    @Lob
    @Column(name = "certificaciones", columnDefinition = "text")
    private String certificaciones;

    @NotNull
    @Column(name = "especialidad", nullable = false, length = 100)
    private String especialidad;

    public Entrenador() {
    }

    public Entrenador(Integer trabajadorId, String especialidad, String certificaciones, Trabajador trabajador) {
        this.trabajadorId = trabajadorId;
        this.especialidad = especialidad;
        this.certificaciones = certificaciones;
        this.trabajador = trabajador;
    }

    public Integer getTrabajadorId() {
        return trabajadorId;
    }

    public void setTrabajadorId(Integer trabajadorId) {
        this.trabajadorId = trabajadorId;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public String getCertificaciones() {
        return certificaciones;
    }

    public void setCertificaciones(String certificaciones) {
        this.certificaciones = certificaciones;
    }

    public Trabajador getTrabajador() {
        return trabajador;
    }

    public void setTrabajador(Trabajador trabajador) {
        this.trabajador = trabajador;
    }
}
