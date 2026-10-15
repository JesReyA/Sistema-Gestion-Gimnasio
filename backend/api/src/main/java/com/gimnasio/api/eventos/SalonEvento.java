package com.gimnasio.api.eventos;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.sucursales.Salon;
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
    @JsonBackReference ("salon-salonEvento")
    @NotNull
    private Salon salon;

    @ManyToOne
    @JsonBackReference("evento-salonEvento")
    @JoinColumn(name = "evento_id")
    @NotNull
    private Evento evento;

    public SalonEvento(Salon salon, Evento evento) {
        this.salon = salon;
        this.evento = evento;
    }

    public Salon getSalon() {
        return salon;
    }

    public void setSalon(Salon salon) {
        this.salon = salon;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }
}
