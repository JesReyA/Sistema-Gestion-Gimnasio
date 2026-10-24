package com.gimnasio.api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration 
public class ApplicationConfig {

    // Se importa UserDetailService
    private final UserDetailsService userDetailsService;

    // Constructor
    public ApplicationConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    // BCrypt es el encoder de la contraseña, este método regresa un nuevo objeto de este
    // Convierte una contraseña en un hash, y ayuda a compararlos también

    // Se usará en el registro para hacer un hash de la contraseña y en el login, 
    // para comparar el hash de la contraseña que se entrega con el que se guardó en la base de datos
    @Bean 
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // Este el el objeto que llamará el AuthService cuando alguien inicie sesión
    // El service llama a este y usa .authenticate(correo, contraseña)
    // El manager se lo pasa al provider, si todo está bien, se genera el JWT 
    @Bean 
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }

    // Comprueba las credenciales
    // Usa userDetailsService (en nuestro caso se pasará el custom cuando se llame)
    // El password encoder servirá para comparar los hash de las contraseñas
    @Bean 
    AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
}
