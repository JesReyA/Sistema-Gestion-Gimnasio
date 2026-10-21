'use client';

import { motion } from 'motion/react';
import { IconoWallet } from './icons/IconoWallet';

interface AccesoQrProps {
  onClose: () => void;
}

export default function AccesoQr({ onClose }: AccesoQrProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between text-center p-4 bg-[#08080b] overflow-hidden overscroll-none select-none"

      style={{
        transformOrigin: 'calc(100% - 40px) calc(100% - 100px)',
      }}

      initial={{
        opacity: 0,
        scale: 0.08,
        x: 100,
        y: 180,
        rotate: 8,
      }}

      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
      }}

      exit={{
        opacity: 0,
        scale: 0.08,
        x: 100,
        y: 180,
        rotate: 8,
      }}

      transition={{
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Fondo */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(127,29,29,0.28),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(190,18,60,0.16),transparent_45%)]" />

      {/* Encabezado */}
      <div className="relative z-10 space-y-1 pt-4 flex-none">
        <h1 className="text-xl font-bold uppercase tracking-wider text-white">
          Club Pass
        </h1>

        <p className="text-xs text-gray-400">
          Sábado 17 de Octubre 2026
        </p>
      </div>

      {/* Tarjeta del QR */}
      <section className="relative z-10 w-full max-w-[340px] my-auto flex-none">
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-[#19151a] via-[#111114] to-[#0c0c10] p-5 shadow-[0_0_45px_rgba(225,29,72,0.12)]">

          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-48 rounded-full bg-red-600/10 blur-[70px] pointer-events-none" />

          <div className="relative z-10">

            {/* Usuario y membresía */}
            <div className="flex items-center gap-3 pb-4 border-b border-white/[0.08] text-left">

              <div className="relative flex-none w-12 h-12 rounded-full border-2 border-rose-500 flex items-center justify-center bg-white/[0.04] shadow-[0_0_15px_rgba(244,63,94,0.15)]">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 text-gray-300"
                  aria-hidden="true"
                >
                  <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v2h16v-2c0-2.76-3.58-5-8-5Z" />
                </svg>

                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#171318]" />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-bold text-white truncate">
                  Nombre del usuario
                </h2>

                <p className="text-xs text-rose-400 mt-1">
                  ● Membresía Black Pro
                </p>
              </div>

              <span className="text-sm font-black italic tracking-tight text-white">
                IRON<span className="text-rose-500">FIT</span>
              </span>
            </div>

            {/* Código QR */}
            <div className="py-5">
              <div className="relative mx-auto aspect-square w-full max-w-[245px] rounded-2xl bg-white p-3 shadow-[0_0_30px_rgba(244,63,94,0.10)]">

                <span className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-rose-500 rounded-tl-md" />
                <span className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-rose-500 rounded-tr-md" />
                <span className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-rose-500 rounded-bl-md" />
                <span className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-rose-500 rounded-br-md" />

                {/* QR ilustrativo: sustituir por el QR real */}
                <div className="w-full h-full flex items-center justify-center text-gray-900">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    fill="currentColor"
                    aria-label="Código QR ilustrativo"
                    role="img"
                  >
                    <path d="M5 5h30v30H5z M10 10v20h20V10z M15 15h10v10H15z" />
                    <path d="M65 5h30v30H65z M70 10v20h20V10z M75 15h10v10H75z" />
                    <path d="M5 65h30v30H5z M10 70v20h20V70z M15 75h10v10H15z" />
                    <path d="M42 5h7v7h-7z M53 5h7v7h-7z M42 16h7v7h-7z M53 27h7v7h-7z M42 38h7v7h-7z M53 38h7v7h-7z M64 42h7v7h-7z M75 42h7v7h-7z M86 42h7v7h-7z M42 53h7v7h-7z M53 53h7v7h-7z M64 53h7v7h-7z M75 53h7v7h-7z M86 53h7v7h-7z M42 64h7v7h-7z M53 75h7v7h-7z M64 64h7v7h-7z M75 75h7v7h-7z M86 64h7v7h-7z M42 86h7v7h-7z M64 86h7v7h-7z M75 86h7v7h-7z M86 86h7v7h-7z" />
                  </svg>
                  
                </div>
              </div>
            </div>

            {/* Sucursal */}
            <div className="rounded-xl bg-white/[0.035] border border-white/[0.04] p-3 text-left">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                Club
              </p>

              <p className="text-sm text-gray-200 font-medium mt-1">
                Sucursal principal
              </p>
            </div>

            {/* Wallet */}
            <button
              type="button"
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/40 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06] active:scale-[0.98]"
            >
                <IconoWallet
                    className="w-5 h-5"
                />

              Añadir a Wallet
            </button>

          </div>
        </div>

        {/* Instrucción de acceso */}
        <p className="mt-5 px-2 text-xs leading-relaxed text-gray-400">
          <span className="text-rose-500 mr-1">●</span>
          Coloca la pantalla a 10 cm del lector
        </p>
      </section>

      {/* Cerrar */}
      <div className="relative z-10 w-full max-w-[340px] pb-4 flex-none">
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-2xl bg-gradient-to-r from-red-700 to-rose-600 py-4 text-base font-bold text-white shadow-[0_0_28px_rgba(225,29,72,0.25)] transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Cerrar
        </button>
      </div>

    </motion.div>
  );
}