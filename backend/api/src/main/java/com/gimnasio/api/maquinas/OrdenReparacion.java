package com.gimnasio.api.maquinas;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name= "ordenes_reparacion")
public class OrdenReparacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_orden")
    private Integer idOrden;

    //maquina id

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


    public OrdenReparacion() {
    }

    public Integer getIdOrden() {
        return idOrden;
    }

    public void setIdOrden(Integer idOrden) {
        this.idOrden = idOrden;
    }

    public String getRazonReparacion() {
        return razonReparacion;
    }

    public void setRazonReparacion(String razonReparacion) {
        this.razonReparacion = razonReparacion;
    }

    public LocalDate getFechaReporte() {
        return fechaReporte;
    }

    public void setFechaReporte(LocalDate fechaReporte) {
        this.fechaReporte = fechaReporte;
    }

    public String getFolio() {
        return folio;
    }

    public void setFolio(String folio) {
        this.folio = folio;
    }
}
