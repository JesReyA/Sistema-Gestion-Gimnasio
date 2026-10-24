package com.gimnasio.api.sucursales;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SucursalProveedorId implements Serializable {

    @Column(name = "sucursal_id")
    private Integer sucursal;

    @Column(name = "proveedor_id")
    private Integer proveedor;

}
