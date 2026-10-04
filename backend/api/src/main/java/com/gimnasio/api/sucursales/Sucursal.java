package com.gimnasio.api.sucursales;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.trabajadores.Trabajador;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity 
@Table (name = "sucursales")
public class Sucursal {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)  // Auto-increment
    private Integer id;

    @NotNull 
    @Column (nullable=false, length = 100)
    private String nombre;

    @NotNull 
    @Column (nullable=false, length = 150)
    private String calle;

    @NotNull 
    @Column (name = "codigo_postal", nullable=false, length = 10)
    private String codigoPostal;

    @NotNull 
    @Column (name = "municipio_alcaldia", nullable=false, length = 150)
    private String municipioAlcaldia;

    @NotNull
    @ManyToOne 
    @JsonBackReference 
    @JoinColumn (name="id_estado", nullable=false)
    private EntidadFederativa estado_id;

    @Column (nullable=false, length = 100)
    private String pais;

    @NotNull 
    @Column (nullable=false, length = 100)
    private String horario;

    @NotNull 
    @Column (nullable=false, length = 100)
    @Positive 
    private Integer aforo;

    @OneToMany (mappedBy="entidad_id")
    private List<Trabajador> trabajadores = new ArrayList<>();
}
