package com.gimnasio.api.clientes;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table (name = "clientes_invitados")
public class ClienteInvitado {

    @EmbeddedId
    private ClienteInvitadoId id = new ClienteInvitadoId();

    public ClienteInvitado(){
    }

    public ClienteInvitado(ClienteInvitadoId id, Invitado invitado, Cliente cliente) {
        this.id = id;
        this.invitado = invitado;
        this.cliente = cliente;
    }

    // las relaciones Uno a muchos del lado del no dependiente deben tener OneToMany y mappedBy, y del lado dependiente ManyToOne y JoinColumn
    @ManyToOne 
    @JsonBackReference("cliente-clienteInvitado")
    @MapsId("clienteId")
    @JoinColumn (name="cliente_id", nullable=false)
    private Cliente cliente;

    @ManyToOne 
    @JsonBackReference("invitado-clienteInvitado")
    @MapsId("invitadoId")
    @JoinColumn (name="invitado_id", nullable=false)
    private Invitado invitado;


    public ClienteInvitadoId getId() {
        return id;
    }

    public void setId(ClienteInvitadoId id) {
        this.id = id;
    }

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
}
