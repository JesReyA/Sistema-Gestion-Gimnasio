package com.gimnasio.api.eventos;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "incripciones_eventos")
public class InscripcionesEvento {

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "evento_id")
    private  Eventos evento;


    @NotNull
    @Column(name = "fecha_inscripcion")
    private LocalDate fechaInscripcion;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private InscripcionEstado estadoInscripcion =InscripcionEstado.inscrito;

    enum InscripcionEstado{
        inscrito,
        cancelado
    }
}
