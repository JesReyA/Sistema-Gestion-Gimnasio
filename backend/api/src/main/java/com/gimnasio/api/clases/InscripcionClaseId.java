package com.gimnasio.api.clases;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class InscripcionClaseId implements Serializable {

    @Column(name = "cliente_id")
    private Integer clienteId;

    @Column(name = "sesion_clase_id")
    private Integer sesionClaseId;

    public InscripcionClaseId() {
    }

    public InscripcionClaseId(Integer clienteId, Integer sesionClaseId) {
        this.clienteId = clienteId;
        this.sesionClaseId = sesionClaseId;
    }

    public Integer getClienteId() {
        return clienteId;
    }

    public void setClienteId(Integer clienteId) {
        this.clienteId = clienteId;
    }

    public Integer getSesionClaseId() {
        return sesionClaseId;
    }

    public void setSesionClaseId(Integer sesionClaseId) {
        this.sesionClaseId = sesionClaseId;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        InscripcionClaseId that = (InscripcionClaseId) o;
        return Objects.equals(clienteId, that.clienteId) && Objects.equals(sesionClaseId, that.sesionClaseId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clienteId, sesionClaseId);
    }
}
