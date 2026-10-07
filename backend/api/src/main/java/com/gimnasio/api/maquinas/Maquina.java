package com.gimnasio.api.maquinas;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "maquinas")
public class Maquina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_maquina")
    private Integer idMaquina;
    //sucursal id

    @NotNull
    @Column(name = "nombre", length = 100)
    private String nombre;

    @NotNull
    @Column(name = "grupo_muscular", length = 100)
    private String grupoMuscular;

    @NotNull
    @Column(name = "marca", length = 100)
    private String marca;

    @NotNull
    @Column(name = "modelo", length = 100)
    private String modelo;

    @NotNull
    @Column(name = "numero_serie", length = 100)
    private String numeroSerie;

    @NotNull
    @Column(name = "estado_funcional")
    @Enumerated(EnumType.STRING)
    private estadoFuncional estado = estadoFuncional.disponible;


    enum estadoFuncional{
        disponible,
        en_reparacion,
        fuera_de_servicio
    }

    public Maquina() {
    }

    public Integer getIdMaquina() {
        return idMaquina;
    }

    public void setIdMaquina(Integer idMaquina) {
        this.idMaquina = idMaquina;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getGrupoMuscular() {
        return grupoMuscular;
    }

    public void setGrupoMuscular(String grupoMuscular) {
        this.grupoMuscular = grupoMuscular;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public estadoFuncional getEstado() {
        return estado;
    }

    public void setEstado(estadoFuncional estado) {
        this.estado = estado;
    }

    public String getNumeroSerie() {
        return numeroSerie;
    }

    public void setNumeroSerie(String numeroSerie) {
        this.numeroSerie = numeroSerie;
    }
}
