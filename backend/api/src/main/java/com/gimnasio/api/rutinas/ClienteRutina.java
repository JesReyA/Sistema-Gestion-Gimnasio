package com.gimnasio.api.rutinas;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clientes.Cliente;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "clientes_rutinas")
public class ClienteRutina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente_rutina")
    private Integer idClienteRutina;

    //mapeada
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonBackReference("cliente-clienteRutina")
    private Cliente cliente;

    //rutina id

    @Column(name = "fecha_asignacion", nullable = false)
    private LocalDateTime fechaAsignacion;

    @Column(name = "fecha_fin")
    private LocalDateTime fechaFin;

    public ClienteRutina() {
    }

    public ClienteRutina(Integer idClienteRutina, LocalDateTime fechaFin, LocalDateTime fechaAsignacion, Cliente cliente) {
        this.idClienteRutina = idClienteRutina;
        this.fechaFin = fechaFin;
        this.fechaAsignacion = fechaAsignacion;
        this.cliente = cliente;
    }

    public Integer getIdClienteRutina() {
        return idClienteRutina;
    }

    public void setIdClienteRutina(Integer idClienteRutina) {
        this.idClienteRutina = idClienteRutina;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public LocalDateTime getFechaAsignacion() {
        return fechaAsignacion;
    }

    public void setFechaAsignacion(LocalDateTime fechaAsignacion) {
        this.fechaAsignacion = fechaAsignacion;
    }
}

