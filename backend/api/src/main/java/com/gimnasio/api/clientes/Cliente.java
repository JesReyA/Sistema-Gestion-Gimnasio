package com.gimnasio.api.clientes;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;


@Entity 
@Table (name = "clientes")
public class Cliente {

    public Cliente() {
    }

    @Id  
    @GeneratedValue (strategy = jakarta.persistence.GenerationType.IDENTITY)  // Auto-increment
    @Column (name = "id_cliente", nullable = false)
    private Integer idCliente; 

    @NotNull 
    @NotBlank
    @Column (nullable=false, length = 100)
    private String nombres;

    @NotNull 
    @NotBlank
    @Column (name = "apellido_paterno", nullable=false, length = 100)
    private String apellidoPaterno;

    @Column (name = "apellido_materno", nullable=true, length = 100)
    private String apellidoMaterno;

    @NotNull 
    @NotBlank
    @Size (min = 18, max = 18, message = "CURP debe tener exactamente 18 caracteres")
    @Column (nullable=false, length = 18, unique = true)
    private String curp;

    @NotNull 
    @NotBlank
    @Column (name ="numero_celular", nullable=false, length = 20)
    private String numeroCelular;

    @NotNull 
    @NotBlank
    @Email (message = "El correo electrónico no es válido")
    @Column (name = "correo_electronico", nullable=false, length = 150, unique = true)
    private String correoElectronico;

    @NotNull 
    @NotBlank
    @Column (nullable=false)
    private LocalDate fechaNacimiento;

    @NotNull 
    @NotBlank
    @Column (name ="codigo_acceso", nullable=false, length = 32, unique = true)
    private String codigoAcceso;

    @Column (name = "estatura_m")
    @Digits (integer = 1, fraction = 2, message = "La estatura debe escribirse en metros y con dos decimales")
    @Positive
    @DecimalMin (value = "0.50", message = "La estatura debe ser mayor a 0.5 metros")
    @Max (value = 3, message = "La estatura debe ser menor a 3 metros")
    private BigDecimal estaturaMetros;

    @Column (name = "peso_objetivo_kg")
    @Digits (integer = 3, fraction = 2, message = "El peso objetivo debe escribirse en kilogramos y con dos decimales")
    @Positive
    @Min (value = 1, message = "El peso objetivo debe ser mayor a 1 kg")
    @Max (value = 800, message = "El peso objetivo debe ser menor a 800 kg")
    private BigDecimal pesoObjetivoKg;

    @OneToMany (mappedBy = "cliente")
    @JsonManagedReference 
    private List<ClienteInvitado> clientesInvitados;

    public Integer getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Integer idCliente) {
        this.idCliente = idCliente;
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

    public String getCurp() {
        return curp;
    }

    public void setCurp(String curp) {
        this.curp = curp;
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

    public String getCodigoAcceso() {
        return codigoAcceso;
    }

    public void setCodigoAcceso(String codigoAcceso) {
        this.codigoAcceso = codigoAcceso;
    }

    public BigDecimal getEstaturaMetros() {
        return estaturaMetros;
    }

    public void setEstaturaMetros(BigDecimal estaturaMetros) {
        this.estaturaMetros = estaturaMetros;
    }

    public BigDecimal getPesoObjetivoKg() {
        return pesoObjetivoKg;
    }

    public void setPesoObjetivoKg(BigDecimal pesoObjetivoKg) {
        this.pesoObjetivoKg = pesoObjetivoKg;
    }

    public List<ClienteInvitado> getClientesInvitados() {
        return clientesInvitados;
    }

    public void setClientesInvitados(List<ClienteInvitado> clientesInvitados) {
        this.clientesInvitados = clientesInvitados;
    }
  
}
