package com.gimnasio.api.clientes;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;

import java.util.Objects;

@Embeddable
public class ClienteInvitadoId {

    @Column(name = "cliente_id")
    private Cliente clienteId;

    @Column(name = "invitado_id")
    private Invitado invitadoId;

    public ClienteInvitadoId() {
    }

    public Cliente getClienteId() {
        return clienteId;
    }

    public void setClienteId(Cliente clienteId) {
        this.clienteId = clienteId;
    }

    public Invitado getInvitadoId() {
        return invitadoId;
    }

    public void setInvitadoId(Invitado invitadoId) {
        this.invitadoId = invitadoId;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ClienteInvitadoId that = (ClienteInvitadoId) o;
        return Objects.equals(clienteId, that.clienteId) && Objects.equals(invitadoId, that.invitadoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clienteId, invitadoId);
    }
}
