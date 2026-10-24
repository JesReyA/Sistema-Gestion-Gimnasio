package com.gimnasio.api.suscripciones.feature.model;


//crea nueva suscripcion
public class SuscripcionRequest {
    private String correoCliente;
    private String nombrePlanSuscripcion;

    public String getCorreoCliente() {
        return correoCliente;
    }

    public void setCorreoCliente(String correoCliente) {
        this.correoCliente = correoCliente;
    }

    public String getNombrePlanSuscripcion() {
        return nombrePlanSuscripcion;
    }

    public void setNombrePlanSuscripcion(String nombrePlanSuscripcion) {
        this.nombrePlanSuscripcion = nombrePlanSuscripcion;
    }
}
