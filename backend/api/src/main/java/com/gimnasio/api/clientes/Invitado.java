package com.gimnasio.api.clientes;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import com.gimnasio.api.asistencias.Asistencia;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table (name = "invitados")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Invitado {

    @EqualsAndHashCode.Include
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)  // Auto-increment
    @Column (name = "id_invitado", nullable=false)
    private Integer idInvitado;

    @NotBlank 
    @NotNull 
    @Column (nullable=false, length = 100)
    private String nombres;
    
    @NotBlank 
    @NotNull 
    @Column (name ="apellido_paterno", nullable=false, length = 100)
    private String apellidoPaterno;

    @Column (name ="apellido_materno",nullable=true,  length = 100)
    private String apellidoMaterno;

    @NotNull 
    @NotBlank
    @Column (name ="numero_celular", nullable=false, length = 20)
    private String numeroCelular;

    @NotNull 
    @NotBlank
    @Email (message = "El correo electrónico no es válido")
    @Column (name = "correo_electronico", nullable=false, length = 150)
    private String correoElectronico;

    @NotNull 
    @Column (name="fecha_nacimiento", nullable=false)
    private LocalDate fechaNacimiento;

    //mapeado
    @NotNull
    @OneToMany (mappedBy="invitado")
    @JsonManagedReference("invitado-clienteInvitado")
    private List<ClienteInvitado> clienteInvitado = new ArrayList<>();

    @OneToMany (mappedBy="invitado")
    @JsonManagedReference("invitado-asistencia")
    private List<Asistencia> asistencia = new ArrayList<>();

}
