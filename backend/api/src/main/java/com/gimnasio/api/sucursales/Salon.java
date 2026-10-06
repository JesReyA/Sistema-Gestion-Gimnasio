package com.gimnasio.api.sucursales;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity 
@Table (name="salon")
public class Salon {
    public Salon (){

    }

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name="id_salon", nullable= false)
    private Integer idSalon;

    @ManyToOne 
    @NotNull 
    @JoinColumn (name="sucursal_id", nullable=false)
    @JsonBackReference 
    private Sucursal sucursal;

    @NotNull 
    @Size (max= 50)
    @Column (name="numero_salon", nullable = false, length=50)
    private String numeroSalon;

    @NotNull 
    @Positive 
    @Column (nullable=false)
    private Integer capacidad;

    //Falta indexar sucursal_id con numoer_salon para que su conjunto sea unico

    public Integer getIdSalon() {
        return idSalon;
    }

    public void setIdSalon(Integer idSalon) {
        this.idSalon = idSalon;
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    public String getNumeroSalon() {
        return numeroSalon;
    }

    public void setNumeroSalon(String numeroSalon) {
        this.numeroSalon = numeroSalon;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    
}
