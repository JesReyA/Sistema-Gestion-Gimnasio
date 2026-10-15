package com.gimnasio.api.sucursales;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.asistencias.Asistencia;
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
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity 
@Table (name = "sucursales")
public class Sucursal {    

    public Sucursal() {
    }

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)  // Auto-increment
    @Column (name = "id_sucursal", nullable=false)
    private Integer idSucursal;

    // las relaciones Uno a muchos del lado del no dependiente deben tener OneToMany y mappedBy, y del lado dependiente ManyToOne y JoinColumn
    @NotNull
    @ManyToOne 
    @JsonManagedReference
    @JoinColumn (name="estado_id", nullable=false)
    private EntidadFederativa estado;

    // las relaciones Uno a muchos del lado del no dependiente deben tener OneToMany y mappedBy, y del lado dependiente ManyToOne y JoinColumn
    @NotNull
    @OneToMany (mappedBy="sucursal")
    @JsonManagedReference
    private List<Trabajador> trabajadores = new ArrayList<>();

    @OneToMany (mappedBy="sucursal")
    @JsonManagedReference
    private List<Salon> salones = new ArrayList<>();

    @OneToMany (mappedBy="sucursal")
    @JsonManagedReference
    private List<Asistencia> asistencias = new ArrayList<>();

    @NotNull
    @NotBlank
    @Column (nullable=false, length = 100)
    private String nombre;

    @NotNull
    @NotBlank
    @Column (nullable=false, length = 150)
    private String calle;

    @NotNull
    @NotBlank
    @Column (name = "codigo_postal", nullable=false, length = 10)
    private String codigoPostal;

    @NotNull
    @NotBlank
    @Column (name = "municipio_alcaldia", nullable=false, length = 150)
    private String municipioAlcaldia;

    @Column (nullable=false, length = 100)
    @NotNull
    @NotBlank
    private String pais;

    @NotNull 
    @NotBlank
    @Column (nullable=false, length = 100)
    private String horario;

    @NotNull 
    @Column (nullable=false, length = 100)
    @Positive 
    private Integer aforo;

    public Sucursal(Integer idSucursal, Integer aforo, String horario, String pais, String municipioAlcaldia, String codigoPostal, String calle, String nombre, List<Asistencia> asistencias, List<Salon> salones, List<Trabajador> trabajadores, EntidadFederativa estado) {
        this.idSucursal = idSucursal;
        this.aforo = aforo;
        this.horario = horario;
        this.pais = pais;
        this.municipioAlcaldia = municipioAlcaldia;
        this.codigoPostal = codigoPostal;
        this.calle = calle;
        this.nombre = nombre;
        this.asistencias = asistencias;
        this.salones = salones;
        this.trabajadores = trabajadores;
        this.estado = estado;
    }



    public Integer getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(Integer idSucursal) {
        this.idSucursal = idSucursal;
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

    public EntidadFederativa getEstado() {
        return estado;
    }

    public void setEstado(EntidadFederativa estado) {
        this.estado = estado;
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

    public List<Salon> getSalones() {
        return salones;
    }

    public void setSalones(List<Salon> salones) {
        this.salones = salones;
    }

    public List<Asistencia> getAsistencias() {
        return asistencias;
    }

    public void setAsistencias(List<Asistencia> asistencias) {
        this.asistencias = asistencias;
    }

    
    
}
