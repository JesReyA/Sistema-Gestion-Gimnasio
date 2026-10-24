package com.gimnasio.api.clases;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import com.gimnasio.api.trabajadores.EntrenadorClase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity 
@Table (name="clases")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Clase {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue (strategy= GenerationType.IDENTITY)
    @Column (name="id_clase", nullable=false)
    private Integer idClase;

    @NotNull 
    @NotBlank 
    @Size (max=100)
    @Column(nullable=false, length=100)
    private String nombre;

    @NotNull 
    @NotBlank 
    @Size (max=100)
    @Column(nullable=false, length=100)
    private String tematica;

    @NotNull 
    @Positive
    @Column(nullable=false)
    private Integer aforo;

    @OneToMany (mappedBy = "clase")
    @JsonManagedReference("clase-sesionClase")
    private List<SesionClase> sesionesClase = new ArrayList<>();

    @OneToMany (mappedBy = "clase")
    @JsonManagedReference("clase-entrenadorClase")
    private List<EntrenadorClase> entrenadorClase = new ArrayList<>();

}
