package com.gimnasio.api.trabajadores;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name ="nutriologos")
public class Nutriologo {

    //id trabajador

    @NotNull
    @Column(name = "cedula_profesional", length = 50)
    private String cedulaProfesional;

    @NotNull
    @Column(name = "especialidad", length = 100)
    private String especialidad;

    public Nutriologo() {
    }

    public String getCedulaProfesional() {
        return cedulaProfesional;
    }

    public void setCedulaProfesional(String cedulaProfesional) {
        this.cedulaProfesional = cedulaProfesional;
    }

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }
}


