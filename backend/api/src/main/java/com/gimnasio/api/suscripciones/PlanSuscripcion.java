package com.gimnasio.api.suscripciones;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
    @Column(columnDefinition = "TEXT")
    private String definicion;

    @NotNull
    @Positive
    @Column(name = "duracion_dias", nullable = false)
    private Integer duracionDias;

    @NotNull
    @PositiveOrZero
    @Column(nullable = false)
    private Integer costo;

    public enum estadoPlan {
        disponible,
        no_disponible
    }

    @NotNull
    @Column(nullable = false)
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
