package com.gimnasio.api.sucursales;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.clases.SesionClase;

import com.gimnasio.api.eventos.SalonEvento;
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

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name="id_salon", nullable= false)
    private Integer idSalon;

    @OneToMany(mappedBy = "salon")
    @JsonManagedReference("salon-salonEvento")
    private List<SalonEvento> salonEvento = new ArrayList<>();

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
    @JsonManagedReference ("salon-sesionClase")
    private List<SesionClase> sesionesClase = new ArrayList<>();

    public Salon() {
    }

    public Salon(Integer idSalon, Integer capacidad, List<SesionClase> sesionesClase, String numeroSalon, Sucursal sucursal, List<SalonEvento> salonEvento) {
        this.idSalon = idSalon;
        this.capacidad = capacidad;
        this.sesionesClase = sesionesClase;
        this.numeroSalon = numeroSalon;
        this.sucursal = sucursal;
        this.salonEvento = salonEvento;
    }

    public Integer getIdSalon() {
        return idSalon;
    }

    public void setIdSalon(Integer idSalon) {
        this.idSalon = idSalon;
    }

    public List<SesionClase> getSesionesClase() {
        return sesionesClase;
    }

    public void setSesionesClase(List<SesionClase> sesionesClase) {
        this.sesionesClase = sesionesClase;
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    public List<SalonEvento> getSalonEvento() {
        return salonEvento;
    }

    public void setSalonEvento(List<SalonEvento> salonEvento) {
        this.salonEvento = salonEvento;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public String getNumeroSalon() {
        return numeroSalon;
    }

    public void setNumeroSalon(String numeroSalon) {
        this.numeroSalon = numeroSalon;
    }
}
