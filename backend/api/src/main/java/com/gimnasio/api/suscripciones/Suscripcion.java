package com.gimnasio.api.suscripciones;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.clientes.Cliente;

import com.gimnasio.api.pagos.Pago;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table (name="suscripciones")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Suscripcion {

    //mapeada
    @EqualsAndHashCode.Include
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
    @JsonBackReference("planSuscripcion-suscripcion")
    private PlanSuscripcion planSuscripcion;

    //mapeada
    @OneToMany(mappedBy = "suscripcion")
    @JsonManagedReference("suscripcion-pago")
    private List<Pago> pago = new ArrayList<>();

    //mapeada
    @NotNull 
    @Column (name="fecha_inicio", nullable=false)
    private LocalDate fechaInicio;

    //mapeada
    @NotNull 
    @Column (name="fecha_fin", nullable=false)
    private LocalDate fechaFin;

    public enum estadoSuscripcion{
        activa, 
        vencida,
        cancelada
    }

    @NotNull 
    @Column (nullable=false)
    @Enumerated(EnumType.STRING)
    private estadoSuscripcion estado = estadoSuscripcion.activa;

}
