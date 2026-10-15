package com.gimnasio.api.eventos;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clientes.Cliente;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "incripciones_eventos")
public class InscripcionEvento {

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    @JsonBackReference("cliente-inscripcionEvento")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "evento_id", nullable = false)
    @JsonBackReference("evento-inscripcionEvento")
    private Evento evento;


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

    public InscripcionEvento(Cliente cliente, InscripcionEstado estadoInscripcion, LocalDate fechaInscripcion, Evento evento) {
        this.cliente = cliente;
        this.estadoInscripcion = estadoInscripcion;
        this.fechaInscripcion = fechaInscripcion;
        this.evento = evento;
    }

    public InscripcionEvento() {
    }

    public LocalDate getFechaInscripcion() {
        return fechaInscripcion;
    }

    public void setFechaInscripcion(LocalDate fechaInscripcion) {
        this.fechaInscripcion = fechaInscripcion;
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

    public InscripcionEstado getEstadoInscripcion() {
        return estadoInscripcion;
    }

    public void setEstadoInscripcion(InscripcionEstado estadoInscripcion) {
        this.estadoInscripcion = estadoInscripcion;
    }
}
