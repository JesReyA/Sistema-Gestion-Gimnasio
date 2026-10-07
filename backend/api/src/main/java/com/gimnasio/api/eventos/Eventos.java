package com.gimnasio.api.eventos;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "eventos")
public class Eventos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento", nullable = false)
    Integer idEvento;

    @NotNull
    @Column(name = "nombre_evento", length = 150)
    String nombreEvento;

    @NotNull
    @Column(name = "duracion_minutos")
    @Size(min = 1)
    Integer duracionMinutos;

    @NotNull
    @Column(name = "fecha_evento")
    LocalDate fechaEvento;

    @OneToMany(mappedBy = "evento")
    private List<InscripcionesEvento> inscripcionesEventos;

    @OneToMany(mappedBy = "evento")
    private List<SalonesEventos> salonesEventos;

    public Integer getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(Integer idEvento) {
        this.idEvento = idEvento;
    }

    public String getNombreEvento() {
        return nombreEvento;
    }

    public void setNombreEvento(String nombreEvento) {
        this.nombreEvento = nombreEvento;
    }

    public Integer getDuracionMinutos() {
        return duracionMinutos;
    }

    public void setDuracionMinutos(Integer duracionMinutos) {
        this.duracionMinutos = duracionMinutos;
    }

    public LocalDate getFechaEvento() {
        return fechaEvento;
    }

    public void setFechaEvento(LocalDate fechaEvento) {
        this.fechaEvento = fechaEvento;
    }
}
