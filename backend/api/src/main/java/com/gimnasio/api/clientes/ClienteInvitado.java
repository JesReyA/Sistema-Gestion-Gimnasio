package com.gimnasio.api.clientes;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table (name = "clientes_invitados")
public class ClienteInvitado {

    public ClienteInvitado(){
        
    }

    // Llave primaria compuesta
    @EmbeddedId 
    private ClienteInvitadoId idClienteInvitado = new ClienteInvitadoId();
    
    // las relaciones Uno a muchos del lado del no dependiente deben tener OneToMany y mappedBy, y del lado dependiente ManyToOne y JoinColumn
    @ManyToOne 
    @JsonBackReference 
    @NotNull 
    @MapsId ("clienteId")
    @JoinColumn (name="cliente_id", nullable=false)
    private Cliente cliente;

    @ManyToOne 
    @JsonBackReference
    @NotNull
    @MapsId ("invitadiId")
    @JoinColumn (name="invitado_id", nullable=false)
    private Invitado invitado;

    

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Invitado getInvitado() {
        return invitado;
    }

    public void setInvitado(Invitado invitado) {
        this.invitado = invitado;
    }

    public ClienteInvitadoId getIdClienteInvitado() {
        return idClienteInvitado;
    }

    public void setIdClienteInvitado(ClienteInvitadoId idClienteInvitado) {
        this.idClienteInvitado = idClienteInvitado;
    }

    
}
