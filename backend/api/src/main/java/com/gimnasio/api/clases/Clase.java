package com.gimnasio.api.clases;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity 
@Table (name="clase")
public class Clase {
    public Clase (){

    }

    @Id 
    @GeneratedValue (strategy= GenerationType.IDENTITY)
    @Column (name="id_clase", nullable=false)
    private Integer idClase;

    @NotNull 
    @NotBlank 
    @Size (max=100)
    @Column(nullable=false, length=100)
    private String nombre;

    @NotNull 
    @NotBlank 
    @Size (max=100)
    @Column(nullable=false, length=100)
    private String tematica;

    @NotNull 
    @Positive
    @Column(nullable=false)
    private Integer aforo;

    public Integer getIdClase() {
        return idClase;
    }

    public void setIdClase(Integer idClase) {
        this.idClase = idClase;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTematica() {
        return tematica;
    }

    public void setTematica(String tematica) {
        this.tematica = tematica;
    }

    public Integer getAforo() {
        return aforo;
    }

    public void setAforo(Integer aforo) {
        this.aforo = aforo;
    }

    
}
