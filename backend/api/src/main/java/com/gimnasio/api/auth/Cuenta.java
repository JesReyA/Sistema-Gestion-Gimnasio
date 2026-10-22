package com.gimnasio.api.auth;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.bitacora.Bitacora;
import com.gimnasio.api.clientes.Cliente;
import com.gimnasio.api.trabajadores.Trabajador;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "cuentas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Cuenta {
    
    @Id
    @EqualsAndHashCode.Include
    @Column(name = "id_cuenta", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment
    private Integer idCuenta;

    @JsonManagedReference("cuenta-bitacora")
    @OneToMany(mappedBy = "cuenta")
    private List<Bitacora> bitacora = new ArrayList<>();

    //mapeada
    @OneToOne 
    @JoinColumn (name ="cliente_id", nullable = true)
    @JsonBackReference("cliente-cuenta")
    private Cliente cliente;

    //mapeada
    @OneToOne 
    @JoinColumn (name ="trabajador_id", unique = true)
    @JsonBackReference("trabajador-cuenta")
    private Trabajador trabajador;

    @NotNull 
    @NotBlank 
    @Column (name="correo_electronico", nullable=false, length = 150, unique = true)
    private String correoElectronico;

    @NotNull
    @NotBlank
    @Column (name="contrasena_hash", nullable=false, length = 255)
    private String contrasena;


    public enum estadoCuenta{
        activa, 
        inactiva, 
        suspendida,
        pendiente
    }

    @NotNull
    @Column (nullable=false)
    private estadoCuenta estado = estadoCuenta.pendiente;


}
