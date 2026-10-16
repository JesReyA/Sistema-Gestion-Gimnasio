package com.gimnasio.api.eventos;




import com.gimnasio.api.clientes.Cliente;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class InscripcionEventoId implements Serializable {

    @Column(name = "cliente_id")
    private Cliente cliente;

    @Column(name = "evento_id")
    private Evento evento;

    public InscripcionEventoId() {
    }

    public InscripcionEventoId(Cliente cliente, Evento evento) {
        this.cliente = cliente;
        this.evento = evento;
    }


    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        InscripcionEventoId that = (InscripcionEventoId) o;
        return Objects.equals(cliente, that.cliente) && Objects.equals(evento, that.evento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cliente, evento);
    }
}
