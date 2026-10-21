package com.gimnasio.api.clases;

import com.gimnasio.api.trabajadores.Entrenador;
import jakarta.persistence.*;


@Entity
@Table(name = "entrenadores_clases")
public class EntrenadorClase {

    @ManyToOne
    @JoinColumn(name = "entrenador_id")
    private Entrenador entrenadorId;

    @ManyToOne
    @JoinColumn(name = "clase_id")
    private Clase clase;


    public Entrenador getEntrenadorId() {
        return entrenadorId;
    }

    public void setEntrenadorId(Entrenador entrenadorId) {
        this.entrenadorId = entrenadorId;
    }

    public Clase getClase() {
        return clase;
    }

    public void setClase(Clase clase) {
        this.clase = clase;
    }
}
