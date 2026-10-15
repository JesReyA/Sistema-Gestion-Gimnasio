package com.gimnasio.api.bitacora;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Map;

@Entity
@Table(name = "bitacora")
public class Bitacora {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id_bitacora")
    private BigInteger idBitacora;

    @NotNull
    @Column(name = "fecha")
    private LocalDate fecha;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(name = "accion")
    private accionBitacora accion;

    @NotNull
    @Column(name = "entidad", length = 50)
    private String entidad;


    @NotNull
    @Column(name = "entidad_id")
    private Integer entidadId;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private Map<String, Object> detalle;


    //cuenta id
    private enum accionBitacora{
        codigo_regenerado,
        rol_cambiado,
        cuenta_estado_cambiado,
        suscripcion_creada,
        suscripcion_estado_cambiado,
        pago_registrado,
        pago_marcado_pagado,
        sesion_cancelada,
        evento_eliminado
    }

    public BItacora() {
    }

    public BigInteger getIdBitacora() {
        return idBitacora;
    }

    public void setIdBitacora(BigInteger idBitacora) {
        this.idBitacora = idBitacora;
    }

    public Map<String, Object> getDetalle() {
        return detalle;
    }

    public void setDetalle(Map<String, Object> detalle) {
        this.detalle = detalle;
    }

    public Integer getEntidadId() {
        return entidadId;
    }

    public void setEntidadId(Integer entidadId) {
        this.entidadId = entidadId;
    }

    public String getEntidad() {
        return entidad;
    }

    public void setEntidad(String entidad) {
        this.entidad = entidad;
    }

    public accionBitacora getAccion() {
        return accion;
    }

    public void setAccion(accionBitacora accion) {
        this.accion = accion;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }
}
