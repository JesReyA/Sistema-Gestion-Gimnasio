package com.gimnasio.api.eventos;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "eventos")
public class Evento {
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
    @JsonManagedReference("evento-inscripcionEvento")
    private List<InscripcionEvento> inscripcionesEventos;

    @OneToMany(mappedBy = "evento")
    @JsonManagedReference("evento-salonEvento")
    private List<SalonEvento> salonesEventos;

    public Evento() {
    }

    public Evento(Integer idEvento, List<SalonEvento> salonesEventos, List<InscripcionEvento> inscripcionesEventos, LocalDate fechaEvento, Integer duracionMinutos, String nombreEvento) {
        this.idEvento = idEvento;
        this.salonesEventos = salonesEventos;
        this.inscripcionesEventos = inscripcionesEventos;
        this.fechaEvento = fechaEvento;
        this.duracionMinutos = duracionMinutos;
        this.nombreEvento = nombreEvento;
    }

    public Integer getIdEvento() {
        return idEvento;
    }

    public void setIdEvento(Integer idEvento) {
        this.idEvento = idEvento;
    }

    public List<SalonEvento> getSalonesEventos() {
        return salonesEventos;
    }

    public void setSalonesEventos(List<SalonEvento> salonesEventos) {
        this.salonesEventos = salonesEventos;
    }

    public List<InscripcionEvento> getInscripcionesEventos() {
        return inscripcionesEventos;
    }

    public void setInscripcionesEventos(List<InscripcionEvento> inscripcionesEventos) {
        this.inscripcionesEventos = inscripcionesEventos;
    }

    public LocalDate getFechaEvento() {
        return fechaEvento;
    }

    public void setFechaEvento(LocalDate fechaEvento) {
        this.fechaEvento = fechaEvento;
    }

    public Integer getDuracionMinutos() {
        return duracionMinutos;
    }

    public void setDuracionMinutos(Integer duracionMinutos) {
        this.duracionMinutos = duracionMinutos;
    }

    public String getNombreEvento() {
        return nombreEvento;
    }

    public void setNombreEvento(String nombreEvento) {
        this.nombreEvento = nombreEvento;
    }
}
