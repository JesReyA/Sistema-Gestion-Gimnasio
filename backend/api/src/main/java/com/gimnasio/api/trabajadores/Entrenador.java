package com.gimnasio.api.trabajadores;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "entrenadores")
public class Entrenador {
    //
    //queda pendiente de ver como unir la relacion con Trabajadores
    @OneToOne(mappedBy = "trabajador")
    private Trabajador trabajador;

    @NotNull
    @Lob
    @Column(name = "certificaciones", columnDefinition = "text")
    private String certificaciones;

    @NotNull
    @Column(name = "especialidad", nullable = false, length = 100)
    private String especialidad;

    public Entrenador() {
    }

    public Trabajador getTrabajador() {
        return trabajador;
    }

    public void setTrabajador(Trabajador trabajador) {
        this.trabajador = trabajador;
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
}
