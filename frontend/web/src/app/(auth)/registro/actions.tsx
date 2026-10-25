"use server"

import { redirect } from "next/navigation"
import { registroWithApi } from "@/lib/services/auth-service"
import { ApiError } from "@/lib/api-error"

export type RegistroState = {error?: string; values?: Record<string, string>} | null

export async function registroAction(prev:RegistroState, formData: FormData): Promise<RegistroState> {
    const values={
        nombres : String(formData.get("nombres") ??  "").trim(),
        apellidoPaterno : String(formData.get("apellidoPaterno") ?? "").trim(),
        apellidoMaterno : String(formData.get("apellidoMaterno") ??  "").trim(),
        email: String(formData.get("email") ?? "").trim()
    }

    const password = String(formData.get("password") ?? "")
    const confirm = String(formData.get("confirmPassword") ?? "")

    if(!values.nombres || !values.apellidoPaterno || !values.email || !password){
        return {error: "Completa todos los campos obligatorios", values}
    }

    if(password.length < 8){
        return {error: "La contraseña debe tener al menos 8 caracteres", values}
    }
    
    if (password !== confirm){
        return {error: "Las contraseñas no coinciden", values}
    }

    try{
        await registroWithApi({...values, password})
    }catch(e){
        if(e instanceof ApiError) return {error: e.message, values}
        throw e
    }

    redirect("/login?registrado=1")
}