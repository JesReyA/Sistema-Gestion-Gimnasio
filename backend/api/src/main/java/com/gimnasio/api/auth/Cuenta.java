package com.gimnasio.api.auth;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clientes.Cliente;
import com.gimnasio.api.trabajadores.Trabajador;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity
@Table(name = "cuentas")
public class Cuenta {

    public Cuenta() {
    }
    
    @Id 
    @Column(name = "id_cuenta", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment
    private Integer idCuenta;

    @OneToOne 
    @JoinColumn (name ="cliente_id", nullable = true)
    @JsonBackReference 
    private Cliente cliente;

    @OneToOne 
    @JoinColumn (name ="trabajador_id", nullable = true)
    @JsonBackReference 
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

    public Integer getIdCuenta() {
        return idCuenta;
    }

    public void setIdCuenta(Integer idCuenta) {
        this.idCuenta = idCuenta;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Trabajador getTrabajador() {
        return trabajador;
    }

    public void setTrabajador(Trabajador trabajador) {
        this.trabajador = trabajador;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public estadoCuenta getEstado() {
        return estado;
    }

    public void setEstado(estadoCuenta estado) {
        this.estado = estado;
    }

    

}
