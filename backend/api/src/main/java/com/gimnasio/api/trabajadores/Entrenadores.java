package com.gimnasio.api.trabajadores;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "entrenadores")
public class Entrenadores {


    //queda pendiente de ver como unir la relacion con Trabajadores
    @OneToOne(mappedBy = "idTrabajador")
    Integer trabajadorId;

    @Column(name = "certificaciones")
    String certificaciones;

    @NotNull
    @Column(name = "especialidad", nullable = false, length = 100)
    String especialidad;

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
}
