'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// --- 1. MODELO DE DATOS Y TIPOS ---
export type EstadoPlan = 'Vigente' | 'Promoción Temporal' | 'Pausado';

export interface PlanMembresia {
  id: string;
  nombre: string;
  precio: number;
  duracionDias: number;
  estado: EstadoPlan;
  beneficios: string[];
}

// --- 2. DATOS INICIALES ---
const PLANES_INICIALES: PlanMembresia[] = [
  {
    id: 'PLN-01',
    nombre: 'Plan Maka',
    precio: 300,
    duracionDias: 30,
    estado: 'Vigente',
    beneficios: ['Acceso a peso libre y cardio', 'Entreno únicamente en unidad', 'Acceso a actividades y rutinas personalizadas'],
  },
  {
    id: 'PLN-02',
    nombre: 'Plan Paka',
    precio: 480,
    duracionDias: 30,
    estado: 'Vigente',
    beneficios: ['Acceso total a instalaciones (Incluye sillones de masaje)', 'Seguimiento personalizado', 'Acceso a todas las instalaciones IRON FIT'],
  },
  {
    id: 'PLN-03',
    nombre: 'Plan Aka',
    precio: 550,
    duracionDias: 30,
    estado: 'Promoción Temporal',
    beneficios: ['Acceso total a instalaciones', 'Acceso a todas las instalaciones IRON FIT', 'seguimiento personalizado', '1 invitado gratis todo el mes'],
  },
  {
    id: 'PLN-04',
    nombre: 'Pase por Visita (Día)',
    precio: 100,
    duracionDias: 1,
    estado: 'Vigente',
    beneficios: ['Acceso por 1 día a pesas y cardio', 'Acceso a actividades recreativas'],
  },
];

export default function ControlPage() {
  const [planes, setPlanes] = useState<PlanMembresia[]>(PLANES_INICIALES);
  
  // Reglas operativas generales del gimnasio
  const [aforoMaximo, setAforoMaximo] = useState(120);
  const [diasTolerancia, setDiasTolerancia] = useState(3);
  const [accesoQrEstricto, setAccesoQrEstricto] = useState(true);

  // Estados del Modal para agregar nuevo plan
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoId, setNuevoId] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState<number>(600);
  const [nuevaDuracion, setNuevaDuracion] = useState<number>(30);
  const [nuevosBeneficios, setNuevosBeneficios] = useState('');

  const cambiarEstadoPlan = (id: string, nuevoEstado: EstadoPlan) => {
    setPlanes((prev) =>
      prev.map((pl) => (pl.id === id ? { ...pl, estado: nuevoEstado } : pl))
    );
  };

  const handleAgregarPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoId || !nuevoNombre) return;

    const listaBeneficios = nuevosBeneficios
      ? nuevosBeneficios.split(',').map((b) => b.trim())
      : ['Acceso general al gimnasio', 'Código QR activo'];

    const nuevoPlan: PlanMembresia = {
      id: nuevoId,
      nombre: nuevoNombre,
      precio: Number(nuevoPrecio),
      duracionDias: Number(nuevaDuracion),
      estado: 'Vigente',
      beneficios: listaBeneficios,
    };

    setPlanes([nuevoPlan, ...planes]);
    setNuevoId('');
    setNuevoNombre('');
    setNuevoPrecio(600);
    setNuevaDuracion(30);
    setNuevosBeneficios('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado con Botón de Atrás y salto a Personal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d0e12] p-5 rounded-2xl border border-white/10">
        <div className="flex items-center gap-4">
          <Link
            href="/administracion"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition border border-white/10"
          >
            ← Volver a Administración
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Control de Planes, Tarifas y Reglas</h1>
            <p className="text-xs text-[#717684]">Configuración de membresías, vigencias y parámetros de acceso</p>
          </div>
        </div>

        <Link
          href="/administracion/personal"
          className="px-4 py-2 bg-[#ff3355]/20 hover:bg-[#ff3355]/30 text-[#ff3355] rounded-xl text-xs font-semibold transition text-center border border-[#ff3355]/30"
        >
          Ir a Personal y Staff →
        </Link>
      </div>

      {/* Parámetros Rápidos de Control Operativo */}
      <div className="bg-[#0d0e12] border border-white/10 p-5 rounded-2xl space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Reglas de Control de Sucursal</h2>
          <span className="text-xs text-emerald-400 font-semibold">● Configuración Activa</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#090a0f] border border-white/10 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-xs text-[#717684]">Aforo Máximo Permitido</p>
              <p className="text-lg font-bold text-white mt-0.5">{aforoMaximo} socios</p>
            </div>
            <input
              type="number"
              value={aforoMaximo}
              onChange={(e) => setAforoMaximo(Number(e.target.value))}
              className="w-20 bg-[#0d0e12] border border-white/15 rounded-lg px-2 py-1 text-xs text-white text-center focus:outline-none focus:border-[#ff3355]"
            />
          </div>

          <div className="bg-[#090a0f] border border-white/10 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-xs text-[#717684]">Tolerancia de Vencimiento</p>
              <p className="text-lg font-bold text-white mt-0.5">{diasTolerancia} días</p>
            </div>
            <input
              type="number"
              min="0"
              max="15"
              value={diasTolerancia}
              onChange={(e) => setDiasTolerancia(Number(e.target.value))}
              className="w-20 bg-[#0d0e12] border border-white/15 rounded-lg px-2 py-1 text-xs text-white text-center focus:outline-none focus:border-[#ff3355]"
            />
          </div>

          <div className="bg-[#090a0f] border border-white/10 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-xs text-[#717684]">Bloqueo Automático QR</p>
              <p className="text-xs font-semibold text-white mt-1">
                {accesoQrEstricto ? 'Activado al vencer' : 'Permitir con aviso'}
              </p>
            </div>
            <button
              onClick={() => setAccesoQrEstricto(!accesoQrEstricto)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                accesoQrEstricto
                  ? 'bg-[#ff3355] text-white'
                  : 'bg-white/10 text-[#717684]'
              }`}
            >
              {accesoQrEstricto ? 'Estricto' : 'Flexible'}
            </button>
          </div>
        </div>
      </div>

      {/* Cabecera de Catálogo de Planes */}
      <div className="flex justify-between items-center bg-[#0d0e12] p-4 rounded-2xl border border-white/10">
        <span className="text-sm font-semibold text-white">
          Catálogo de Membresías y Tarifas ({planes.length})
        </span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#ff3355] hover:bg-[#ff3355]/90 rounded-xl text-xs font-semibold text-white transition shadow-[0_0_15px_rgba(255,51,85,0.4)]"
        >
          + Crear Nuevo Plan
        </button>
      </div>

      {/* Tarjetas de Planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {planes.map((plan) => (
          <div
            key={plan.id}
            className="bg-[#0d0e12] border border-white/10 p-5 rounded-2xl flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-mono text-[#ff3355] uppercase">{plan.id}</span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{plan.nombre}</h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    plan.estado === 'Vigente'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : plan.estado === 'Promoción Temporal'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  {plan.estado}
                </span>
              </div>

              <p className="text-3xl font-extrabold text-[#ff3355] mt-3">
                ${plan.precio} <span className="text-xs text-[#717684] font-normal">MXN / {plan.duracionDias} días</span>
              </p>

              <ul className="mt-4 space-y-1.5 text-xs text-[#717684]">
                {plan.beneficios.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#ff3355]">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs text-[#717684]">Disponibilidad del plan:</span>
              <select
                value={plan.estado}
                onChange={(e) => cambiarEstadoPlan(plan.id, e.target.value as EstadoPlan)}
                className="bg-[#090a0f] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#ff3355]"
              >
                <option value="Vigente">Vigente</option>
                <option value="Promoción Temporal">Promoción Temporal</option>
                <option value="Pausado">Pausado</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para Crear Nuevo Plan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d0e12] border border-white/15 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">Crear Nuevo Plan o Tarifa</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#717684] hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAgregarPlan} className="space-y-3.5">
              <div>
                <label className="block text-xs text-[#717684] mb-1">Código del Plan (ej. PLN-05)</label>
                <input
                  type="text"
                  required
                  placeholder="PLN-05"
                  value={nuevoId}
                  onChange={(e) => setNuevoId(e.target.value)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#717684] mb-1">Nombre de la Membresía</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Plan Trimestral Pro"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#717684] mb-1">Precio (MXN)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={nuevoPrecio}
                    onChange={(e) => setNuevoPrecio(Number(e.target.value))}
                    className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#717684] mb-1">Duración (Días)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={nuevaDuracion}
                    onChange={(e) => setNuevaDuracion(Number(e.target.value))}
                    className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#717684] mb-1">
                  Beneficios incluidos (separados por coma)
                </label>
                <textarea
                  rows={2}
                  placeholder="Acceso total, Clases grupales, Nutrición..."
                  value={nuevosBeneficios}
                  onChange={(e) => setNuevosBeneficios(e.target.value)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355] resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ff3355] hover:bg-[#ff3355]/90 text-white rounded-xl text-xs font-semibold transition"
                >
                  Guardar Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}