package com.gimnasio.api.maquinas;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "procesos_reparacion")
public class ProcesoReparacion {

    //orden_reparacion id

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

    public ProcesoReparacion() {
    }

    public String getFolioReparacion() {
        return folioReparacion;
    }

    public void setFolioReparacion(String folioReparacion) {
        this.folioReparacion = folioReparacion;
    }

    public estadoReparacion getEstadoRep() {
        return estadoRep;
    }

    public void setEstadoRep(estadoReparacion estadoRep) {
        this.estadoRep = estadoRep;
    }

    public String getTipoReparacion() {
        return tipoReparacion;
    }

    public void setTipoReparacion(String tipoReparacion) {
        this.tipoReparacion = tipoReparacion;
    }
}
