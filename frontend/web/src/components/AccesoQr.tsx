'use client';

import { motion } from 'motion/react';

type AccesoQrProps = {
  onClose: () => void;
};

export default function AccesoQr({ onClose }: AccesoQrProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-5 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="presentation"
    >
      <motion.section
        className="w-full max-w-xs rounded-2xl border border-white/10 bg-[#111218] p-6 text-center shadow-2xl"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.18 }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="acceso-qr-title"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#ff3355]/10 text-[#ff3355]">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z" />
            <path d="M6 6h1v1H6zM17 6h1v1h-1zM6 17h1v1H6zM14 14h3v3h-3zM20 14v2M14 20h2M20 19v2M18 20h1" />
          </svg>
        </div>
        <h2 id="acceso-qr-title" className="text-lg font-semibold">Acceso QR</h2>
        <p className="mt-2 text-sm leading-5 text-[#a5a7b0]">
          La credencial QR estará disponible cuando se conecte con los datos de tu socio.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-[#ff3355] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e62949] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Cerrar
        </button>
      </motion.section>
    </motion.div>
  );
}