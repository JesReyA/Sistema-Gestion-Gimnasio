package com.gimnasio.api.clientes;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable 
public class ClienteInvitadoId implements Serializable{

    private Integer clienteId;

    private Integer invitadoId;

    public ClienteInvitadoId() {
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((clienteId == null) ? 0 : clienteId.hashCode());
        result = prime * result + ((invitadoId == null) ? 0 : invitadoId.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ClienteInvitadoId other = (ClienteInvitadoId) obj;
        if (clienteId == null) {
            if (other.clienteId != null)
                return false;
        } else if (!clienteId.equals(other.clienteId))
            return false;
        if (invitadoId == null) {
            if (other.invitadoId != null)
                return false;
        } else if (!invitadoId.equals(other.invitadoId))
            return false;
        return true;
    }

    public Integer getClienteId() {
        return clienteId;
    }

    public void setClienteId(Integer clienteId) {
        this.clienteId = clienteId;
    }

    public Integer getInvitadoId() {
        return invitadoId;
    }

    public void setInvitadoId(Integer invitadoId) {
        this.invitadoId = invitadoId;
    }

    
    
}
