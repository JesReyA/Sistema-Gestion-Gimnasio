package com.gimnasio.api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// Indica que la clase es de configuración
@Configuration 
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // Constructor
    public SecurityConfig(AuthenticationProvider authenticationProvider,
            JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))

                // 1. Make the session stateless for JWT
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth
                        // 2. Replace AntPathRequestMatcher with plain strings (fixes the 2 red errors)
                        .requestMatchers("/auth/login","/auth/refresh","/auth/recuperar-password", "/auth/restablecer-password", "/h2-console/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/registro").hasRole("CLIENTE")

                        //cambio de contraseña y consulta de datos del cliente
                        .requestMatchers(HttpMethod.PATCH, "/cliente/perfil/password").hasRole("CLIENTE")
                        .requestMatchers(HttpMethod.GET, "/cliente/**").hasRole("CLIENTE")
                        .requestMatchers(HttpMethod.POST, "/cliente/**").hasRole("CLIENTE")

                        //consulta de eventos y sesiones
                        .requestMatchers(HttpMethod.GET, "/sesiones").hasRole("CLIENTE")
                        .requestMatchers(HttpMethod.POST, "/eventos").hasRole("CLIENTE")

                        //incripcion a eventos y sesiones por parte del cliente
                        .requestMatchers(HttpMethod.GET, "/cliente/eventos").hasRole("CLIENTE")
                        .requestMatchers(HttpMethod.POST, "/cliente/sesiones/**").hasRole("CLIENTE")

                        //Consultar clases y eventos a las que el usuario está inscrito
                        .requestMatchers(HttpMethod.GET, "/cliente/eventos/**").hasRole("CLIENTE")
                        .requestMatchers(HttpMethod.POST, "/cliente/sesiones/**").hasRole("CLIENTE")

                        //borrar inscripcion a clases y eventos
                        .requestMatchers(HttpMethod.DELETE, "/cliente/eventos/**").hasRole("CLIENTE")
                        .requestMatchers(HttpMethod.DELETE, "/cliente/sesiones/**").hasRole("CLIENTE")

                        //observar las asistencias del cliente
                        .requestMatchers(HttpMethod.GET, "/cliente/asistencias").hasRole("CLIENTE")

                        //consultar aforo de gimnasio
                        .requestMatchers(HttpMethod.GET, "/sucursales/**/aforo").hasRole("ADMINISTRADOR")

                        //Observar invitados
                        .requestMatchers(HttpMethod.GET, "/cliente/invitados").hasRole("CLIENTE")

                        //TRABAJADORES
                        .anyRequest().authenticated()
                )

                // 3. Connect your injected AuthenticationProvider and JwtAuthenticationFilter
                .authenticationProvider(authenticationProvider)
                // falta agregar el jwtauthenticationfilter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }



}
