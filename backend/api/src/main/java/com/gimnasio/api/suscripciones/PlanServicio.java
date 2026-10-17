package com.gimnasio.api.suscripciones;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity 
@Table (name="planes_servicios")
public class PlanServicio {
    public PlanServicio(){
    }

    @EmbeddedId 
    private PlanServicioId idPlanServicio = new PlanServicioId();

    @ManyToOne 
    @JsonBackReference 
    @JoinColumn (name="plan_id")
    @MapsId ("planId")
    private PlanSuscripcion planSuscripcion;

    @ManyToOne
    @JsonBackReference 
    @JoinColumn (name="servicio_id")
    @MapsId ("servicioId")
    private Servicio servicio;

    //Falta indexar ambos FK como un sólo PK

    public PlanSuscripcion getPlanSuscripcion() {
        return planSuscripcion;
    }

    public void setPlanSuscripcion(PlanSuscripcion planSuscripcion) {
        this.planSuscripcion = planSuscripcion;
    }

    public Servicio getServicio() {
        return servicio;
    }

    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }

    public PlanServicioId getIdPlanServicio() {
        return idPlanServicio;
    }

    public void setIdPlanServicio(PlanServicioId idPlanServicio) {
        this.idPlanServicio = idPlanServicio;
    }

    
}
