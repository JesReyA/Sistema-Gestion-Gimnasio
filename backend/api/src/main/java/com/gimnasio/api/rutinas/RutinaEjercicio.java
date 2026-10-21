package com.gimnasio.api.rutinas;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "rutinas_ejercicio")
public class RutinaEjercicio {
    //rutinaId
    @ManyToOne
    @JoinColumn(name = "rutina_id")
    private Rutina rutina;

    //ejercicioId
    @ManyToOne
    @JoinColumn(name = "ejercicio_id")
    private Ejercicio ejercicio;


    @NotNull
    @Size(min = 1)
    @Column(name = "orden")
    private Integer orden;

    @NotNull
    @Size(min = 1)
    @Column(name = "series")
    private Integer series;

    @NotNull
    @Size(min = 1)
    @Column(name = "repeticiones")
    private Integer repeticiones;

    public RutinaEjercicio() {
    }

    public Integer getRepeticiones() {
        return repeticiones;
    }

    public void setRepeticiones(Integer repeticiones) {
        this.repeticiones = repeticiones;
    }

    public Integer getSeries() {
        return series;
    }

    public void setSeries(Integer series) {
        this.series = series;
    }

    public Integer getOrden() {
        return orden;
    }

    public void setOrden(Integer orden) {
        this.orden = orden;
    }
}
