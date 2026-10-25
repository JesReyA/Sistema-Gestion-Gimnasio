package com.gimnasio.api.maquinas;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "procesos_reparacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ProcesoReparacion {

    //orden_reparacion id

    @Id
    @EqualsAndHashCode.Include
    @Column(name ="orden_reparacion_id")
    private Integer ordenReparacionId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "orden_reparacion_id")
    @JsonBackReference("ordenReparacion-procesoReparacion")
    private OrdenReparacion ordenReparacion;

    @NotNull
    @Column(name = "folio_reparacion", unique = true, length = 50)
    private String folioReparacion;

    @NotNull
    @Column(name = "tipo_reparacion", length = 100)
    private String tipoReparacion;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado_reparacion")
    private estadoReparacion estadoRep = estadoReparacion.pendiente;


    private enum estadoReparacion{
        pendiente,
        en_proceso,
        finalizada,
        cancelada

    }


}
