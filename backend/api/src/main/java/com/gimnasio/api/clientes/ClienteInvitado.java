package com.gimnasio.api.clientes;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table (name = "clientes_invitados")
public class ClienteInvitado {
    
    // las relaciones Uno a muchos del lado del no dependiente deben tener OneToMany y mappedBy, y del lado dependiente ManyToOne y JoinColumn
    @ManyToOne 
    @JsonBackReference 
    @NotNull 
    @JoinColumn (name="cliente_id", nullable=false)
    private Cliente cliente;

    @ManyToOne 
    @JsonBackReference
    @NotNull
    @JoinColumn (name="invitado_id", nullable=false)
    private Invitado invitado;

    //Falta crear un indexes pk en la tabla clientes_invitados

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
