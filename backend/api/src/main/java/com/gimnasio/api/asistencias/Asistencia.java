package com.gimnasio.api.asistencias;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clientes.Cliente;
import com.gimnasio.api.clientes.Invitado;
import com.gimnasio.api.sucursales.Sucursal;

import com.gimnasio.api.trabajadores.Trabajador;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity 
@Table (name="asistencias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Asistencia {

    @EqualsAndHashCode.Include
    @Id 
    @Column(name="id_asistencia", nullable=false)
    @GeneratedValue (strategy= GenerationType.IDENTITY)
    private Integer idAsistencia;


    @OneToMany()
    private List<Trabajador> trabajador = new ArrayList<>();

    @NotNull 
    @ManyToOne
    @JoinColumn (name="sucursal_id")
    @JsonBackReference ("sucursal-asistencia")
    private Sucursal sucursal;

    //mapeado
    @NotNull 
    @ManyToOne
    @JoinColumn (name="cliente_id")
    @JsonBackReference("cliente-asistencia")
    private Cliente cliente;

    //mapeado
    @NotNull 
    @ManyToOne
    @JoinColumn (name="invitado_id")
    @JsonBackReference("invitado-asistencia")
    private Invitado invitado;

    @NotNull 
    @Column (nullable=false)
    private LocalDateTime fecha;

    @NotNull 
    @Column (name="hora_entrada", nullable=false)
    private LocalDateTime horaEntrada;

    @Size (max=32)
    @Column (name="codigo_entrada", length=32)
    private String codigoEntrada;

}
