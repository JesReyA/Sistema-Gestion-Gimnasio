package com.gimnasio.api.auth;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gimnasio.api.auth.dto.AuthResponse;
import com.gimnasio.api.auth.dto.LoginRequest;
import com.gimnasio.api.auth.dto.RegistroRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController 
@RequestMapping ("/api/auth")
public class AuthController {

    public AuthController(){
    }

    //Por ahora
    @PostMapping("login")
    public ResponseEntity<AuthResponse> login (@RequestBody LoginRequest){
        
    }
    

    //Por ahora
    @PostMapping("registro")
    public ResponseEntity<AuthResponse> registro(@RequestBody RegistroRequest){

    }

}
