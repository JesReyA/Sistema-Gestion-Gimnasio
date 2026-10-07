package com.gimnasio.api.clases;

import com.gimnasio.api.trabajadores.Entrenador;
import jakarta.persistence.*;


@Entity
@Table(name = "entrenadores_clases")
public class EntrenadoresClases {

    @ManyToOne
    @JoinColumn(name = "entrenador_id")
    private Entrenador entrenadorId;

    @ManyToOne
    @JoinColumn(name = "clase_id")
    private Clases clase;


    public Entrenador getEntrenadorId() {
        return entrenadorId;
    }

    public void setEntrenadorId(Entrenador entrenadorId) {
        this.entrenadorId = entrenadorId;
    }

    public Clases getClase() {
        return clase;
    }

    public void setClase(Clases clase) {
        this.clase = clase;
    }
}
