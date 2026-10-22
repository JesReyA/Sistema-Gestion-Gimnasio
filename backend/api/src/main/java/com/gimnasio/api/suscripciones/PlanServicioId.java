package com.gimnasio.api.suscripciones;

import jakarta.persistence.Embeddable;

@Embeddable 
public class PlanServicioId {

    private Integer planId;

    private Integer servicioId;


    public PlanServicioId() {
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((planId == null) ? 0 : planId.hashCode());
        result = prime * result + ((servicioId == null) ? 0 : servicioId.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        PlanServicioId other = (PlanServicioId) obj;
        if (planId == null) {
            if (other.planId != null)
                return false;
        } else if (!planId.equals(other.planId))
            return false;
        if (servicioId == null) {
            if (other.servicioId != null)
                return false;
        } else if (!servicioId.equals(other.servicioId))
            return false;
        return true;
    }

    public Integer getPlanId() {
        return planId;
    }

    public void setPlanId(Integer planId) {
        this.planId = planId;
    }

    public Integer getServicioId() {
        return servicioId;
    }

    public void setServicioId(Integer servicioId) {
        this.servicioId = servicioId;
    }


    
    
}
