package com.gimnasio.api.nutricion;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "nutricion")
public class Nutricion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nutricion")
    private Integer idNutricion;

    //cliente id
    @NotNull
    @Column(name = "fecha")
    private LocalDate fecha;

    @NotNull
    @Column(name = "tipo_comida")
    private tipoComida comida;

    @NotNull
    @Column(name = "alimento", length = 150)
    private String alimento;


    @Column(name = "calorias", precision = 10, scale = 2)
    @Min(value = 0)
    private BigDecimal calorias;

    @Column(name = "consumo_agua", precision = 7, scale = 2)
    @Min(value = 0)
    private BigDecimal consumoAgua;


    private enum tipoComida{
        desayuno,
        comida,
        cena,
        colacion
    }

}
