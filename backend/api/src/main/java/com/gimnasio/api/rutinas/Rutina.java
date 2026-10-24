package com.gimnasio.api.rutinas;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="rutinas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Rutina {
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rutina")
    private Integer idRutina;

    @Column(name = "nombre", length = 100)
    @NotNull
    private String nombre;

    @Column(name = "objetivo", length = 100)
    @NotNull
    private String objetivo;

    @Column(name = "nivel", length = 50)
    @NotNull
    private String nivel;

    //mapeada
    @OneToMany(mappedBy = "rutina")
    @JsonManagedReference("rutina-clienteRutina")
    private List<ClienteRutina> clienteRutina = new ArrayList<>();

    //mapeada
    @OneToMany(mappedBy = "rutina")
    @JsonManagedReference("rutina-rutinaEjercicio")
    private List<RutinaEjercicio> rutinaEjercicio = new ArrayList<>();


}
