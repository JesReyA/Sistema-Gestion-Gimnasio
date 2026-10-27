import { NextResponse } from "next/server"
import { getMe } from "@/lib/services/auth-service"
import { ApiError } from "@/lib/api-error"

// Se llama a esta función cuando se obtiene una petición GET en esta ruta
export async  function  GET(){
    try{
        // Se le la cookie del servidor, se forma el header y bearer y llama a spring
        const data = await getMe()

        // Responde en el navegador con los datos en JSON
        return NextResponse.json(data)

    }catch(e){

        // Si spring contestó algún error
        if(e instanceof ApiError) {
            return NextResponse.json({message: e.message}, {status: e.status})
        }
        throw e
    }
}