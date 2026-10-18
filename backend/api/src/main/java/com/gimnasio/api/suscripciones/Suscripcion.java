package com.gimnasio.api.suscripciones;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.clientes.Cliente;

import com.gimnasio.api.pagos.Pago;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table (name="suscripciones")
public class Suscripcion {

    //mapeada
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name ="id_suscripcion", nullable=false)
    private Integer idSuscripcion;

    //mapeada
    @ManyToOne 
    @JoinColumn (name="cliente_id", nullable = false)
    @JsonBackReference ("cliente-suscripciones")
    private Cliente cliente;

    //mapeada
    @ManyToOne 
    @JoinColumn (name="plan_id", nullable = false)
    @JsonBackReference("plan-suscripcion")
    private PlanSuscripcion planSuscripcion;

    //mapeada
    @OneToMany(mappedBy = "suscripcion")
    @JsonManagedReference("suscripcion-pago")
    private List<Pago> pago = new ArrayList<>();

    //mapeada
    @NotNull 
    @Column (name="fecha_inicio", nullable=false)
    private LocalDateTime fechaInicio;

    //mapeada
    @NotNull 
    @Column (name="fecha_fin", nullable=false)
    private LocalDateTime fechaFin;

    public enum estadoSuscripcion{
        activa, 
        vencida,
        cancelada
    }

    @NotNull 
    @Column (nullable=false)
    private estadoSuscripcion estado = estadoSuscripcion.activa;

}
