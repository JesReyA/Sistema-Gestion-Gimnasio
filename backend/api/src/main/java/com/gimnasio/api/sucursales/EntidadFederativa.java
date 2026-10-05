package com.gimnasio.api.sucursales;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity 
@Table (name = "entidades_federativas")
public class EntidadFederativa {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)// Auto-increment
    @Column (name = "id_estado", nullable=false)
    private Integer idEstado;

    @NotNull 
    @Column (nullable=false, length = 50)
    private String nombre;

    @JsonManagedReference     // Se usa en la traducción a JSON y para evitar referencias circulares
    @OneToMany (mappedBy = "estado_id")
    private List<Sucursal> sucursales = new ArrayList<>();

    public Integer getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(Integer idEstado) {
        this.idEstado = idEstado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Sucursal> getSucursales() {
        return sucursales;
    }

    public void setSucursales(List<Sucursal> sucursales) {
        this.sucursales = sucursales;
    }
}
