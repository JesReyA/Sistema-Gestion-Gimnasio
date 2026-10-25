import "server-only"    //marca el archivo como exclusivo del servidor
import { cookies } from "next/headers"; 
import { redirect } from "next/navigation";
import { ApiError } from "./api-error";

// Obtiene la url del backend desde el .env
const API_URL = process.env.API_URL

// Recibe el endpoint y las opciones de fetch, las cuales las hace opcionales por ejemplo en un get
export async function fetchWithAuth<T>(endpoint: string, options: RequestInit & {auth?: boolean} = {}): Promise<T> {

    const {auth = true, ...fetchOptions} = options

    // Si no se agrega la API_URL se lanza un error
    if(!API_URL){
        throw new Error("Falta la variable de entorno API_URL")
    }

    // Lee la cookie de la sesión de quien hace la petición
    const cookie = await cookies()
    const token = cookie.get('session_token')?.value
    
    // Copia los headers que se mandaron
    const headers = new Headers(options.headers)

    // Si hay cuerpo pero no tipo, se marca como json
    if (options.body && !headers.has("Content-Type")){
        headers.set('Content-Type', 'application/json')
    }

    // Si hay sesión, agrega bearer con el token
    if (auth && token){
        headers.set('Authorization', `Bearer ${token}`)
    }

    let response : Response
    // Hace la llamada
    try{
        response = await fetch(`${API_URL}${endpoint}`, {
            cache: "no-store",
            ...fetchOptions, 
            headers,
    })
    } catch{
        throw new ApiError(503, "No se puede conectar con el servidor")
    }

    // si hay token pero ya no está disponible se manda a login
    if ( auth && response.status === 401 && token) redirect("/login")

    // lee el cuerpo como json
    const data =  await response.json().catch(() => null)

    if(!response.ok) throw new ApiError(response.status, data?.mensaje ?? "Error en la solicitud")

    return data as T;
}