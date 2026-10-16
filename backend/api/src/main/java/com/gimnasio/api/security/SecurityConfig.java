package com.gimnasio.api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
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
                        .requestMatchers("/users/register", "/h2-console/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/users/profile").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/posts/mine").hasRole("USER")
                        .requestMatchers(HttpMethod.POST, "/posts/create").hasRole("USER")
                        .requestMatchers(HttpMethod.PUT, "/posts/**").hasRole("USER")
                        .requestMatchers(HttpMethod.DELETE, "/posts/**").hasAnyRole("USER", "ADMIN")
                        .anyRequest().authenticated()
                )

                // 3. Connect your injected AuthenticationProvider and JwtAuthenticationFilter
                .authenticationProvider(authenticationProvider)
                // falta agregar el jwtauthenticationfilter
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }



}
