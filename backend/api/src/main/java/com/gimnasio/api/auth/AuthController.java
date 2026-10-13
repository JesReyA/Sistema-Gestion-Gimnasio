package com.gimnasio.api.auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;


@RestController 
@RequestMapping ("/api/auth")
public class AuthController {

    public AuthController(){

    }

    //Por ahora
    @PostMapping("login")
    public String login(){
        return "Registrate lol";
    }

    //Por ahora
    @PostMapping("registro")
    public String registro(){
        return "Registrate lol";
    }

}
