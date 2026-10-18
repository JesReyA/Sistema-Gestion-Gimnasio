package com.gimnasio.api.nutricion;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clientes.Cliente;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "nutricion")
public class Nutricion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nutricion")
    private Integer idNutricion;

    //mapeada
    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    @JsonBackReference ("cliente-nutricion")
    private Cliente cliente;

    @NotNull
    @Column(name = "fecha")
    private LocalDateTime fecha;

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
