package com.gimnasio.api.suscripciones.feature.controller;


import com.gimnasio.api.suscripciones.feature.model.SuscripcionRequest;
import com.gimnasio.api.suscripciones.feature.model.SuscripcionResume;
import com.gimnasio.api.suscripciones.feature.service.SuscripcionService;
import com.gimnasio.api.suscripciones.persistance.Suscripcion;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/suscripcion")
public class SuscripcionController {

    private final SuscripcionService suscripcionService;

    public SuscripcionController(SuscripcionService suscripcionService) {
        this.suscripcionService = suscripcionService;
    }

    //registrar suscripcion de usuario
    @PostMapping("/crear-suscripcion")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SuscripcionResume> crearNuevaSuscripcion(@Valid @RequestBody SuscripcionRequest suscripcionNueva){
        SuscripcionResume resumenDeCreacionUsuario = suscripcionService.crearSuscripcion(suscripcionNueva);
        return ResponseEntity.ok(resumenDeCreacionUsuario);
    }

    //listar todas las suscripciones de un determinado cliente
    @PostMapping("/listar-suscripciones")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Suscripcion>> listarSuscripciones(@Valid @RequestBody SuscripcionRequest suscripcion){
        //lista Suscripciones
        List<Suscripcion> listaSuscripciones = suscripcionService.getAllSuscripciones(suscripcion);
        return ResponseEntity.ok(listaSuscripciones);
    }

    //modificar tipo de suscripcion

    //eliminar suscripcion de usuario

    //obtener datos de suscripcion de usuario



}
