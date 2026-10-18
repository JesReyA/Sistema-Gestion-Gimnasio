import { IconoPerfil } from "@/components/icons/IconoPerfil";
import { IconoTarjetaCredito } from "@/components/icons/IconoTarjetaCredito";
import Link from "next/link";
import Image from "next/image";
import { IconoPesoKg } from "@/components/icons/IconoPesoKg";
import { IconoCalendario } from "@/components/icons/IconoCalendario";
import { IconoObjetivos } from "@/components/icons/IconoObjetivos";

export default function Perfil() {
  return (
    <div className="fixed inset-0 flex flex-col items-center gap-6 py-8 text-center p-4 bg-[#08080b] overflow-y-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[340px] bg-[#ff2a55]/15 blur-[140px] rounded-full -z-0" />

      <h1 className="relative z-10 text-l font-bold text-white">
        Mi Perfil
      </h1>

      {/* Cuadro perfil*/}
      <div className="relative flex flex-col gap-3 p-5 z-10 w-75 h-60 rounded-2xl bg-[#14151b] border border-white/5 items-center justify-center text-2xl shadow-lg overflow-hidden shrink-0">
        <div className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#ff2a55]/20 blur-3xl rounded-full" />
        {/* Circulo foto perfil */}
        <div className="w-25 h-25 rounded-full bg-[#14151b] border border-white/10 flex items-center justify-center text-2xl">
          <Image 
          src="/sisi.jpg"
          width={500}
          height={500}
          alt="Picture of the author"
          className="rounded-full"
          >
            
          </Image>
        </div>

        <div className="min-w-0 flex-1">
              <h2 className="text-base font-bold text-white truncate">
                Nombre Usuario
              </h2>

              <p className="text-[11px] text-[#717684] mt-1">
                usuario@correo.com
              </p>
            </div>
      </div>

      {/* Resumen de actividad */}
      <div className="relative z-10 flex gap-7 w-75 shrink-0">
        <div className="w-20 h-25 rounded-2xl gap-3 bg-[#14151b] border border-white/5 flex flex-col items-center justify-center text-2xl shadow-lg">
          <IconoCalendario 
          className='w-6 h-6 text-[#ff3355]'
          />

          <p className="text-base">24</p>
        </div>

        <div className="w-20 h-25 rounded-2xl gap-3 bg-[#14151b] border border-white/5 flex flex-col items-center justify-center text-2xl shadow-lg">
          <IconoPesoKg 
          className='w-6 h-6 text-[#ff3355]'
          />

          <p className="text-base">62.0kg</p>
        </div>
        
        <div className="w-20 h-25 rounded-2xl bg-[#14151b] border border-white/5 flex flex-col items-center justify-center text-2xl shadow-lg">
        
        </div>
      </div>

      {/* Gestión de cuenta */}
      <p className="relative z-10 text-left text-xs text-gray-400 max-w-xs w-70 shrink-0">
        GESTION Y CUENTA
      </p>

      {/* Cuadro con opciones en filas */}
      <div className="relative z-10 flex flex-col w-75 h-60 rounded-2xl bg-[#14151b] border border-white/5 shadow-lg overflow-hidden shrink-0">
        
        <div className=" relative w-full h-1/4 flex-none items-center gap-3 justify-center text-2xl border-b border-white/5 text-left">
          <Link href="/" className="w-full h-full flex items-center gap-3 px-3 rounded-t-2xl">
            <div className="w-9 h-9 rounded-xl bg-[#1b1e2d] border border-white/4 flex items-center justify-center text-2xl shadow-lg">
              <IconoPerfil
                className='w-5 h-5 text-[#717684]'
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

          </Link>
        </div>
         <div className=" relative w-full h-1/4 flex-none items-center gap-3 justify-center text-2xl border-b border-white/5 text-left">
          <Link href="/" className="w-full h-full flex items-center gap-3 px-3 rounded-t-2xl">
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

          </Link>
        </div>
        <div className=" relative w-full h-1/4 flex-none items-center gap-3 justify-center text-2xl border-b border-white/5 text-left">
          <Link href="/" className="w-full h-full flex items-center gap-3 px-3 rounded-t-2xl">
            <div className="w-9 h-9 rounded-xl bg-[#1b1e2d] border border-white/4 flex items-center justify-center text-2xl shadow-lg">
              <IconoObjetivos
                className='w-5 h-5 text-[#717684]'
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

          </Link>
        </div>

        <div className="w-full h-1/4 flex items-center justify-center text-2xl">
          <Link href="/">
          </Link>
        </div>
      </div>

    </div>
  );
}
