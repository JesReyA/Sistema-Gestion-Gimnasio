'use client';

import React from 'react';
import Link from 'next/link';

export default function InventarioHubPage() {
  return (
    <div className="space-y-6">
      {/* Botón de Atrás y Encabezado con fondo oscuro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d0e12] p-6 rounded-2xl border border-white/10">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition border border-white/10"
          >
            Volver al Dashboard
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Módulo de Inventario General</h1>
            <p className="text-xs text-[#717684]">Selecciona el área que deseas administrar y supervisar</p>
          </div>
        </div>
      </div>

      {/* Tarjetas de acceso a Máquinas y Material con fondo oscuro y efectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta 1: Máquinas */}
        <Link
          href="/inventario/maquinas"
          className="bg-[#0d0e12] border border-white/10 hover:border-[#ff3355]/50 p-6 rounded-2xl flex flex-col justify-between transition group"
        >
          <div>
            <span className="text-xs font-mono text-[#ff3355] uppercase">Gestión de Activos Fijos</span>
            <h2 className="text-xl font-bold text-white mt-2 group-hover:text-[#ff3355] transition">
              Máquinas y Equipos
            </h2>
            <p className="text-xs text-[#717684] mt-2">
              Control de caminadoras, poleas, prensas, bitácoras de mantenimiento preventivo y estados operativos (Operativa, Mantenimiento, Fuera de servicio).
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white font-semibold">
            <span>Administrar sección</span>
            <span>→</span>
          </div>
        </Link>

        {/* Tarjeta 2: Material */}
        <Link
          href="/inventario/material"
          className="bg-[#0d0e12] border border-white/10 hover:border-[#ff3355]/50 p-6 rounded-2xl flex flex-col justify-between transition group"
        >
          <div>
            <span className="text-xs font-mono text-[#ff3355] uppercase">Gestión de Lotes y Desgaste</span>
            <h2 className="text-xl font-bold text-white mt-2 group-hover:text-[#ff3355] transition">
              Material y Accesorios
            </h2>
            <p className="text-xs text-[#717684] mt-2">
              Control de mancuernas, discos olímpicos, barras, tapetes y accesorios de poleas. Reporte de piezas dañadas y porcentajes de disponibilidad.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white font-semibold">
            <span>Administrar sección</span>
            <span>→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}