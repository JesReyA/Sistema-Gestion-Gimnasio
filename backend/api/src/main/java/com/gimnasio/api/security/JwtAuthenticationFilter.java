package com.gimnasio.api.security;

import java.io.IOException;

import org.jspecify.annotations.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component 
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    private final HandlerExceptionResolver handlerExceptionResolver;

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    // Constructor de la clase
    public JwtAuthenticationFilter( JwtService jwtService, UserDetailsService userDetailsService,HandlerExceptionResolver handlerExceptionResolver) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.handlerExceptionResolver = handlerExceptionResolver;
    }
    

    // Método incluido con OncePerRequestFilter
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull  HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        // Cuando se hace una petición, junto con el token se intercepta el header de Authorization, 
        // el cual es parte de una estructura típica de peticiones HTTP, este se intercepta con getHeader
        
        // Authorization es la cabecera estándar de HTTP para enviar credenciales
        final String authHeader =  request.getHeader("Authorization");

        // Identifica si el encabezado buscado presenta un valor o si dicho valor empieza con Bearer, lo cual significa "Portador", básicamente transporta el JWT token
        // Si alguno de estos campos no existe o no inicia con eso, se inicia la petición ya que el cliente estaría en mandando una petición pública
        //Es decir, de tipo login / registro, y en este caso no habría token que verificar

        // Authorization: Bearer token...
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            // Llama al siguente filtro o si es el último, que se haga la acción necesaria después de los filtros
            filterChain.doFilter(request, response);
            return;
        }

        try{
            // Obtiene un substring sin la palabra Bearer y el espacio, para obtener el token que viene en la petición
            final String jwt = authHeader.substring(7);

            // Obtiene el username(correo) del token jwt usando el service
            final String userEmail = jwtService.extractUsername(jwt);
            
            // ContextHolder almacena los detalles de seguridad (la información está vinculada a un hilo),
            //  getContext accede al contexto de seguridad actual, actua como un contenedor para esta, 
            // getAuthentication recupera el objeto authentication del contexto  
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if(userEmail != null && authentication == null){
                // Localiza el usuario por su Username
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

                // Se evalua si el token es válido para el usuario
                if(jwtService.isTokenValid(jwt, userDetails)){
                    // Se crea un objeto para transportar las credenciales del usuario (normalmente usuario y contraseña)
                    // En este caso los detalles del usuario, la contraseña nula ya que con el token ya se autenticó y los roles de dicho usuario
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                    // Crea un WebAuthenticationDetails que extrae la IP y session Id de la request y lo almacena como información adicional
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    
                    // Ingresa el objeto de autenticacion de spring boot creado al ContextHolder para almacenar el usuario que ya está autenticado, autorizado e ingresó
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request, response);
        }catch(Exception exception){    
            // Obtiene la excepción e intenta devolver un mensaje de error específico para el tipo de error
            // Se usa para mandar la excepción a un manejador de excepciones global 
            handlerExceptionResolver.resolveException(request, response, null, exception);
        }
    } 
}