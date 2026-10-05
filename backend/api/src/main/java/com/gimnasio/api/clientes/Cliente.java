package com.gimnasio.api.clientes;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity 
@Table (name = "clientes")
public class Cliente {

    @Id  
    @GeneratedValue (strategy = jakarta.persistence.GenerationType.IDENTITY)  // Auto-increment
    @Column (name = "id_cliente", nullable = false)
    private Integer idCliente; 

    @NotNull 
    @Column (nullable=false, length = 100)
    private String nombres;

    @NotNull 
    @Column (name = "apellido_paterno", nullable=false, length = 100)
    private String apellidoPaterno;

    @Column (name = "apellido_materno", nullable=true, length = 100)
    private String apellidoMaterno;

    @NotNull 
    @Column (nullable=false, length = 18, unique = true)
    private String curp;

    @NotNull 
    @Column (name ="numero_celular", nullable=false, length = 20)
    private String numeroCelular;

    @NotNull 
    @Column (name = "correo_electronico", nullable=false, length = 150, unique = true)
    private String correoElectronico;

    @NotNull 
    @Column (nullable=false)
    private LocalDate fechaNacimiento;

    @NotNull 
    @Column (name ="codigo_acceso", nullable=false, length = 32, unique = true)
    private String codigoAcceso;

    @Column (name = "estatura_m")
    @Digits (integer = 1, fraction = 2, message = "La estatura debe escribirse en metros y con dos decimales")
    @Positive
    private BigDecimal estaturaMetros;

    @Column (name = "peso_objetivo_kg")
    @Digits (integer = 5, fraction = 2, message = "El peso objetivo debe escribirse en kilogramos y con dos decimales")
    @Positive
    private BigDecimal pesoObjetivoKg;
}
