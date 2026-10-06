package com.gimnasio.api.sucursales;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.clases.SesionClase;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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


    @OneToMany (mappedBy = "salon")
    @JsonManagedReference 
    private List<SesionClase> sesionesClase = new ArrayList<>();

    
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

    public List<SesionClase> getSesionesClase() {
        return sesionesClase;
    }

    public void setSesionesClase(List<SesionClase> sesionesClase) {
        this.sesionesClase = sesionesClase;
    }

    
}
