package com.gimnasio.api.clases;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.sucursales.Salon;

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

@Entity 
@Table (name="sesiones_clase")
public class SesionClase {

    public SesionClase(){
    }

    @Id 
    @Column (name="id_sesion", nullable = false)
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer idSesion;

    @NotNull 
    @Column (nullable=false)
    private LocalDate fecha;

    @NotNull 
    @Column (name="hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @NotNull 
    @Column (name="hora_fin", nullable = false)
    private LocalTime horaFin;

    @NotNull 
    @Positive 
    @Column (nullable = false)
    private Integer aforo;

    public enum estadoSesion{
        programada,
        en_curso,
        finalizada,
        cancelada
    }

    @NotNull 
    @Column (nullable = false)
    private estadoSesion estado = estadoSesion.programada;


    @NotNull 
    @ManyToOne 
    @JoinColumn (name="clase_id")
    @JsonBackReference 
    private Clase clase;

    @NotNull 
    @ManyToOne 
    @JoinColumn (name="salon_id")
    @JsonBackReference 
    private Salon salon;

    public Integer getIdSesion() {
        return idSesion;
    }

    public void setIdSesion(Integer idSesion) {
        this.idSesion = idSesion;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalTime getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(LocalTime horaFin) {
        this.horaFin = horaFin;
    }

    public Integer getAforo() {
        return aforo;
    }

    public void setAforo(Integer aforo) {
        this.aforo = aforo;
    }

    public estadoSesion getEstado() {
        return estado;
    }

    public void setEstado(estadoSesion estado) {
        this.estado = estado;
    }

    public Clase getClase() {
        return clase;
    }

    public void setClase(Clase clase) {
        this.clase = clase;
    }

    public Salon getSalon() {
        return salon;
    }

    public void setSalon(Salon salon) {
        this.salon = salon;
    }

    

    
}
