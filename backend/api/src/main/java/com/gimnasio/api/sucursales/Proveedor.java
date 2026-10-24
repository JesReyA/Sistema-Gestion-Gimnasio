package com.gimnasio.api.sucursales;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "proveedores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Proveedor {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proveedor")
    private Integer idProveedor;

    @NotNull
    @Column(name = "nombre", length = 100)
    private String nombre;

    @Column(name = "apellido_paterno", length = 100)
    private String apellidoPaterno;

    @Column(name = "apellido_materno", length = 100)
    private String apellidoMaterno;

    @NotNull
    @Column(name = "razon_social", length = 100)
    private String razonSocial;

    @NotNull
    @Column(name = "tipo_servicio")
    private String tipoServicio;

    @Lob
    @Column(name = "descripcion_servicio", columnDefinition = "text")
    private String descripcionServicio;

    //mapeada
    @OneToMany(mappedBy = "proveedor")
    @JsonManagedReference("proovedor-SucursalProveedor")
    private List<SucursalProveedor> sucursalProveedor = new ArrayList<>();

}
