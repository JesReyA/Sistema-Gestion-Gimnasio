package com.gimnasio.api.suscripciones.feature.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.gimnasio.api.common.enums.EstadoSuscripcion;
import com.gimnasio.api.suscripciones.persistance.PlanSuscripcion;

import java.time.LocalDate;


@JsonInclude(JsonInclude.Include.NON_NULL)
public record SuscripcionResume (LocalDate fechaCreacion,
                                 LocalDate fechaFinalizacion,
                                 PlanSuscripcion tipoSuscripcion,
                                 EstadoSuscripcion estadoSuscripcion
                                ) {
    @Override
    public String toString() {
        return "SuscripcionResume{" +
                "tiempoCreacion=" + fechaCreacion +
                ", tipoSuscripcion=" + tipoSuscripcion +
                ", estadoSuscripcion=" + estadoSuscripcion +
                ", fechaFinalizacion=" + fechaFinalizacion +
                '}';
    }

}
