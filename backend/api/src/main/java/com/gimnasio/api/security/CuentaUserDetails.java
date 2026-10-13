package com.gimnasio.api.security;

import org.springframework.security.core.GrantedAuthority;
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
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
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
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    public Integer getIdCuenta() {
        return idCuenta;
    }

    
}
