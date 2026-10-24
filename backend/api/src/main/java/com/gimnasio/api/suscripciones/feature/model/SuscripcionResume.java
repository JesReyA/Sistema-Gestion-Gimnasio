package com.gimnasio.api.suscripciones.feature.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.gimnasio.api.common.enums.EstadoSuscripcion;
import com.gimnasio.api.suscripciones.persistance.PlanSuscripcion;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SuscripcionResume (LocalDateTime tiempoCreacion,
                                 PlanSuscripcion tipoSuscripcion,
                                 EstadoSuscripcion estadoSuscripcion,
                                 LocalDateTime fechaFinalizacion) {
    @Override
    public String toString() {
        return "SuscripcionResume{" +
                "tiempoCreacion=" + tiempoCreacion +
                ", tipoSuscripcion=" + tipoSuscripcion +
                ", estadoSuscripcion=" + estadoSuscripcion +
                ", fechaFinalizacion=" + fechaFinalizacion +
                '}';
    }
}
