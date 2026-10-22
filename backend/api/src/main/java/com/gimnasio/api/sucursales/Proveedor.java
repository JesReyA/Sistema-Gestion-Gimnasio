package com.gimnasio.api.sucursales;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "proveedores")
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proveedor")
    private Integer idProveedor;

    @NotNull
    @Column(name = "nombre", length = 100)
    private String nombre;

    @Column(name = "apellido_paterno", length = 100)
    private String apellidoPaterno;

    @Column(name = "apellido_materno", length = 100)
    private String apellidoMaterno;

    @NotNull
    @Column(name = "razon_social", length = 100)
    private String razonSocial;

    @NotNull
    @Column(name = "tipo_servicio")
    private String tipoServicio;

    @Lob
    @Column(name = "descripcion_servicio", columnDefinition = "text")
    private String descripcionServicio;


    //mapeada
    @OneToMany(mappedBy = "proveedor")
    @JsonManagedReference("proovedor-SucursalProveedor")
    private List<SucursalProveedor> sucursalProveedor = new ArrayList<>();

    public Proveedor() {
    }

    public Proveedor(Integer idProveedor, String descripcionServicio, List<SucursalProveedor> sucursalProveedor, String tipoServicio, String apellidoMaterno, String razonSocial, String apellidoPaterno, String nombre) {
        this.idProveedor = idProveedor;
        this.descripcionServicio = descripcionServicio;
        this.sucursalProveedor = sucursalProveedor;
        this.tipoServicio = tipoServicio;
        this.apellidoMaterno = apellidoMaterno;
        this.razonSocial = razonSocial;
        this.apellidoPaterno = apellidoPaterno;
        this.nombre = nombre;
    }

    public Integer getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(Integer idProveedor) {
        this.idProveedor = idProveedor;
    }

    public List<SucursalProveedor> getSucursalProveedor() {
        return sucursalProveedor;
    }

    public void setSucursalProveedor(List<SucursalProveedor> sucursalProveedor) {
        this.sucursalProveedor = sucursalProveedor;
    }

    public String getDescripcionServicio() {
        return descripcionServicio;
    }

    public void setDescripcionServicio(String descripcionServicio) {
        this.descripcionServicio = descripcionServicio;
    }

    public String getTipoServicio() {
        return tipoServicio;
    }

    public void setTipoServicio(String tipoServicio) {
        this.tipoServicio = tipoServicio;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }
}
