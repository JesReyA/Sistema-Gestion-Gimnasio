package com.gimnasio.api.suscripciones.feature.controller;


import com.gimnasio.api.security.CuentaUserDetails;
import com.gimnasio.api.suscripciones.feature.model.SuscripcionRequest;
import com.gimnasio.api.suscripciones.feature.model.SuscripcionResponse;
import com.gimnasio.api.suscripciones.feature.model.SuscripcionResume;
import com.gimnasio.api.suscripciones.feature.service.SuscripcionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class SuscripcionController {

    private final SuscripcionService suscripcionService;

    public SuscripcionController(SuscripcionService suscripcionService) {
        this.suscripcionService = suscripcionService;
    }

    //registrar suscripcion de usuario
    public ResponseEntity<SuscripcionResponse> crearNuevaSuscripcion(@Valid @RequestBody SuscripcionRequest suscripcionNueva){
        SuscripcionResume resumenDeCreacionUsuario = suscripcionService.crearSuscripcion(suscripcionNueva);



        return null;
    }


    //modificar tipo de suscripcion

    //eliminar suscripcion de usuario

    //obtener datos de suscripcion de usuario


    public ResponseEntity<SuscripcionResponse> getSuscripcionUsuario(@AuthenticationPrincipal CuentaUserDetails usuario){


    }

    //etc, a la meme

}
