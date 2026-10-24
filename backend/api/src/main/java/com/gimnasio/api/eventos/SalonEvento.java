package com.gimnasio.api.eventos;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.sucursales.Salon;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "salones_eventos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class SalonEvento {

    @EmbeddedId
    @EqualsAndHashCode.Include
    private SalonEventoId id = new SalonEventoId();

    @ManyToOne
    @JoinColumn(name = "salon_id")
    @MapsId("salon")
    @JsonBackReference ("salon-salonEvento")
    @NotNull
    private Salon salon;

    @ManyToOne
    @JsonBackReference("evento-salonEvento")
    @MapsId("evento")
    @JoinColumn(name = "evento_id")
    @NotNull
    private Evento evento;

}
