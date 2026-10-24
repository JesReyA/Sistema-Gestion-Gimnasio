package com.gimnasio.api.eventos;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "eventos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Evento {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento", nullable = false)
    private Integer idEvento;

    @NotNull
    @Column(name = "nombre_evento", length = 150)
    private String nombreEvento;

    @NotNull
    @Column(name = "duracion_minutos")
    @Size(min = 1)
    private Integer duracionMinutos;
    
    @NotNull
    @Column(name = "fecha_evento")
    private LocalDateTime fechaEvento;

    @OneToMany(mappedBy = "evento")
    @JsonManagedReference("evento-inscripcionEvento")
    private List<InscripcionEvento> inscripcionesEventos;

    @OneToMany(mappedBy = "evento")
    @JsonManagedReference("evento-salonEvento")
    private List<SalonEvento> salonesEventos;


}
