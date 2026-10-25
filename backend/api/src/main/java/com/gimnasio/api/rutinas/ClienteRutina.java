package com.gimnasio.api.rutinas;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gimnasio.api.clientes.Cliente;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "clientes_rutinas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ClienteRutina {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cliente_rutina")
    private Integer idClienteRutina;

    //mapeada
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonBackReference("cliente-clienteRutina")
    private Cliente cliente;

    //mapeada
    @ManyToOne
    @JsonBackReference("rutina-clienteRutina")
    @JoinColumn(name = "rutina_id")
    private Rutina rutina;

    @Column(name = "fecha_asignacion", nullable = false)
    private LocalDate fechaAsignacion;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

}

