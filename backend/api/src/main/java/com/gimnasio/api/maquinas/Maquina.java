package com.gimnasio.api.maquinas;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.rutinas.Ejercicio;
import com.gimnasio.api.sucursales.Sucursal;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "maquinas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Maquina {

    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_maquina")
    private Integer idMaquina;

    //sucursal id
    @ManyToOne
    @JoinColumn(name = "sucursal_id", nullable = false)
    @JsonBackReference("sucursal-maquina")
    private Sucursal sucursal;

    //mapeada
    @OneToMany(mappedBy = "maquina")
    @JsonManagedReference("maquina-ejercicio")
    private List<Ejercicio> ejercicio = new ArrayList<>();

    //mapeada
    @OneToMany(mappedBy = "maquina")
    @JsonManagedReference("maquina-ordenReparacion")
    private List<OrdenReparacion> ordenReparacion = new ArrayList<>();

    @NotNull
    @Column(name = "nombre", length = 100)
    private String nombre;

    @NotNull
    @Column(name = "grupo_muscular", length = 100)
    private String grupoMuscular;

    @NotNull
    @Column(name = "marca", length = 100)
    private String marca;

    @NotNull
    @Column(name = "modelo", length = 100)
    private String modelo;

    @NotNull
    @Column(name = "numero_serie", length = 100)
    private String numeroSerie;

    @NotNull
    @Column(name = "estado_funcional")
    @Enumerated(EnumType.STRING)
    private estadoFuncional estado = estadoFuncional.disponible;

    enum estadoFuncional{
        disponible,
        en_reparacion,
        fuera_de_servicio
    }
}
