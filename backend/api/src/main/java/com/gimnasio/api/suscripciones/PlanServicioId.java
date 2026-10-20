package com.gimnasio.api.suscripciones;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlanServicioId implements Serializable {

    @Column(name = "plan_id", nullable = false)
    private Integer planSuscripcion;

    @Column(name = "servicio_id", nullable = false)
    private Integer servicio;
}
