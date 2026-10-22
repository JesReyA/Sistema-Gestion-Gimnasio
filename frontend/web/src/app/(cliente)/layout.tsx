'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, {useState} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {Qr} from "@/components/icons/Qr";
import {IconoPerfil} from "@/components/icons/IconoPerfil";
import {IconoCalendario} from "@/components/icons/IconoCalendario";
import {IconoRutinas} from "@/components/icons/IconoRutinas";
import {IconoHome} from "@/components/icons/IconoHome";
import { AnimatePresence } from 'motion/react';
import AccesoQr from '@/components/AccesoQr';

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#090a0f] text-white flex justify-center selection:bg-[#ff2a51]/30">
      {/* Contenedor tipo móvil centrado */}
      <div className="w-full max-w-sm flex flex-col min-h-screen pb-24 px-4 pt-4 relative">
    const [qrOpen, setQrOpen] = useState(false);
    const pathname = usePathname();

    const activeColor = 'text-[#ff3355]';
    const inactiveColor = 'text-[#717684] hover:text-white';

  return (
    <div className="min-h-screen bg-[#090a0f] text-white flex justify-center selection:bg-[#ff2a51]/30">
      {/* Contenedor */}
      <div className="w-full max-w-sm flex flex-col min-h-dvh pb-24 px-4 pt-4 relative">
        
        {/* Contenido de cada página */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Barra de navegación inferior*/}
        <nav className="fixed bottom-2 left-0 right-0 z-50 bg-[#0d0e12]/95 backdrop-blur-md border-t border-white/20 py-2 px-6 max-w-sm mx-auto flex justify-around items-center rounded-full">
          
          {/* 1. Inicio */}
          <Link
            href="/home"
            className={`flex flex-col items-center gap-1 transition-colors ${
              pathname === '/home' ? activeColor : inactiveColor
            }`}
          >
            <IconoHome
                className="w-5 h-5 fill-current"
            />
            <span className="text-[10px] font-semibold tracking-wide">Inicio</span>
          </Link>

          {/* 2. Rutinas (Mancuerna*/}
          <Link
            href="/rutinas"
            className={`flex flex-col items-center gap-1 transition-colors ${
              pathname === '/rutinas' ? 'text-[#ff2a51]' : 'text-[#717684] hover:text-white'
            }`}
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="7.5" width="2" height="9" rx="1" />
              <rect x="4.5" y="4.5" width="3.5" height="15" rx="1.5" />
              <rect x="8" y="10.5" width="8" height="3" rx="0.5" />
              <rect x="16" y="4.5" width="3.5" height="15" rx="1.5" />
              <rect x="20" y="7.5" width="2" height="9" rx="1" />
            </svg>
            <span className="text-[10px] font-semibold tracking-wide">Rutinas</span>
          </Link>

          {/* 3. Entrenar */}
          <Link
            href="/entrenar"
            className={`flex flex-col items-center gap-1 transition-colors ${
              pathname === '/entrenar' ? 'text-[#ff2a51]' : 'text-[#717684] hover:text-white'
            }`}
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="12" width="4" height="9" rx="1.5" />
              <rect x="10" y="5" width="4" height="16" rx="1.5" />
              <rect x="17" y="9" width="4" height="12" rx="1.5" />
            </svg>
            <span className="text-[10px] font-semibold tracking-wide">Entrenar</span>
          </Link>

          {/* 4. Perfil */}
          <Link
            href="/perfil"
            className={`flex flex-col items-center gap-1 transition-colors ${
              pathname === '/perfil' ? 'text-[#ff2a51]' : 'text-[#717684] hover:text-white'
            }`}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-[10px] font-semibold tracking-wide">Perfil</span>
          </Link>

        </nav>
      </div>
    </div>
  );
}
