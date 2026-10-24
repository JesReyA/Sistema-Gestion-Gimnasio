package com.gimnasio.api.sucursales;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sucursales_proveedores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class SucursalProveedor {

    @EmbeddedId
    @EqualsAndHashCode.Include
    private SucursalProveedorId sucursalProveedorId = new SucursalProveedorId();

    //mapeada
    @ManyToOne
    @JoinColumn(name = "sucursal_id")
    @MapsId("sucursal")
    @JsonBackReference ("sucursal-sucursalProveedor")
    private Sucursal sucursal;

    @ManyToOne
    @JoinColumn(name = "proveedor_id")
    @MapsId("proveedor")
    @JsonBackReference("proveedor-SucursalProveedor")
    private Proveedor proveedor;

}
