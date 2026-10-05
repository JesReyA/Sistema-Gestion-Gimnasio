package com.gimnasio.api.sucursales;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.trabajadores.Trabajador;

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

@Entity 
@Table (name = "sucursales")
public class Sucursal {    
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)  // Auto-increment
    private Integer id;

    @NotNull 
    @Column (nullable=false, length = 100)
    private String nombre;

    @NotNull 
    @Column (nullable=false, length = 150)
    private String calle;

    @NotNull 
    @Column (name = "codigo_postal", nullable=false, length = 10)
    private String codigoPostal;

    @NotNull 
    @Column (name = "municipio_alcaldia", nullable=false, length = 150)
    private String municipioAlcaldia;

    @NotNull
    @ManyToOne 
    @JsonBackReference 
    @JoinColumn (name="id_estado", nullable=false)
    private EntidadFederativa estado_id;

    @Column (nullable=false, length = 100)
    private String pais;

    @NotNull 
    @Column (nullable=false, length = 100)
    private String horario;

    @NotNull 
    @Column (nullable=false, length = 100)
    @Positive 
    private Integer aforo;

    @OneToMany (mappedBy="sucursal_id")
    @JsonManagedReference
    private List<Trabajador> trabajadores = new ArrayList<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public void setCodigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public String getMunicipioAlcaldia() {
        return municipioAlcaldia;
    }

    public void setMunicipioAlcaldia(String municipioAlcaldia) {
        this.municipioAlcaldia = municipioAlcaldia;
    }

    public EntidadFederativa getEstado_id() {
        return estado_id;
    }

    public void setEstado_id(EntidadFederativa estado_id) {
        this.estado_id = estado_id;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public Integer getAforo() {
        return aforo;
    }

    public void setAforo(Integer aforo) {
        this.aforo = aforo;
    }

    public List<Trabajador> getTrabajadores() {
        return trabajadores;
    }

    public void setTrabajadores(List<Trabajador> trabajadores) {
        this.trabajadores = trabajadores;
    }

}
