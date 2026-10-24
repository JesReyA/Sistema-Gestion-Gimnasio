package com.gimnasio.api.suscripciones.feature.service;


import com.gimnasio.api.clientes.Cliente;
import com.gimnasio.api.clientes.ClienteRepository;
import com.gimnasio.api.suscripciones.feature.model.SuscripcionRequest;
import com.gimnasio.api.suscripciones.feature.model.SuscripcionResume;
import com.gimnasio.api.suscripciones.persistance.PlanSuscripcion;
import com.gimnasio.api.suscripciones.persistance.Suscripcion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class SuscripcionService {

    //campo para recabar datos del cliente
    private final ClienteRepository clienteRepository;

    public SuscripcionService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public SuscripcionResume crearSuscripcion(SuscripcionRequest suscripcion){
        //Lista de suscripciones asociadas al cliente

        List<Suscripcion> listaDeSuscripciones = new ArrayList<>();

        //Buscar cliente al cual se le va a relacionar una suscripcion
        Cliente clienteNuevo = clienteRepository.findByCorreoElectronico(suscripcion.getCorreoCliente())
                .orElseThrow(()-> new RuntimeException("cliente no encontrado"));

        //Buscar el plan de suscripcion por su nombre

        //Crear nueva instancia de suscripcion
        Suscripcion nuevaSuscripcion = new Suscripcion();
        nuevaSuscripcion.setCliente(clienteNuevo);

        return null;
    }

}
