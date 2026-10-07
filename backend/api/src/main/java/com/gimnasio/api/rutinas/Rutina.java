package com.gimnasio.api.rutinas;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name="rutinas")
public class Rutina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rutina")
    private Integer idRutina;

    @Column(name = "nombre", length = 100)
    @NotNull
    private String nombre;

    @Column(name = "objetivo", length = 100)
    @NotNull
    private String objetivo;

    @Column(name = "nivel", length = 50)
    @NotNull
    private String nivel;

    @OneToMany(mappedBy = "rutina")
    @NotNull
    private List<RutinaEjercicio> rutinaEjercicio;

    public Rutina() {
    }

    public Integer getIdRutina() {
        return idRutina;
    }

    public void setIdRutina(Integer idRutina) {
        this.idRutina = idRutina;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }

    public String getObjetivo() {
        return objetivo;
    }

    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
