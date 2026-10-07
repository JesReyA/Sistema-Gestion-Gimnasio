package com.gimnasio.api.eventos;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "salones_eventos")
public class SalonEvento {

    @ManyToOne
    @JoinColumn(name = "salon_id")
    @NotNull
    private Salon salon;

    @ManyToOne
    @JoinColumn(name = "evento_id")
    @NotNull
    private Evento evento;


}
