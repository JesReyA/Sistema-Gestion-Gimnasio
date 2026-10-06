package com.gimnasio.api.suscripciones;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Entity 
@Table (name="planes_suscripcion")
public class PlanSuscripcion {

    public PlanSuscripcion(){

    }

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)  // Auto-increment
    @Column (name="id_plan", nullable=false)
    private Integer idPlan;


    @NotNull
    @Column (name="nombre", nullable=false, length=100, unique=true)
    private String nombre;

    @Lob 
    @Column (columnDefinition ="TEXT")
    private String definicion;

    @NotNull
    @Positive 
    @Column (name="duracion_dias", nullable=false)
    private Integer duracionDias;

    @NotNull
    @PositiveOrZero
    @Column (nullable=false)
    private Integer costo;

    public enum estadoPlan {
        disponible,
        no_disponible
    }

    @NotNull 
    @Column (nullable=false)
    private estadoPlan estado = estadoPlan.disponible;

    @OneToMany (mappedBy="planSuscripcion")
    @JsonManagedReference 
    private List<PlanServicio> planesServicios = new ArrayList<>();

    public Integer getIdPlan() {
        return idPlan;
    }

    public void setIdPlan(Integer idPlan) {
        this.idPlan = idPlan;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDefinicion() {
        return definicion;
    }

    public void setDefinicion(String definicion) {
        this.definicion = definicion;
    }

    public Integer getDuracionDias() {
        return duracionDias;
    }

    public void setDuracionDias(Integer duracionDias) {
        this.duracionDias = duracionDias;
    }

    public Integer getCosto() {
        return costo;
    }

    public void setCosto(Integer costo) {
        this.costo = costo;
    }

    public estadoPlan getEstado() {
        return estado;
    }

    public void setEstado(estadoPlan estado) {
        this.estado = estado;
    }

    public List<PlanServicio> getPlanesServicios() {
        return planesServicios;
    }

    public void setPlanesServicios(List<PlanServicio> planesServicios) {
        this.planesServicios = planesServicios;
    }
  
}
