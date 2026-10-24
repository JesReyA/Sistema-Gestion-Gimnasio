package com.gimnasio.api.suscripciones.persistance;

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
import lombok.*;

@Entity 
@Table (name="servicios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Servicio {

    @EqualsAndHashCode.Include
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
    @Column (columnDefinition="text")
    private String descripcion;

    @OneToMany (mappedBy="servicio")
    @JsonManagedReference ("servicio-planServicio")
    private List<PlanServicio> planesServicios = new ArrayList<>();

}
