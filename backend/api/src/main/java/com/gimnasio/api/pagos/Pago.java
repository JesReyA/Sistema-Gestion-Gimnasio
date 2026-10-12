package com.gimnasio.api.pagos;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;

import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.suscripciones.Suscripcion;

import jakarta.persistence.Column;


@Entity 
@Table (name="pagos")
public class Pago {
    public Pago (){

    }

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name="id_pago", nullable=false)
    private Integer idPago;

    @NotNull 
    @ManyToOne 
    @JoinColumn (name="suscripcion_id")
    @JsonBackReference 
    private Suscripcion suscripcion;

    @NotNull 
    @NotBlank 
    @Size (max=50)
    @Column (name="folio_pago", nullable = false, length = 50, unique = true)
    private String folioPago;
    
    @Column (name="fecha_pago")
    private LocalDateTime fechaPago;

    @Column (name="proximo_pago")
    private LocalDate proximoPago;

    @NotNull 
    @Positive 
    @Digits (integer=8, fraction=2, message = "El monto seleccionado excede la cantidad máxima")
    @Column (name="monto_mxn", nullable = false)
    private BigDecimal montoMXN;

    public enum metodoPago{
        efectivo,
        tarjeta,
        transferencia
    }

    @Column (name="metodo_pago")
    private metodoPago metodoPago;

    public enum estadoPago{
        no_pagado,
        pagado
    }

    @NotNull 
    @Column (name="estado_pago", nullable = false)
    private estadoPago estado = estadoPago.no_pagado;
    
}
