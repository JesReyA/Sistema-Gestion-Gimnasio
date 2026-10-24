package com.gimnasio.api.suscripciones.persistance;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity 
@Table (name="planes_servicios")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PlanServicio {

    @EqualsAndHashCode.Include
    @EmbeddedId
    private PlanServicioId id = new PlanServicioId();

    //mapeada
    @ManyToOne 
    @JsonBackReference("planSuscripcion-planServicio")
    @MapsId("planSuscripcion")
    @JoinColumn (name="plan_id")
    private PlanSuscripcion planSuscripcion;

    //mapeada
    @ManyToOne
    @JsonBackReference("servicio-planServicio")
    @MapsId("servicio")
    @JoinColumn (name="servicio_id")
    private Servicio servicio;

}
