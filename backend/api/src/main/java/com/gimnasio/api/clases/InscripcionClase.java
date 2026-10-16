package com.gimnasio.api.clases;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clientes.Cliente;
import jakarta.persistence.*;
import java.time.LocalDateTime;

public class InscripcionClase {

    @EmbeddedId
    private InscripcionClaseId id = new InscripcionClaseId();

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    @MapsId("clienteId")
    @JsonBackReference("cliente-inscripcionesClase")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "sesion_clase_id", nullable = false)
    @MapsId("sesionClaseId")
    @JsonBackReference("inscripcionesClase-sesionesClase")
    private SesionClase sesionClase;

    @Column(name = "fecha_inscripcion", nullable = false)
    private LocalDateTime fechaInscripcion;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private estadoInscripcion estadoInscripcion;

    private enum estadoInscripcion{
        inscrito,
        cancelado
    }

    public InscripcionClase() {
    }

    public InscripcionClase(InscripcionClaseId id, Cliente cliente, SesionClase sesionClase, LocalDateTime fechaInscripcion, estadoInscripcion estadoInscripcion) {
        this.id = id;
        this.cliente = cliente;
        this.sesionClase = sesionClase;
        this.fechaInscripcion = fechaInscripcion;
        this.estadoInscripcion = estadoInscripcion;
    }

    public InscripcionClaseId getId() {
        return id;
    }

    public void setId(InscripcionClaseId id) {
        this.id = id;
    }

    public estadoInscripcion getEstadoInscripcion() {
        return estadoInscripcion;
    }

    public void setEstadoInscripcion(estadoInscripcion estadoInscripcion) {
        this.estadoInscripcion = estadoInscripcion;
    }

    public LocalDateTime getFechaInscripcion() {
        return fechaInscripcion;
    }

    public void setFechaInscripcion(LocalDateTime fechaInscripcion) {
        this.fechaInscripcion = fechaInscripcion;
    }

    public SesionClase getSesionClase() {
        return sesionClase;
    }

    public void setSesionClase(SesionClase sesionClase) {
        this.sesionClase = sesionClase;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}


