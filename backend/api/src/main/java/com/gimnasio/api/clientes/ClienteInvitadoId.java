package com.gimnasio.api.clientes;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

//mapeada y corregida
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteInvitadoId implements Serializable {

    @Column(name = "cliente_id")
    private Integer clienteId;

    @Column(name = "invitado_id")
    private Integer invitadoId;

}
