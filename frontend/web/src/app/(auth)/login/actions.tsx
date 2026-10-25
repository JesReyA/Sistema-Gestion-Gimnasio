"use server"    // server action, se ejecutan en el servidor

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { loginWithApi } from "@/lib/services/auth-service"
import { ApiError } from "@/lib/api-error"

// puede devolver un objeto con un error opcional o un null, el cual es el estado inicial sin error
export type LoginState = {error?: string; email?: string} | null

export async function loginAction(
    prevState: LoginState,
    formData : FormData): Promise<LoginState>{  // Recibe los campos desde un formulario y promete devolver un estado, o nada si se redirige
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ??  "")

    if (!email || !password){
        return {error: "Ingresa tu correo y contraseña", email}
    }

    let destino = "/home"

    try{
        // se realiza la llamada al back y espera su respuesta
        const data = await loginWithApi({email, password})

        const cookie = await cookies()

        // Guarda una cookie con el JWT
        cookie.set("session_token", data.accessToken, {
            httpOnly: true,  // el navegador no puede leerla
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",  // no se manda en peticiones de otros sitios
            path: "/",   // todo el sitio
            maxAge: Math.floor(data.expiraEn / 1000),   //se obtiene la duracion en segundos, la cookie expira junto con el token
        })

        // Busca si el rol es cualquiera diferente a Cliente, es decir, trabajador
        const esTrabajador = data.usuario.roles.some((r) => r !== "ROLE_CLIENTE")
        // Si es trabajador lo manda a dashboard, sino a home
        destino = esTrabajador ? "/dashboard" : "/home"
    }catch(e){
        if(e instanceof ApiError) return {error: e.message, email} // si es una ApiError, el back respondió con error y develve su mensaje
        throw e  // Se lanza una excepcion  sino es parte de ApiError
    }

    // se redirige al destino
    redirect(destino)

}