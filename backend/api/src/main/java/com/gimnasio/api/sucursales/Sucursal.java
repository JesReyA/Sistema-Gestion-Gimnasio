package com.gimnasio.api.sucursales;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.asistencias.Asistencia;
import com.gimnasio.api.maquinas.Maquina;
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
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Entity 
@Table (name = "sucursales")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Sucursal {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue (strategy = GenerationType.IDENTITY)  // Auto-increment
    @Column (name = "id_sucursal", nullable=false)
    private Integer idSucursal;

    // las relaciones Uno a muchos del lado del no dependiente deben tener OneToMany y mappedBy, y del lado dependiente ManyToOne y JoinColumn
    @NotNull
    @ManyToOne 
    @JsonManagedReference
    @JoinColumn (name="estado_id", nullable=false)
    private EntidadFederativa estado;

    // las relaciones Uno a muchos del lado del no dependiente deben tener OneToMany y mappedBy, y del lado dependiente ManyToOne y JoinColumn

    //mapeada
    @NotNull
    @OneToMany (mappedBy="sucursal")
    @JsonManagedReference("sucursal-trabajador")
    private List<Trabajador> trabajadores = new ArrayList<>();

    //mapeada
    @OneToMany (mappedBy="sucursal")
    @JsonManagedReference("sucursal-maquina")
    private List<Maquina> maquina = new ArrayList<>();

    @OneToMany (mappedBy="sucursal")
    @JsonManagedReference
    private List<Salon> salones = new ArrayList<>();

    @OneToMany (mappedBy="sucursal")
    @JsonManagedReference
    private List<Asistencia> asistencias = new ArrayList<>();

    @NotNull
    @NotBlank
    @Column (nullable=false, length = 100)
    private String nombre;

    @NotNull
    @NotBlank
    @Column (nullable=false, length = 150)
    private String calle;

    @NotNull
    @NotBlank
    @Column (name = "codigo_postal", nullable=false, length = 10)
    private String codigoPostal;

    @NotNull
    @NotBlank
    @Column (name = "municipio_alcaldia", nullable=false, length = 150)
    private String municipioAlcaldia;

    @Column (nullable=false, length = 100)
    @NotNull
    @NotBlank
    private String pais;

    @NotNull 
    @NotBlank
    @Column (nullable=false, length = 100)
    private String horario;

    @NotNull 
    @Column (nullable=false, length = 100)
    @Positive 
    private Integer aforo;
    
}
