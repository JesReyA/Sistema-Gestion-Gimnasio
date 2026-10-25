package com.gimnasio.api.suscripciones.feature.service;


import com.gimnasio.api.clientes.Cliente;
import com.gimnasio.api.clientes.ClienteRepository;
import com.gimnasio.api.pagos.Pago;
import com.gimnasio.api.suscripciones.feature.model.SuscripcionRequest;
import com.gimnasio.api.suscripciones.feature.model.SuscripcionResume;
import com.gimnasio.api.suscripciones.feature.repository.SuscripcionRepository;
import com.gimnasio.api.suscripciones.persistance.PlanSuscripcion;
import com.gimnasio.api.suscripciones.persistance.PlanSuscripcionRepository;
import com.gimnasio.api.suscripciones.persistance.Suscripcion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class SuscripcionService {

    //campo para recabar datos del cliente
    private final ClienteRepository clienteRepository;
    private final PlanSuscripcionRepository planSuscripcionRepository;
    private final SuscripcionRepository suscripcionRepository;

    public SuscripcionService(ClienteRepository clienteRepository, PlanSuscripcionRepository planSuscripcionRepository, SuscripcionRepository suscripcionRepository) {
        this.clienteRepository = clienteRepository;
        this.planSuscripcionRepository = planSuscripcionRepository;
        this.suscripcionRepository = suscripcionRepository;
    }

    public SuscripcionResume crearSuscripcion(SuscripcionRequest suscripcion){

        Cliente cliente = clienteRepository.findByCorreoElectronico(suscripcion.getCorreoCliente())
                .orElseThrow(()-> new RuntimeException("Cliente no encontrado"));


        if (suscripcionRepository.existByCliente(cliente)) {
            throw new IllegalStateException("El cliente ya cuenta con una suscripción activa");
        }

        //Buscar el plan de suscripcion por su nombre
        PlanSuscripcion planSuscripcion = planSuscripcionRepository.findByNombre(suscripcion.getNombrePlanSuscripcion())
                .orElseThrow(()-> new RuntimeException("Plan de suscripcion no encontrado"));

        //fecha de inicio de suscripcion
        LocalDate fechaInicio = LocalDate.now();
        LocalDate fechaFinalizacionSuscripcion = fechaInicio.plusDays(31);

        //Crear nueva instancia de suscripcion
        Suscripcion nuevaSuscripcion = new Suscripcion();
        nuevaSuscripcion.setCliente(cliente);
        nuevaSuscripcion.setPlanSuscripcion(planSuscripcion);
        nuevaSuscripcion.setFechaInicio(fechaInicio);
        nuevaSuscripcion.setFechaFin(fechaFinalizacionSuscripcion);

        Suscripcion suscripcionGuardada = suscripcionRepository.save(nuevaSuscripcion);

        return new SuscripcionResume(suscripcionGuardada.getFechaInicio(),
                suscripcionGuardada.getFechaFin(),
                suscripcionGuardada.getPlanSuscripcion(),
                suscripcionGuardada.getEstado());
    }

}
