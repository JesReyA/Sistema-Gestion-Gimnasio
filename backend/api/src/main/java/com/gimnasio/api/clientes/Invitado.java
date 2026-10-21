package com.gimnasio.api.clientes;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

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

@Entity
@Table (name = "invitados")
public class Invitado {

    public Invitado() {
    }

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

    @OneToMany (mappedBy="invitado")
    @JsonManagedReference 
    private List<ClienteInvitado> clientesInvitados = new ArrayList<>();

    public Integer getIdInvitado() {
        return idInvitado;
    }

    public void setIdInvitado(Integer idInvitado) {
        this.idInvitado = idInvitado;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public String getNumeroCelular() {
        return numeroCelular;
    }

    public void setNumeroCelular(String numeroCelular) {
        this.numeroCelular = numeroCelular;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public List<ClienteInvitado> getClientesInvitados() {
        return clientesInvitados;
    }

    public void setClientesInvitados(List<ClienteInvitado> clientesInvitados) {
        this.clientesInvitados = clientesInvitados;
    }

    
    
}
