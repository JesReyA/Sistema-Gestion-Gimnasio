package com.gimnasio.api.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;;

@Service 
public class JwtService {

    @Value("${security.jwt.secret-key}")
    private String secretKey; 

    @Value("${security.jwt.expiration-time}")
    private Long jwtExpiration;

    @Value("${security.jwt.refresh-expiration-time}") 
    private long refreshExpiration;
    

    // Recibe el token de JWT y extrae el username mediante otro método dentro de la clase y uno de JWT
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    // Método de tipo genérico que recibe el token y una función para obtener/almacenar un claim del token, 
    // además, se usa una función para obtener todos los claims
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Metodo para generar un Token
    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }

    // Método sobrecargado, se pueden agregar claims extras
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails){
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    // Getter para la fecha de expiración debido a que es private
    public long getExpirationTime(){
        return jwtExpiration;
    }

    // Crea un objeto Jwts (token) basado en los exta claims, el username(correo), la fecha de creacion y de expiración además de el algoritmo de firma
    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration){
        return Jwts
        .builder()
        .setClaims(extraClaims)
        .setSubject(userDetails.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis()+ expiration))
        .signWith(getSignInKey(), SignatureAlgorithm.HS256)
        .compact();
    }

    // Extrae el username del token, y compara si es igual al del UserDetails, 
    // además, revisa si el token sigue válido por tiempo
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    //Usa la expiración del token y compara si la fecha ocurrió antes de la fecha actual, 
    // si lo es regresa true (expirado), sino false (vigente)
    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    // Mediante claims, extrae la fecha de expiración del token
    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    // Obtiene los claims del token y construye un objeto con .build()
    private Claims extractAllClaims(String token){
        return Jwts
        .parserBuilder()
        .setSigningKey(getSignInKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
    }

    // Key representa una llave criptográfica, la cual contiene bytes puros 
    // con especificaciones matematicas para algoritmos de encriptación

    private Key getSignInKey(){
        // Lee la llave secreta y la decodifica para convertirla en un arreglo de bytes
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);

        // Usando los bytes decodificados, los convierte en un objeto Key 
        // seguro y optimizado para algoritmos HMAC como HS256, 
        // además, revisa la longitud de la llave secreta (32bits)
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
