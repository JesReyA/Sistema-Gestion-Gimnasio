package com.gimnasio.api.sucursales;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity 
@Table (name = "entidades_federativas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class EntidadFederativa {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)// Auto-increment
    @Column (name = "id_entidad", nullable=false)
    private Integer idEstado;

    @NotNull 
    @NotBlank 
    @Column (nullable=false, length = 50)
    private String nombre;

    // Se usa en la traducción a JSON y para evitar referencias circulares
    //mapeada
    @OneToMany (mappedBy = "entidadFederativa")
    @JsonManagedReference("entidadFederativa-sucursal")
    private List<Sucursal> sucursales = new ArrayList<>();


}