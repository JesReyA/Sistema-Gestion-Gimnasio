package com.gimnasio.api.nutricion;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "planes_alimentacion")
public class PlanAlimentacion {


    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id_plan")
    private Integer idPlan;

    //cliente id
    //nutriologo id

    @NotNull
    @Column(name = "tipo_comida")
    private tipoComida comida;

    @NotNull
    @Lob
    @Column(name = "recomendacion", columnDefinition = "text")
    private String recomendacion;

    @Lob
    @Column(name = "razones", columnDefinition = "text")
    private String razones;


    private enum tipoComida{
        desayuno,
        comida,
        cena,
        colacion
    }

    public PlanAlimentacion() {
    }

    public Integer getIdPlan() {
        return idPlan;
    }

    public void setIdPlan(Integer idPlan) {
        this.idPlan = idPlan;
    }

    public String getRazones() {
        return razones;
    }

    public void setRazones(String razones) {
        this.razones = razones;
    }

    public String getRecomendacion() {
        return recomendacion;
    }

    public void setRecomendacion(String recomendacion) {
        this.recomendacion = recomendacion;
    }

    public tipoComida getComida() {
        return comida;
    }

    public void setComida(tipoComida comida) {
        this.comida = comida;
    }
}
