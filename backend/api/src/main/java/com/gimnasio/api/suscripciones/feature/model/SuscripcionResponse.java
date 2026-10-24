package com.gimnasio.api.suscripciones.feature.model;

import com.gimnasio.api.clientes.Cliente;
import com.gimnasio.api.common.enums.EstadoSuscripcion;
import com.gimnasio.api.suscripciones.persistance.PlanSuscripcion;

import java.util.Date;

//obtiene datos de suscripcion
public class SuscripcionResponse{
    private Integer clienteId;
    private PlanSuscripcion planSuscripcion;
    private Date fechaInicio;
    private Date fechaFinal;
    private EstadoSuscripcion estadoSuscripcion;
}
