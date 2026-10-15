package com.gimnasio.api.auth;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.bitacora.Bitacora;
import com.gimnasio.api.clientes.Cliente;
import com.gimnasio.api.trabajadores.Trabajador;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "cuentas")
public class Cuenta {
    
    @Id 
    @Column(name = "id_cuenta", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment
    private Integer idCuenta;

    @JsonManagedReference
    @OneToMany(mappedBy = "cuenta")
    private List<Bitacora> bitacora = new ArrayList<>();

    @OneToOne 
    @JoinColumn (name ="cliente_id", nullable = true)
    @JsonBackReference("cliente-trabajador")
    private Cliente cliente;

    @OneToOne 
    @JoinColumn (name ="trabajador_id", unique = true)
    @JsonBackReference("trabajador-cuenta")
    private Trabajador trabajador;

    @NotNull 
    @NotBlank 
    @Column (name="correo_electronico", nullable=false, length = 150, unique = true)
    private String correoElectronico;

    @NotNull
    @NotBlank
    @Column (name="contrasena_hash", nullable=false, length = 255)
    private String contrasena;


    public enum estadoCuenta{
        activa, 
        inactiva, 
        suspendida,
        pendiente
    }

    @NotNull
    @Column (nullable=false)
    private estadoCuenta estado = estadoCuenta.pendiente;

    public Cuenta(Integer idCuenta, String contrasena, estadoCuenta estado, String correoElectronico, Trabajador trabajador, Cliente cliente, List<Bitacora> bitacora) {
        this.idCuenta = idCuenta;
        this.contrasena = contrasena;
        this.estado = estado;
        this.correoElectronico = correoElectronico;
        this.trabajador = trabajador;
        this.cliente = cliente;
        this.bitacora = bitacora;
    }

    public Cuenta() {
    }

    public Integer getIdCuenta() {
        return idCuenta;
    }

    public void setIdCuenta(Integer idCuenta) {
        this.idCuenta = idCuenta;
    }

    public estadoCuenta getEstado() {
        return estado;
    }

    public void setEstado(estadoCuenta estado) {
        this.estado = estado;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public Trabajador getTrabajador() {
        return trabajador;
    }

    public void setTrabajador(Trabajador trabajador) {
        this.trabajador = trabajador;
    }

    public List<Bitacora> getBitacora() {
        return bitacora;
    }

    public void setBitacora(List<Bitacora> bitacora) {
        this.bitacora = bitacora;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
