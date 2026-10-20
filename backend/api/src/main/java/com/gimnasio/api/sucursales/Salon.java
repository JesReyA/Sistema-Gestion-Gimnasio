package com.gimnasio.api.sucursales;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.clases.SesionClase;

import com.gimnasio.api.eventos.SalonEvento;
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
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity 
@Table (name="salon")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Salon {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name="id_salon", nullable= false)
    private Integer idSalon;

    @OneToMany(mappedBy = "salon")
    @JsonManagedReference("salon-salonEvento")
    private List<SalonEvento> salonEvento = new ArrayList<>();

    @ManyToOne 
    @NotNull 
    @JoinColumn (name="sucursal_id", nullable=false)
    @JsonBackReference("sucursal-salon")
    private Sucursal sucursal;

    @NotNull 
    @Size (max= 50)
    @Column (name="numero_salon", nullable = false, length=50)
    private String numeroSalon;

    @NotNull 
    @Positive 
    @Column (nullable=false)
    private Integer capacidad;

    //Falta indexar sucursal_id con numoer_salon para que su conjunto sea unico

    @OneToMany (mappedBy = "salon")
    @JsonManagedReference ("salon-sesionClase")
    private List<SesionClase> sesionesClase = new ArrayList<>();

}
