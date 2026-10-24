package com.gimnasio.api.clientes;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table (name = "clientes_invitados")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ClienteInvitado {

    @EqualsAndHashCode.Include
    @EmbeddedId
    private ClienteInvitadoId id = new ClienteInvitadoId();

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

}
