package com.gimnasio.api.eventos;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


//mapeada y corregida
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InscripcionEventoId implements Serializable {

    @Column(name = "cliente_id")
    private Integer cliente;

    @Column(name = "evento_id")
    private Integer evento;
}
