package com.gimnasio.api.accesorios;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "accesorios")
public class Accesorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_accesorio")
    private Integer idAccesorio;

    @NotNull
    @Column(name = "nombre", length = 100)
    private String nombre;

    @NotNull
    @Column(name = "descripcion_uso", length = 255)
    private String descripcionUso;

    @NotNull
    @Column(name = "estado_prestamo")
    @Enumerated(EnumType.STRING)
    private estadoPrestamo prestamo = estadoPrestamo.disponible;

    private enum estadoPrestamo{
        no_prestable,
        disponible,
        prestado
    }

    public Accesorio() {
    }

    public Integer getIdAccesorio() {
        return idAccesorio;
    }

    public void setIdAccesorio(Integer idAccesorio) {
        this.idAccesorio = idAccesorio;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcionUso() {
        return descripcionUso;
    }

    public void setDescripcionUso(String descripcionUso) {
        this.descripcionUso = descripcionUso;
    }

    public estadoPrestamo getPrestamo() {
        return prestamo;
    }

    public void setPrestamo(estadoPrestamo prestamo) {
        this.prestamo = prestamo;
    }
}
