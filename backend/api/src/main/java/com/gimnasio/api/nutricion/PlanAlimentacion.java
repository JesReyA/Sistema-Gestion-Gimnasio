package com.gimnasio.api.nutricion;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clientes.Cliente;
import com.gimnasio.api.trabajadores.Nutriologo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "planes_alimentacion")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PlanAlimentacion {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id_plan")
    private Integer idPlan;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    @JsonBackReference("cliente-planAlimentacion")
    private Cliente cliente;

    //mapeada
    @ManyToOne
    @JoinColumn(name = "nutriologo_id")
    @JsonBackReference("nutriologo-planAlimentacion")
    private Nutriologo nutriologo;

    @NotNull
    @Column(name = "tipo_comida")
    @Enumerated(EnumType.STRING)
    private tipoComida comida;

    @NotNull
    @Lob
    @Column(name = "recomendacion", columnDefinition = "text")
    private String recomendacion;

    @Lob
    @Column(name = "razones", columnDefinition = "text")
    private String razones;


    private enum tipoComida{
        desayuno,
        comida,
        cena,
        colacion
    }
}
