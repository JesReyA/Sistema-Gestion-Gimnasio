package com.gimnasio.api.sucursales;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "entidades_federativas")
public class EntidadFederativa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="id_entidad")
    private Integer idEntidad;

    @NotNull
    @Column(name = "nombre", length = 50)
    private String nombre;

    public EntidadFederativa() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getIdEntidad() {
        return idEntidad;
    }

    public void setIdEntidad(Integer idEntidad) {
        this.idEntidad = idEntidad;
    }
}
