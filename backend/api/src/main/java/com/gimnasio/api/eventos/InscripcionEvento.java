package com.gimnasio.api.eventos;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clientes.Cliente;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "incripciones_eventos")
public class InscripcionEvento {

    @EmbeddedId
    private InscripcionEventoId id = new InscripcionEventoId();

    @ManyToOne
    @MapsId("cliente")
    @JoinColumn(name = "cliente_id", nullable = false)
    @JsonBackReference("cliente-inscripcionEvento")
    private Cliente cliente;

    @ManyToOne
    @MapsId("evento")
    @JoinColumn(name = "evento_id", nullable = false)
    @JsonBackReference("evento-inscripcionEvento")
    private Evento evento;

    @NotNull
    @Column(name = "fecha_inscripcion")
    private LocalDateTime fechaInscripcion;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private InscripcionEstado estadoInscripcion =InscripcionEstado.inscrito;

    enum InscripcionEstado{
        inscrito,
        cancelado
    }

    public InscripcionEvento(Cliente cliente, InscripcionEstado estadoInscripcion, LocalDateTime fechaInscripcion, Evento evento) {
        this.cliente = cliente;
        this.estadoInscripcion = estadoInscripcion;
        this.fechaInscripcion = fechaInscripcion;
        this.evento = evento;
    }

    public InscripcionEvento() {
    }

    public InscripcionEventoId getId() {
        return id;
    }

    public void setId(InscripcionEventoId id) {
        this.id = id;
    }

    public LocalDateTime getFechaInscripcion() {
        return fechaInscripcion;
    }

    public void setFechaInscripcion(LocalDateTime fechaInscripcion) {
        this.fechaInscripcion = fechaInscripcion;
    }

    public InscripcionEstado getEstadoInscripcion() {
        return estadoInscripcion;
    }

    public void setEstadoInscripcion(InscripcionEstado estadoInscripcion) {
        this.estadoInscripcion = estadoInscripcion;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
