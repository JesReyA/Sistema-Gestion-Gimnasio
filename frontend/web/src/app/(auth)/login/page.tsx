'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login intent:', { identifier, password, rememberMe });
    // Aquí conectarás con tu API de autenticación
  };

  return (
    <main className="min-h-screen bg-[#090a0c] text-white flex flex-col justify-between items-center p-6 selection:bg-[#ff3b5c]/30">
      {/* Contenedor central simulando el viewport móvil */}
      <div className="w-full max-w-sm flex flex-col items-center pt-8 pb-4">
        
        {/* 1. Header & Logo con glow */}
        <div className="relative mb-5 flex flex-col items-center">
          <div className="absolute -inset-2 bg-[#e63946]/20 blur-xl rounded-full"></div>
          
          <div className="relative w-16 h-16 rounded-2xl bg-[#141518] border border-white/5 flex items-center justify-center shadow-lg">
            {/* Ícono de Mancuerna jeje */}
            <svg 
              className="w-7 h-7 text-[#ff3355]" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m6.5 6.5 11 11" />
              <path d="m21 21-1-1a2.8 2.8 0 0 0-4 0l-1 1" />
              <path d="m9 9-1-1a2.8 2.8 0 0 0-4 0l-1 1" />
              <path d="m3 3 1 1a2.8 2.8 0 0 0 4 0l1-1" />
              <path d="m15 15 1 1a2.8 2.8 0 0 0 4 0l1-1" />
            </svg>
          </div>
          <span className="text-[11px] tracking-[0.25em] font-semibold text-gray-400 mt-3 uppercase">
            IRON FIT
          </span>
        </div>

        {/* 2. Títulos */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1.5">
            Bienvenido de nuevo
          </h1>
          <p className="text-xs text-gray-400 font-normal">
            Ingresa tus credenciales para continuar tu entrenamiento
          </p>
        </div>

        {/* 3. Formulario principal omg*/}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          
          {/* Campo: Correo o Número de Membresía */}
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 block font-medium">
              Correo o Número de Membresía
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-500">
                {/* Ícono User */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="atleta@ironfit.com o #IF-8821"
                className="w-full bg-[#15161a] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#ff3355]/60 transition-colors"
                required
              />
            </div>
          </div>

          {/* Campo: contlaseña blodel */}
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 block font-medium">
              Contraseña
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-500">
                {/* Ícono Candado */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#15161a] border border-white/5 rounded-xl py-3 pl-10 pr-10 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#ff3355]/60 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-500 hover:text-gray-300 focus:outline-none"
              >
                {/* Ícono Ver / Ocultar */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Recordar sesión y Olvidé contlaseña blodel */}
          <div className="flex items-center justify-between pt-1 pb-2">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded bg-[#1a1b20] border-gray-700 text-[#ff3355] focus:ring-0 focus:ring-offset-0 accent-[#ff3355]"
              />
              <span className="text-[11px] text-gray-400">Recordar sesión</span>
            </label>
            <a href="#" className="text-[11px] text-gray-400 hover:text-[#ff3355] transition-colors">
              ¿Olvidaste tu clave?
            </a>
          </div>

          {/* Botón de Submit */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-[#e62e4c] to-[#ff4763] hover:from-[#d62441] hover:to-[#eb3b57] text-white font-medium text-xs rounded-xl shadow-lg shadow-[#e62e4c]/20 flex items-center justify-center space-x-2 transition-all active:scale-[0.99]"
          >
            <span>Entrar a mi cuenta</span>
            <span>→</span>
          </button>
        </form>

        {/* 4. Divisor de login social */}
        <div className="relative my-7 w-full flex items-center justify-center">
          <div className="w-full border-t border-gray-800"></div>
          <span className="bg-[#090a0c] px-3 text-[10px] text-gray-500 uppercase tracking-wider absolute">
            O ingresa de inmediato
          </span>
        </div>

        {/* 5. Botones de acceso rápido (Biometría / OAuth) */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {/* Face ID */}
          <button
            type="button"
            className="flex flex-col items-center justify-center py-2.5 px-2 bg-[#141519] border border-white/5 rounded-xl hover:bg-[#1b1d22] transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2m-10 0H5a2 2 0 01-2-2v-2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h.01M15 10h.01M10 14a2 2 0 004 0" />
            </svg>
            <span className="text-[10px] text-gray-400">Face ID</span>
          </button>

          {/* Apple */}
          <button
            type="button"
            className="flex flex-col items-center justify-center py-2.5 px-2 bg-[#141519] border border-white/5 rounded-xl hover:bg-[#1b1d22] transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.42c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.71-.93 2.73 1 .08 2.02-.48 2.64-1.23z"/>
            </svg>
            <span className="text-[10px] text-gray-400">Apple</span>
          </button>

          {/* Google */}
          <button
            type="button"
            className="flex flex-col items-center justify-center py-2.5 px-2 bg-[#141519] border border-white/5 rounded-xl hover:bg-[#1b1d22] transition-colors"
          >
            <svg className="w-5 h-5 mb-1" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
            </svg>
            <span className="text-[10px] text-gray-400">Google</span>
          </button>
        </div>

      </div>

      {/* Footer: Registro */}
      <footer className="text-center text-[11px] text-gray-500 py-3">
        ¿Primera vez en el club?{' '}
        <Link href="/registro" className="text-[#ff3355] font-medium hover:underline">
          Crea tu cuenta
        </Link>
      </footer>
    </main>
  );
}