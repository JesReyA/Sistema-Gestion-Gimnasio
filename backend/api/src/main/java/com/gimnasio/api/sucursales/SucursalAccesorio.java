package com.gimnasio.api.sucursales;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.accesorios.Accesorio;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sucursales_accesorios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class SucursalAccesorio {

    @EmbeddedId
    @EqualsAndHashCode.Include
    private SucursalAccesorioId sucursalAccesorioId = new SucursalAccesorioId();

    //mapeada
    @ManyToOne
    @MapsId("sucursal")
    @JsonBackReference("sucursal-sucursalAccesorio")
    @JoinColumn(name  = "sucursal_id", nullable = false)
    private Sucursal sucursal;

    @ManyToOne
    @MapsId("accesorio")
    @JoinColumn(name  = "accesorio_id", nullable = false)
    @JsonBackReference("accesorio-sucursalAccesorio")
    private Accesorio accesorio;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

}
