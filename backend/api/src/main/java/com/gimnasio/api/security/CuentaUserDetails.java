package com.gimnasio.api.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.gimnasio.api.common.enums.EstadoCuenta;

import java.util.Collection;
import java.util.List;

public class CuentaUserDetails implements UserDetails{

    private final Integer idCuenta;

    private final String correo;

    private final String passwordHash;

    private final EstadoCuenta estado;

    private final List<String> roles;


    public CuentaUserDetails(Integer idCuenta, String correo, String passwordHash, EstadoCuenta estado, List<String> roles) {
        this.idCuenta = idCuenta;
        this.correo = correo;
        this.passwordHash = passwordHash;
        this.estado = estado;
        // Se busca que la lista de roles original no se pueda modificar
        this.roles = List.copyOf(roles);
    }

    // Recorre la lista de roles que se le da, y convierte cada uno en un SimpleGrantedAuthority, al finalizar, crea una lista de todos los simple granted authority y la regresa
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(SimpleGrantedAuthority::new).toList();
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return correo;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return estado == EstadoCuenta.activa || estado == EstadoCuenta.pendiente;
    }

    public Integer getIdCuenta() {
        return idCuenta;
    }
}
