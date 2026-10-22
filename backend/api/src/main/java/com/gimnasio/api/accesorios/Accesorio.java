package com.gimnasio.api.accesorios;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.sucursales.SucursalAccesorio;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "accesorios")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Accesorio {
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_accesorio")
    private Integer idAccesorio;

    @NotNull
    @Column(name = "nombre", length = 100)
    private String nombre;

    @NotNull
    @Column(name = "descripcion_uso", length = 255)
    private String descripcionUso;

    @NotNull
    @Column(name = "estado_prestamo")
    @Enumerated(EnumType.STRING)
    private estadoPrestamo prestamo = estadoPrestamo.disponible;

    private enum estadoPrestamo{
        no_prestable,
        disponible,
        prestado
    }

    @OneToMany(mappedBy = "accesorio")
    @JsonManagedReference("accesorio-accesorioEjercicio")
    private List<AccesorioEjercicio> accesorioEjercicio = new ArrayList<>();

    @OneToMany(mappedBy = "accesorio")
    @JsonManagedReference("accesorio-sucursalAccesorio")
    private List<SucursalAccesorio> sucursalAccesorio = new ArrayList<>();

}
