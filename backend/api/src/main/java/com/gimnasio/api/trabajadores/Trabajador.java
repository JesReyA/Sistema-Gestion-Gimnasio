package com.gimnasio.api.trabajadores;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.sucursales.Sucursal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "trabajadores")
public class Trabajador {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)  // Auto-increment
    private Integer id;

    @NotNull 
    @Column (nullable=false, length = 100)
    private String nombres;

    @NotNull 
    @Column (name = "apellido_paterno", nullable=false, length = 100)
    private String apellidoPaterno;

    @NotNull    
    @Column (name = "apellido_materno", length = 100)
    private String apellidoMaterno;

    @NotNull 
    @Column (nullable=false, length = 13, unique = true)
    private String rfc;


    public enum rolesTrabajador {
        admin,
        entrenador,
        recepcionista,
        nutriologo, 
        limpieza, 
        tecnicos
    }

    @NotNull 
    @Column (nullable=false)
    @Enumerated (EnumType.STRING)
    private rolesTrabajador rol;


    public enum turnosTrabajador {
        admin,
        entrenador,
        recepcionista,
        nutriologo, 
        limpieza, 
        tecnicos
    }

    @NotNull 
    @Column (nullable=false)
    @Enumerated (EnumType.STRING)
    private turnosTrabajador turno;

    @NotNull 
    @Column (nullable=false)
    @Digits (integer = 10, fraction = 2)
    @Positive 
    private BigDecimal sueldo;

    @NotNull 
    @Column (name= "fecha_nacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    @NotNull 
    @ManyToOne 
    @JsonBackReference
    @JoinColumn (name="id_sucursal", nullable=false)
    private Sucursal sucursal_id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public String getRfc() {
        return rfc;
    }

    public void setRfc(String rfc) {
        this.rfc = rfc;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public turnosTrabajador getTurno() {
        return turno;
    }

    public void setTurno(turnosTrabajador turno) {
        this.turno = turno;
    }

    public rolesTrabajador getRol() {
        return rol;
    }

    public void setRol(rolesTrabajador rol) {
        this.rol = rol;
    }

    public BigDecimal getSueldo() {
        return sueldo;
    }

    public void setSueldo(BigDecimal sueldo) {
        this.sueldo = sueldo;
    }

    public Sucursal getSucursal_id() {
        return sucursal_id;
    }

    public void setSucursal_id(Sucursal sucursal_id) {
        this.sucursal_id = sucursal_id;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }
}
