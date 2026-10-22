package com.gimnasio.api.bitacora;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.auth.Cuenta;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "bitacora")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Bitacora {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id_bitacora", columnDefinition = "BIGINT UNSIGNED")
    private Long idBitacora;

    @ManyToOne
    @JsonBackReference("cuenta-bitacora")
    @JoinColumn(name = "cuenta_id", nullable = false)
    private Cuenta cuenta;

    @NotNull
    @Column(name = "fecha")
    private LocalDateTime fecha;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(name = "accion")
    private accionBitacora accion;

    @NotNull
    @Column(name = "entidad", length = 50)
    private String entidad;

    @NotNull
    @Column(name = "entidad_id")
    private Integer entidadId;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private Map<String, Object> detalle;

    private enum accionBitacora{
        codigo_regenerado,
        rol_cambiado,
        cuenta_estado_cambiado,
        suscripcion_creada,
        suscripcion_estado_cambiado,
        pago_registrado,
        pago_marcado_pagado,
        sesion_cancelada,
        evento_eliminado
    }

}
