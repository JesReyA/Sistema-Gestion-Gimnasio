package com.gimnasio.api.sucursales;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;

//clase intermedia, do not touch
public class SucursalProveedor {
    @ManyToOne
    @Column (name = "sucursal_id")
    @JsonBackReference ("sucursal-sucursalProveedor")
    private Sucursal sucursal;

    @ManyToOne
    @Column (name = "proveedor_id")
    @JsonBackReference("proveedor-SucusalProveedor")
    private Proveedor proveedor;

    public SucursalProveedor(Sucursal sucursal, Proveedor proveedor) {
        this.sucursal = sucursal;
        this.proveedor = proveedor;
    }

    public SucursalProveedor() {
    }

    public Sucursal getSucursal() {
        return sucursal;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    public Proveedor getProveedor() {
        return proveedor;
    }

    public void setProveedor(Proveedor proveedor) {
        this.proveedor = proveedor;
    }
}
