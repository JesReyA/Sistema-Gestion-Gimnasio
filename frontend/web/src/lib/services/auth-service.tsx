import { body } from "motion/react-client";
import { fetchWithAuth } from "../api-client";
import { cache } from "react";

export type LoginCredentials = {
    email : string 
    password: string
}

export type AuthResponse = {
    accessToken : string
    tipoToken : string
    expiraEn : number    // milisegundos

    usuario:{
        nombres: string
        apellidoPaterno : string
        apellidoMaterno : string | null
        email: string
        roles : string[] 
    }
}

export type RegistroRequest = {
    nombres : string
    apellidoPaterno: string
    apellidoMaterno: string
    email: string
    password: string
}

// Recibe el correo y contraseña, se usa LoginCredentials para que se pasen solo los datos de esa clave y valor
export async function loginWithApi(credentials: LoginCredentials) {
    // Hace un POST al backend con credenciales en json
    const res = await fetchWithAuth<AuthResponse>('/api/auth/login', {
        method: 'POST', 
        body : JSON.stringify(credentials),
        auth: false
    })

    return res
    
}

// Obtiene el resumen del usuario desde el apartado usuario de Auth
export type ResumenUsuario = AuthResponse["usuario"]

export async function registroWithApi(data:RegistroRequest) {
    return fetchWithAuth<ResumenUsuario>("/api/auth/registro", {
        method:"POST",
        body: JSON.stringify(data),
        auth: false,
    })
}

export const getMe = cache(() =>
    fetchWithAuth<ResumenUsuario>("/api/auth/me")
)