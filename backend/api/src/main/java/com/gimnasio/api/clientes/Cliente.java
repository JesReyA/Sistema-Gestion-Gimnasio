package com.gimnasio.api.clientes;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gimnasio.api.asistencias.Asistencia;
import com.gimnasio.api.auth.Cuenta;
import com.gimnasio.api.clases.InscripcionClase;
import com.gimnasio.api.eventos.InscripcionEvento;
import com.gimnasio.api.nutricion.PlanAlimentacion;
import com.gimnasio.api.suscripciones.Suscripcion;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
import org.aspectj.lang.reflect.InitializerSignature;


@Entity 
@Table (name = "clientes")
public class Cliente {

    public Cliente() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment
    @Column(name = "id_cliente", nullable = false)
    private Integer idCliente;

    @NotNull
    @NotBlank
    @Column(nullable = false, length = 100)
    private String nombres;

    @NotNull
    @NotBlank
    @Column(name = "apellido_paterno", nullable = false, length = 100)
    private String apellidoPaterno;

    @Column(name = "apellido_materno", nullable = true, length = 100)
    private String apellidoMaterno;

    @NotNull
    @NotBlank
    @Size(min = 18, max = 18, message = "CURP debe tener exactamente 18 caracteres")
    @Column(nullable = false, length = 18, unique = true)
    private String curp;

    @NotNull
    @NotBlank
    @Column(name = "numero_celular", nullable = false, length = 20)
    private String numeroCelular;

    @NotNull
    @NotBlank
    @Email(message = "El correo electrónico no es válido")
    @Column(name = "correo_electronico", nullable = false, length = 150, unique = true)
    private String correoElectronico;

    @NotNull
    @Column(nullable = false)
    private LocalDate fechaNacimiento;

    @NotNull
    @NotBlank
    @Column(name = "codigo_acceso", nullable = false, length = 32, unique = true)
    private String codigoAcceso;

    @Column(name = "estatura_m")
    @Digits(integer = 1, fraction = 2, message = "La estatura debe escribirse en metros y con dos decimales")
    @Positive
    @DecimalMin(value = "0.50", message = "La estatura debe ser mayor a 0.5 metros")
    @Max(value = 3, message = "La estatura debe ser menor a 3 metros")
    private BigDecimal estaturaMetros;

    @Column(name = "peso_objetivo_kg")
    @Digits(integer = 3, fraction = 2, message = "El peso objetivo debe escribirse en kilogramos y con dos decimales")
    @Positive
    @Min(value = 1, message = "El peso objetivo debe ser mayor a 1 kg")
    @Max(value = 800, message = "El peso objetivo debe ser menor a 800 kg")
    private BigDecimal pesoObjetivoKg;


    @OneToMany(mappedBy = "cliente")
    @JsonManagedReference("cliente-inscripcionesClase")
    private List<InscripcionClase> inscripcionClases = new ArrayList<>();

    @OneToMany(mappedBy = "cliente")
    @JsonManagedReference("cliente-planAlimentacion")
    private List<PlanAlimentacion> planAlimentacion = new ArrayList<>();

    @OneToMany(mappedBy = "cliente")
    @JsonManagedReference("cliente-invitados")
    private List<ClienteInvitado> clientesInvitados = new ArrayList<>();

    @OneToOne(mappedBy = "cliente")
    @JsonManagedReference("cliente-trabajador")
    private Cuenta cuenta;

    @OneToMany(mappedBy = "cliente")
    @JsonManagedReference("cliente-suscripciones")
    private List<Suscripcion> suscripciones = new ArrayList<>();

    @OneToMany(mappedBy = "cliente")
    @JsonManagedReference("cliente-asistencias")
    private List<Asistencia> asistencias = new ArrayList<>();

    @OneToMany(mappedBy = "cliente")
    @JsonManagedReference("cliente-inscripcionesEvento")
    private List<InscripcionEvento> inscripcionesEvento = new ArrayList<>();

    @OneToMany(mappedBy = "cliente")
    @JsonManagedReference("cliente-medicionPeso")
    private List<MedicionPeso> medicionPeso = new ArrayList<>();


    //generar getters, setters y constructures una vez terminado
}
