package com.gimnasio.api.suscripciones.persistance;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@Entity 
@Table (name="planes_suscripcion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PlanSuscripcion {

    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment
    @Column(name = "id_plan", nullable = false)
    private Integer idPlan;

    @NotNull
    @Column(name = "nombre", nullable = false, length = 100, unique = true)
    private String nombre;

    @Lob
    @Column(name = "descripcion",columnDefinition = "TEXT")
    private String descripcion;

    @NotNull
    @Positive
    @Column(name = "duracion_dias", nullable = false)
    private Integer duracionDias;

    @NotNull
    @PositiveOrZero
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal costo;

    public enum estadoPlan {
        disponible,
        no_disponible
    }

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private estadoPlan estado = estadoPlan.disponible;

    //mapeada
    @OneToMany(mappedBy = "planSuscripcion")
    @JsonManagedReference("planSuscripcion-planServicio")
    private List<PlanServicio> planesServicios = new ArrayList<>();

    //mapeada
    @OneToMany (mappedBy="planSuscripcion")
    @JsonManagedReference("planSuscripcion-suscripcion")
    private List<Suscripcion> suscripciones = new ArrayList<>();


}
