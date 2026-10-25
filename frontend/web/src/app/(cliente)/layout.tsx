'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {Qr} from "@/components/icons/Qr";
import {IconoPerfil} from "@/components/icons/IconoPerfil";
import {IconoCalorias} from "@/components/icons/IconoCalorias";
import {IconoRutinas} from "@/components/icons/IconoRutinas";
import {IconoHome} from "@/components/icons/IconoHome";
import { AnimatePresence } from 'motion/react';
import AccesoQr from '@/components/AccesoQr';

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [qrOpen, setQrOpen] = useState(false);
    const pathname = usePathname();

    const activeColor = 'text-[#ff3355]';
    const inactiveColor = 'text-[#717684] hover:text-white';

  return (
    <div className="min-h-screen bg-[#090a0f] text-white flex justify-center selection:bg-[#ff2a51]/30">
      {/* Contenedor tipo móvil centrado */}
      <div className="w-full max-w-sm flex flex-col min-h-dvh pb-24 px-4 pt-4 relative">
        
        {/* Contenido de cada página */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Modal / Vista flotante del QR */}
        <AnimatePresence>
          {qrOpen && <AccesoQr onClose={() => setQrOpen(false)} />}
        </AnimatePresence>

        {/* Barra de navegación inferior */}
        <nav className="fixed bottom-2 left-0 right-0 z-50 bg-[#0d0e12]/95 backdrop-blur-md border-t border-white/20 py-2 px-6 max-w-sm mx-auto flex justify-around items-center rounded-full">
          
          {/* 1. Inicio */}
          <Link
            href="/home"
            className={`flex flex-col items-center gap-1 transition-colors ${
              pathname === '/home' ? activeColor : inactiveColor
            }`}
          >
            <IconoHome className="w-5 h-5 fill-current" />
            <span className="text-[10px] font-semibold tracking-wide">Inicio</span>
          </Link>

          {/* 2. Rutinas */}
          <Link
            href="/rutinas"
            className={`flex flex-col items-center gap-1 transition-colors ${
              pathname === '/rutinas' ? activeColor : inactiveColor
            }`}
          >
            <IconoRutinas
                className="w-5 h-5 fill-current"
            />

            <span className="text-[10px] font-semibold tracking-wide">Rutinas</span>
          </Link>

          {/* 3. Nutrición */}
          <Link
            href="/nutricion"
            className={`flex flex-col items-center gap-1 transition-colors ${
              pathname === '/nutricion' ? activeColor : inactiveColor
            }`}
          >
            <IconoCalorias
                className="w-5 h-5 fill-current"
            />
            <span className="text-[10px] font-semibold tracking-wide">Nutrición</span>
          </Link>

          {/* 4. Perfil */}
          <Link
            href="/perfil"
            className={`flex flex-col items-center gap-1 transition-colors ${
              pathname === '/perfil' ? activeColor : inactiveColor
            }`}
          >
            <IconoPerfil
                className='w-5 h-5'
            />
            <span className="text-[10px] font-semibold tracking-wide">Perfil</span>
          </Link>

          {/* Botón Qr */}
          <div className='absolute bottom-19 right-6 sm:right-9 w-13 h-13 bg-[#0d0e12]/95 backdrop-blur-md border-t border-white/20 rounded-xl'>
            <button onClick={() => setQrOpen(true)} className='absolute  inset-0 w-full h-full p-1 rounded-xl shadow-[0_0_20px_rgba(255,51,85,0.6)] transition-all'>
              <Qr 
                className={`w-full h-full ${activeColor}`}
              />
            </button>
          </div>
        </nav>
        
        {/* Animación qr para cerrarse */}
        <AnimatePresence>
          {qrOpen && (
          <AccesoQr
            key="acceso-qr"
            onClose={() => setQrOpen(false)}
          />
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}