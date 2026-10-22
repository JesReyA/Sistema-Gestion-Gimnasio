package com.gimnasio.api.eventos;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clientes.Cliente;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "inscripciones_evento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class InscripcionEvento {

    @EqualsAndHashCode.Include
    @EmbeddedId
    private InscripcionEventoId id = new InscripcionEventoId();

    @ManyToOne
    @MapsId("cliente")
    @JoinColumn(name = "cliente_id", nullable = false)
    @JsonBackReference("cliente-inscripcionEvento")
    private Cliente cliente;

    @ManyToOne
    @MapsId("evento")
    @JoinColumn(name = "evento_id", nullable = false)
    @JsonBackReference("evento-inscripcionEvento")
    private Evento evento;

    @NotNull
    @Column(name = "fecha_inscripcion")
    private LocalDateTime fechaInscripcion;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private InscripcionEstado estadoInscripcion =InscripcionEstado.inscrito;

    private enum InscripcionEstado{
        inscrito,
        cancelado
    }
}
