package com.gimnasio.api.clientes;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "mediciones_peso")
public class MedicionPeso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_medicion")
    private Integer idMedicion;

    // cliente id

    @ManyToOne
    @JsonBackReference("cliente-medicionPeso")
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @NotNull
    @Column(name = "fecha")
    private LocalDate fecha;

    @NotNull
    @Column(name = "peso_kg", precision = 7, scale = 2)
    private BigDecimal pesoKg;

    public MedicionPeso() {
    }

    public MedicionPeso(Integer idMedicion, BigDecimal pesoKg, Cliente cliente, LocalDate fecha) {
        this.idMedicion = idMedicion;
        this.pesoKg = pesoKg;
        this.cliente = cliente;
        this.fecha = fecha;
    }

    public Integer getIdMedicion() {
        return idMedicion;
    }

    public void setIdMedicion(Integer idMedicion) {
        this.idMedicion = idMedicion;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public BigDecimal getPesoKg() {
        return pesoKg;
    }

    public void setPesoKg(BigDecimal pesoKg) {
        this.pesoKg = pesoKg;
    }
}
