package com.gimnasio.api.suscripciones;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clientes.Cliente;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table (name="suscripciones")
public class Suscripcion {

    public Suscripcion(){

    }

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name ="id_suscripcion", nullable=false)
    private Integer idSuscripcion;

    @ManyToOne 
    @JoinColumn (name="cliente_id", nullable = false)
    @JsonBackReference 
    @NotNull 
    private Cliente cliente;

    @ManyToOne 
    @JoinColumn (name="plan_id", nullable = false)
    @JsonBackReference 
    @NotNull 
    private PlanSuscripcion planSuscripcion;

    @NotNull 
    @Column (name="fecha_inicio", nullable=false)
    private LocalDate fechaInicio;

    @NotNull 
    @Column (name="fecha_fin", nullable=false)
    private LocalDate fechaFin;

    public enum estadoSuscripcion{
        activa, 
        vencida,
        cancelada
    }

    @NotNull 
    @Column (nullable=false)
    private estadoSuscripcion estado = estadoSuscripcion.activa;

    public Integer getIdSuscripcion() {
        return idSuscripcion;
    }

    public void setIdSuscripcion(Integer idSuscripcion) {
        this.idSuscripcion = idSuscripcion;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public PlanSuscripcion getPlanSuscripcion() {
        return planSuscripcion;
    }

    public void setPlanSuscripcion(PlanSuscripcion planSuscripcion) {
        this.planSuscripcion = planSuscripcion;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public estadoSuscripcion getEstado() {
        return estado;
    }

    public void setEstado(estadoSuscripcion estado) {
        this.estado = estado;
    }


    
}
