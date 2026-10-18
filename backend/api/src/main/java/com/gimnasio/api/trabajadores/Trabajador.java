package com.gimnasio.api.trabajadores;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.auth.Cuenta;
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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import com.gimnasio.api.common.enums.RolTrabajador;
import com.gimnasio.api.common.enums.TurnoTrabajador;
import lombok.*;


@Entity
@Table(name = "trabajadores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Trabajador {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue (strategy = GenerationType.IDENTITY)  // Auto-increment
    @Column (name = "id_trabajador", nullable=false)
    private Integer idTrabajador;

    @NotNull 
    @NotBlank 
    @Column (nullable=false, length = 100)
    private String nombres;

    @NotNull 
    @NotBlank
    @Column (name = "apellido_paterno", nullable=false, length = 100)
    private String apellidoPaterno;

    @Column (name = "apellido_materno", nullable=true, length = 100)
    private String apellidoMaterno;

    @NotNull 
    @NotBlank 
    @Column (nullable=false, length = 13, unique = true)
    private String rfc;

    @NotNull 
    @Column (nullable=false)
    @Enumerated (EnumType.STRING)
    private RolTrabajador rol;

    @NotNull 
    @Column (nullable=false)
    @Enumerated (EnumType.STRING)
    private TurnoTrabajador turno;

    @NotNull 
    @Column (nullable=false)
    @Digits (integer = 10, fraction = 2)
    @Positive 
    private BigDecimal sueldo;

    @NotNull 
    @Column (name= "fecha_nacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    // las relaciones Uno a muchos del lado del no dependiente deben tener OneToMany y mappedBy, y del lado dependiente ManyToOne y JoinColumn

    //mapeada
    @NotNull
    @ManyToOne 
    @JsonBackReference("sucursal-trabajador")
    @JoinColumn (name="sucursal_id", nullable=false)
    private Sucursal sucursal;

    @OneToOne (mappedBy = "trabajador")
    @JsonManagedReference("trabajador-cuenta")
    private Cuenta cuenta;

    @OneToOne(mappedBy = "trabajador-entrenador")
    @JsonManagedReference
    private Entrenador entrenador;


}
