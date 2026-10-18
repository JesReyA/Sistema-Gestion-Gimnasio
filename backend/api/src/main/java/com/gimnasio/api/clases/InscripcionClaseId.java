package com.gimnasio.api.clases;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InscripcionClaseId implements Serializable {

    @Column(name = "cliente_id")
    private Integer clienteId;

    @Column(name = "sesion_clase_id")
    private Integer sesionClaseId;
}
