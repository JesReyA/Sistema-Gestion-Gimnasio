import { fetchWithAuth } from "../api-client";
import { cache } from "react";

export type AccesoQr = {
    nombreUsuario : string
    codigoAccesoQr : string
}

export const getQr = cache(() =>
    fetchWithAuth<AccesoQr>("/api/clientes/qr"))