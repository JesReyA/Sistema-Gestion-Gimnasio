package com.gimnasio.api.asistencias;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clientes.Cliente;
import com.gimnasio.api.clientes.Invitado;
import com.gimnasio.api.sucursales.Sucursal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;



@Entity 
@Table (name="asistencias")
public class Asistencia {

    public Asistencia (){
    }

    @Id 
    @Column(name="id_asistencia", nullable=false)
    @GeneratedValue (strategy= GenerationType.IDENTITY)
    private Integer idAsistencia;
    

    @NotNull 
    @ManyToOne
    @JoinColumn (name="sucursal_id")
    @JsonBackReference 
    private Sucursal sucursal;

    @NotNull 
    @ManyToOne
    @JoinColumn (name="cliente_id")
    @JsonBackReference 
    private Cliente cliente;

    @NotNull 
    @ManyToOne
    @JoinColumn (name="invitado_id")
    @JsonBackReference 
    private Invitado invitado;


    @NotNull 
    @Column (nullable=false)
    private LocalDate fecha;

    @NotNull 
    @Column (name="hora_entrada", nullable=false)
    private LocalTime horaEntrada;

    @Size (max=32)
    @Column (name="codigo_entrada", length=32)
    private String codigoEntrada;

    
    public Integer getIdAsistencia() {
        return idAsistencia;
    }

    public void setIdAsistencia(Integer idAsistencia) {
        this.idAsistencia = idAsistencia;
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Invitado getInvitado() {
        return invitado;
    }

    public void setInvitado(Invitado invitado) {
        this.invitado = invitado;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public LocalTime getHoraEntrada() {
        return horaEntrada;
    }

    public void setHoraEntrada(LocalTime horaEntrada) {
        this.horaEntrada = horaEntrada;
    }

    public String getCodigoEntrada() {
        return codigoEntrada;
    }

    public void setCodigoEntrada(String codigoEntrada) {
        this.codigoEntrada = codigoEntrada;
    }

    
    
    
}
