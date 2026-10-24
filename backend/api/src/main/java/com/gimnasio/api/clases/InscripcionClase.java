package com.gimnasio.api.clases;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clientes.Cliente;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


//mapeada
@Entity
@Table(name = "inscripciones_clase")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class InscripcionClase {

    @EqualsAndHashCode.Include
    @EmbeddedId
    private InscripcionClaseId id = new InscripcionClaseId();

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    @MapsId("clienteId")
    @JsonBackReference("cliente-inscripcionesClase")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "sesion_clase_id", nullable = false)
    @MapsId("sesionClaseId")
    @JsonBackReference("inscripcionesClase-sesionesClase")
    private SesionClase sesionClase;

    @Column(name = "fecha_inscripcion", nullable = false)
    private LocalDateTime fechaInscripcion;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private estadoInscripcion estadoInscripcion;

    private enum estadoInscripcion{
        inscrito,
        cancelado
    }

}


