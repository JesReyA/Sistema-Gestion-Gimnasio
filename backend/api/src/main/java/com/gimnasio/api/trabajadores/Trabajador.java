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
}
