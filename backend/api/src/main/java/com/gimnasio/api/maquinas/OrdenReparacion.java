package com.gimnasio.api.maquinas;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name= "ordenes_reparacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class OrdenReparacion {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_orden")
    private Integer idOrden;

    //mapeada
    @ManyToOne
    @JoinColumn(name = "maquina_id")
    @JsonBackReference("maquina-ordenReparacion")
    private Maquina maquina;

    @OneToOne(mappedBy = "ordenReparacion")
    @JsonManagedReference("ordenReparacion-procesoReparacion")
    private ProcesoReparacion procesoReparacion;

    @NotNull
    @Column(name = "folio", length = 50)
    private String folio;

    @NotNull
    @Column(name = "fecha_reporte")
    private LocalDate fechaReporte;

    @Lob
    @NotNull
    @Column(name = "razon_reparacion", columnDefinition = "text")
    private String razonReparacion;


}
