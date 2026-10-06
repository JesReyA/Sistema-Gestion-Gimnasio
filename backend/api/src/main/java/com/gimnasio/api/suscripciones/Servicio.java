package com.gimnasio.api.suscripciones;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity 
@Table (name="servicios")
public class Servicio {

    public Servicio(){

    }

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name="id_servicio", nullable=false)
    private Integer idServicio;

    @Column (nullable = false, unique=true, length=100)
    @NotBlank 
    @NotNull 
    @Size (max =100)
    private String nombre;

    @Lob 
    @Column (columnDefinition="TEXT")
    private String descripcion;

    @OneToMany (mappedBy="servicio")
    @JsonManagedReference 
    private List<PlanServicio> planesServicios = new ArrayList<>();

    public Integer getIdServicio() {
        return idServicio;
    }

    public void setIdServicio(Integer idServicio) {
        this.idServicio = idServicio;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<PlanServicio> getPlanesServicios() {
        return planesServicios;
    }

    public void setPlanesServicios(List<PlanServicio> planesServicios) {
        this.planesServicios = planesServicios;
    }

}
