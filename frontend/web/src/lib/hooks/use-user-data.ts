'use client'

// Este es un hook, el cual permite mantener información y compartirla a ciertos puntos de la página

import useSWR from "swr";
import type { ResumenUsuario } from "../services/auth-service";
import type { AccesoQr } from "../services/cliente-service";

// Función que hace una llamada a la url usando igual la session token
const fetcher = async (url:string) => {
    const res = await fetch(url)

    // Si se redirige, es que la sesión ya caducó
    if (res.redirected){
        window.location.href =  "/login"
        throw new Error("Sesión expirada")
    }

    // Si se obtiene un error se lanza 
    if(!res.ok) throw new Error("No se pudo cargar")

    // Si nada de lo anterior pasó, se regresa la respuesta en JSON
    return res.json()
}

// Llama a la direccion donde se encuentra el url y la clave 

export const useMe = () => useSWR<ResumenUsuario>("/api/me", fetcher)

// Lo mismo de arriba pero al final, hace que no sea necesario volver a pedir los datos cada que se entra a esa pantalla

export const useAccesoQr = () => useSWR<AccesoQr>("/api/qr", fetcher, {revalidateOnFocus:false})