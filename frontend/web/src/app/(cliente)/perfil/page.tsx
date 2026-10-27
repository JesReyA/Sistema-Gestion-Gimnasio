'use client'

import { IconoPerfil } from "@/components/icons/IconoPerfil";
import { IconoTarjetaCredito } from "@/components/icons/IconoTarjetaCredito";
import Link from "next/link";
import Image from "next/image";
import { IconoPesoKg } from "@/components/icons/IconoPesoKg";
import { IconoCalendario } from "@/components/icons/IconoCalendario";
import { IconoObjetivos } from "@/components/icons/IconoObjetivos";
import { IconoCalorias} from "@/components/icons/IconoCalorias";
import { IconoFlecha } from "@/components/icons/IconoFlecha";
import { IconoConfiguracion } from "@/components/icons/IconoConfiguracion";
import { useMe } from "@/lib/hooks/use-user-data";

export default function Perfil() {

  const {data:me, isLoading} = useMe()

  return (
     <div className="relative flex flex-col items-center gap-6 py-4 text-center">

      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[340px] bg-[#ff2a55]/15 blur-[140px] rounded-full -z-0" />
      <div className="w-75 flex flex-row items-center justify-between shrink-0 text-left">
        {/* Contenedor de los textos*/}
        <div className="flex flex-col leading-none space-y-1">
          <p className="relative z-10 text-base text-[#ff3355]">
            Mi espacio
          </p>

          <h1 className="relative z-10 text-xl font-bold text-white">
            Perfil
          </h1>
        </div>

        {/* Icono de configuración (se mueve a la derecha) */}
        <div className="w-9 h-9 rounded-xl bg-[#1b1e2d] border border-white/5 flex items-center justify-center text-2xl shadow-lg shrink-0">
          <Link href="/" className="w-full h-full rounded-xl flex items-center justify-center">
            <IconoConfiguracion
              className='w-5 h-5 text-[#717684]'
              />
          </Link>
          
        </div>
      </div>


      {/* Cuadro perfil*/}
      <div className="relative flex flex-col gap-5 p-6 z-10 w-75 h-60 rounded-2xl bg-[#14151b] border border-white/5 items-center justify-center text-2xl shadow-lg overflow-hidden shrink-0">
        
        <div className="flex items-center gap-5">
          {/* Círculo foto perfil */}
          <div className="relative w-20 h-20 rounded-full flex items-center justify-center shrink-0">
            {/* Aro exterior */}
            <div className="absolute inset-[-5px] rounded-full border border-[#ff3355]/50 shadow-[0_0_12px_rgba(255,51,85,0.15)]" />

              {/* Aro interior */}
              <div className="absolute inset-[-2px] rounded-full border-2 border-[#ff3355] shadow-[0_0_12px_rgba(255,51,85,0.45)]" />

                {/* Foto de perfil */}
                <Image
                  src="/sisi.jpg"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className="w-full h-full rounded-full object-cover relative z-10"
                />
              </div>

            {/* Datos */}
            <div className="min-w-0 flex-1 text-left">
                <h2 className="text-base font-bold text-white truncate">
                  {me?.nombres} {me?.apellidoPaterno} {me?.apellidoPaterno}
                </h2>

                <p className="text-[11px] text-[#717684] mt-1">
                  {me?.email}
                </p>

                <div className="flex items-center gap-1.5 mt-3 drop-shadow-[0_0_6px_rgba(1,197,135,0.6)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#01c587] shadow-[0_0_8px_#01c587]" />
  
                  <p className="text-[11px] font-medium text-[#01c587]">
                    Membresía activa
                  </p>
                </div>
            </div>
        </div>
        
        <div className="relative flex flex-col gap-3 z-10 w-65 h-25 rounded-2xl bg-[#14151b] border border-white/5 text-left text-2xl justify-center shadow-lg overflow-hidden shrink-0">
          {/* Info plan y próximo cobro */}
          <Link href="/" className=" relative p-4 w-full h-full rounded-2xl">
            <div className="text-left">
              <div className=" w-fit px-2 py-0.5 flex mb-2.5 rounded-md bg-red-950 items-center justify-center">
                <h2 className="text-[11px] font-bold text-[#f34965] truncate">
                  PLAN BLACK
                </h2>
              </div>
            
              <p className="text-xs font-bold text-white truncate">
                Acceso total al gimnasio
              </p>
              <p className="text-[11px] text-[#717684] mt-1">
                Próximo cobro: 31 oct - $469 MXN
              </p>
            </div>

            <div className=" absolute right-3 top-3 w-7 h-7 rounded-full bg-[#1b1e2d] border border-white/5 flex items-center justify-center text-2xl shadow-lg shrink-0">
              <IconoFlecha
                className='w-5 h-5 text-[#ff3355]'
              />
            </div>
            </Link>
          </div>
        </div>

      {/* Resumen de actividad */}
      <div className="relative z-10 flex gap-2 w-75 shrink-0">
        <div className="w-25 h-25 rounded-2xl gap-1 bg-[#14151b] border border-white/5 flex flex-col items-center justify-center text-2xl shadow-lg">
          <IconoCalendario 
          className='w-5 h-5 text-[#ff3355]'
          />

          <p className="text-base">24</p>

          <p className="text-[10px] text-[#717684]">Asistencias</p>

          <p className="text-[10px] text-[#ff3355]">Este mes</p>
        </div>

        <div className="w-25 h-25 rounded-2xl gap-1 bg-[#14151b] border border-white/5 flex flex-col items-center justify-center text-2xl shadow-lg">
          <IconoPesoKg 
          className='w-5 h-5 text-[#ff3355]'
          />

          <p className="text-base">62.0kg</p>

          <p className="text-[10px] text-[#717684]">Peso</p>

          <p className="text-[10px] text-[#ff3355]">Actual</p>
        </div>
        
        <div className="w-25 h-25 rounded-2xl gap-1 bg-[#14151b] border border-white/5 flex flex-col items-center justify-center text-2xl shadow-lg">
          <IconoCalorias 
          className='w-5 h-5 text-[#ff3355]'
          />

          <p className="text-base">700</p>

          <p className="text-[10px] text-[#717684]">Calorías</p>

          <p className="text-[10px] text-[#ff3355]">Hoy</p>
        </div>
        
      </div>

      <div>
        {/* Gestión de cuenta */}
        <p className="relative z-10 text-left text-[12px] text-gray-400 max-w-xs w-70 shrink-0 mb-2">
          GESTIÓN Y CUENTA
        </p>

        {/* Cuadro con opciones en filas */}
        <div className="relative z-10 flex flex-col w-75 h-60 rounded-2xl bg-[#14151b] border border-white/5 shadow-lg overflow-hidden shrink-0">
        
          <div className=" relative w-full h-1/4 flex-none items-center gap-3 justify-center text-2xl border-b border-white/5 text-left">
            <Link href="/" className="w-full h-full flex items-center gap-3 px-3 rounded-t-2xl">
              <div className="w-9 h-9 rounded-xl bg-[#1b1e2d] border border-white/4 flex items-center justify-center text-2xl shadow-lg">
                <IconoPerfil
                  className='w-5 h-5 text-[#ff3355]'
                />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xs font-bold text-white truncate">
                  Datos Personales
                </h2>

                <p className="text-[10px] text-[#717684] mt-1">
                  Teléfono, fecha de nacimiento, contacto
                </p>
              </div>

              <IconoFlecha
                className='w-5 h-5 text-[#717684] ml-auto'
              />

            </Link>
          </div>
          <div className=" relative w-full h-1/4 flex-none items-center gap-3 justify-center text-2xl border-b border-white/5 text-left">
            <Link href="/pagos-cliente" className="w-full h-full flex items-center gap-3 px-3 rounded-t-2xl">
              <div className="w-9 h-9 rounded-xl bg-[#1b1e2d] border border-white/4 flex items-center justify-center text-2xl shadow-lg">
                <IconoTarjetaCredito
                  className='w-5 h-5 text-[#ff3355]'
                />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xs font-bold text-white truncate">
                  Plan y Suscripción
                </h2>

                <p className="text-[10px] text-[#717684] mt-1">
                  Factura y recibo
                </p>
              </div>

              <IconoFlecha
                className='w-5 h-5 text-[#717684] ml-auto'
              />

            </Link>
          </div>
        <div className=" relative w-full h-1/4 flex-none items-center gap-3 justify-center text-2xl border-b border-white/5 text-left">
          <Link href="/" className="w-full h-full flex items-center gap-3 px-3 rounded-t-2xl">
            <div className="w-9 h-9 rounded-xl bg-[#1b1e2d] border border-white/4 flex items-center justify-center text-2xl shadow-lg">
              <IconoObjetivos
                className='w-5 h-5 text-[#ff3355]'
              />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xs font-bold text-white truncate">
                Objetivos
              </h2>

              <p className="text-[10px] text-[#717684] mt-1">
                Peso
              </p>
            </div>

            <IconoFlecha
                className='w-5 h-5 text-[#717684] ml-auto'
            />

          </Link>
        </div>

        <div className=" relative w-full h-1/4 flex-none items-center gap-3 justify-center text-2xl border-b border-white/5 text-left">
          <Link href="/" className="w-full h-full flex items-center gap-3 px-3 rounded-t-2xl">
            <div className="w-9 h-9 rounded-xl bg-[#1b1e2d] border border-white/4 flex items-center justify-center text-2xl shadow-lg">
              <IconoCalendario 
                className='w-6 h-6 text-[#ff3355]'
              />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xs font-bold text-white truncate">
                Historial
              </h2>

              <p className="text-[10px] text-[#717684] mt-1">
                Clases
              </p>
            </div>
              <IconoFlecha
                className='w-5 h-5 text-[#717684] ml-auto'
              />

            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
