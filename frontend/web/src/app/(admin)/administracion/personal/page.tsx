'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// --- 1. MODELO DE DATOS Y TIPOS ---
export type RolPersonal = 'Entrenador' | 'Nutriólogo' | 'Recepción' | 'Mantenimiento';
export type TurnoLaboral = 'Matutino (06:00 - 14:00)' | 'Vespertino (14:00 - 22:00)' | 'Mixto / Fin de Semana';
export type EstadoPersonal = 'En Turno' | 'Descanso' | 'Inactivo';

export interface MiembroPersonal {
  id: string;
  nombre: string;
  rol: RolPersonal;
  turno: TurnoLaboral;
  telefono: string;
  estado: EstadoPersonal;
  especialidad?: string;
}

// --- 2. DATOS INICIALES ---
const PERSONAL_INICIAL: MiembroPersonal[] = [
  {
    id: 'EMP-01',
    nombre: 'Marcos Silva',
    rol: 'Entrenador',
    turno: 'Matutino (06:00 - 14:00)',
    telefono: '55 4123 8901',
    estado: 'En Turno',
    especialidad: 'Hipertrofia y Fuerza',
  },
  {
    id: 'EMP-02',
    nombre: 'Lic. Sofía Ramírez',
    rol: 'Nutriólogo',
    turno: 'Vespertino (14:00 - 22:00)',
    telefono: '55 8392 1044',
    estado: 'En Turno',
    especialidad: 'Recomposición Corporal',
  },
  {
    id: 'EMP-03',
    nombre: 'Daniela Vega',
    rol: 'Recepción',
    turno: 'Matutino (06:00 - 14:00)',
    telefono: '55 1920 3341',
    estado: 'En Turno',
    especialidad: 'Atención a socios y caja',
  },
  {
    id: 'EMP-04',
    nombre: 'Jorge Hernández',
    rol: 'Mantenimiento',
    turno: 'Mixto / Fin de Semana',
    telefono: '55 6671 2290',
    estado: 'Descanso',
    especialidad: 'Reparación de poleas y cardio',
  },
];

export default function PersonalPage() {
  const [personal, setPersonal] = useState<MiembroPersonal[]>(PERSONAL_INICIAL);
  const [rolFiltro, setRolFiltro] = useState<string>('Todos');
  const [busqueda, setBusqueda] = useState('');

  // Estados del Modal para agregar personal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoId, setNuevoId] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoRol, setNuevoRol] = useState<RolPersonal>('Entrenador');
  const [nuevoTurno, setNuevoTurno] = useState<TurnoLaboral>('Matutino (06:00 - 14:00)');
  const [nuevoTelefono, setNuevoTelefono] = useState('');
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState('');

  const personalFiltrado = useMemo(() => {
    return personal.filter((p) => {
      const coincideRol = rolFiltro === 'Todos' || p.rol === rolFiltro;
      const coincideTexto =
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.id.toLowerCase().includes(busqueda.toLowerCase());
      return coincideRol && coincideTexto;
    });
  }, [personal, rolFiltro, busqueda]);

  const cambiarEstado = (id: string, nuevoEstado: EstadoPersonal) => {
    setPersonal((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, estado: nuevoEstado } : emp))
    );
  };

  const handleAgregarPersonal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoId || !nuevoNombre || !nuevoTelefono) return;

    const nuevoMiembro: MiembroPersonal = {
      id: nuevoId,
      nombre: nuevoNombre,
      rol: nuevoRol,
      turno: nuevoTurno,
      telefono: nuevoTelefono,
      estado: 'En Turno',
      especialidad: nuevaEspecialidad || 'General',
    };

    setPersonal([nuevoMiembro, ...personal]);
    setNuevoId('');
    setNuevoNombre('');
    setNuevoTelefono('');
    setNuevaEspecialidad('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado con Botón de Atrás y salto a Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d0e12] p-5 rounded-2xl border border-white/10">
        <div className="flex items-center gap-4">
          <Link
            href="/administracion"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition border border-white/10"
          >
            ← Volver a Administración
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Gestión de Personal y Staff</h1>
            <p className="text-xs text-[#717684]">Control de turnos, entrenadores, nutriólogos y staff operativo</p>
          </div>
        </div>

        <Link
          href="/administracion/control"
          className="px-4 py-2 bg-[#ff3355]/20 hover:bg-[#ff3355]/30 text-[#ff3355] rounded-xl text-xs font-semibold transition text-center border border-[#ff3355]/30"
        >
          Ir a Control y Tarifas →
        </Link>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 bg-[#0d0e12] p-4 rounded-2xl border border-white/10">
        <div className="flex flex-wrap gap-2">
          {['Todos', 'Entrenador', 'Nutriólogo', 'Recepción', 'Mantenimiento'].map((rol) => (
            <button
              key={rol}
              onClick={() => setRolFiltro(rol)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                rolFiltro === rol
                  ? 'bg-[#ff3355] text-white shadow-[0_0_15px_rgba(255,51,85,0.4)]'
                  : 'bg-[#090a0f] text-[#717684] hover:text-white border border-white/10'
              }`}
            >
              {rol}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Buscar por nombre o ID..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="bg-[#090a0f] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#ff3355] hover:bg-[#ff3355]/90 rounded-xl text-xs font-semibold text-white transition shadow-[0_0_15px_rgba(255,51,85,0.4)] shrink-0"
          >
            + Registrar Personal
          </button>
        </div>
      </div>

      {/* Tarjetas de Personal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personalFiltrado.map((emp) => (
          <div
            key={emp.id}
            className="bg-[#0d0e12] border border-white/10 p-5 rounded-2xl flex flex-col justify-between space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] font-mono text-[#ff3355] uppercase">
                  {emp.id} • {emp.rol}
                </span>
                <h3 className="text-base font-bold text-white mt-1">{emp.nombre}</h3>
                <p className="text-xs text-[#717684] mt-0.5">🕒 {emp.turno}</p>
                <p className="text-xs text-[#717684] mt-0.5">📞 {emp.telefono}</p>
                {emp.especialidad && (
                  <p className="text-[11px] text-white/80 mt-2 bg-white/5 px-2.5 py-1 rounded-lg inline-block border border-white/10">
                    🎯 Especialidad: {emp.especialidad}
                  </p>
                )}
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  emp.estado === 'En Turno'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : emp.estado === 'Descanso'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {emp.estado}
              </span>
            </div>

            {/* Selector de Cambio de Estado con fondo oscuro */}
            <div className="pt-3 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs text-[#717684]">Cambiar estatus laboral:</span>
              <select
                value={emp.estado}
                onChange={(e) => cambiarEstado(emp.id, e.target.value as EstadoPersonal)}
                className="bg-[#090a0f] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#ff3355]"
              >
                <option value="En Turno">En Turno</option>
                <option value="Descanso">Descanso</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para Agregar Personal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d0e12] border border-white/15 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">Registrar Nuevo Integrante</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#717684] hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAgregarPersonal} className="space-y-3.5">
              <div>
                <label className="block text-xs text-[#717684] mb-1">ID Empleado (ej. EMP-05)</label>
                <input
                  type="text"
                  required
                  placeholder="EMP-05"
                  value={nuevoId}
                  onChange={(e) => setNuevoId(e.target.value)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#717684] mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Coach Alejandro Ruiz"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#717684] mb-1">Rol</label>
                  <select
                    value={nuevoRol}
                    onChange={(e) => setNuevoRol(e.target.value as RolPersonal)}
                    className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                  >
                    <option value="Entrenador">Entrenador</option>
                    <option value="Nutriólogo">Nutriólogo</option>
                    <option value="Recepción">Recepción</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#717684] mb-1">Teléfono</label>
                  <input
                    type="text"
                    required
                    placeholder="55 0000 0000"
                    value={nuevoTelefono}
                    onChange={(e) => setNuevoTelefono(e.target.value)}
                    className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#717684] mb-1">Turno Asignado</label>
                <select
                  value={nuevoTurno}
                  onChange={(e) => setNuevoTurno(e.target.value as TurnoLaboral)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                >
                  <option value="Matutino (06:00 - 14:00)">Matutino (06:00 - 14:00)</option>
                  <option value="Vespertino (14:00 - 22:00)">Vespertino (14:00 - 22:00)</option>
                  <option value="Mixto / Fin de Semana">Mixto / Fin de Semana</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#717684] mb-1">Área o Especialidad</label>
                <input
                  type="text"
                  placeholder="Ej. Entrenamiento Funcional / Box"
                  value={nuevaEspecialidad}
                  onChange={(e) => setNuevaEspecialidad(e.target.value)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
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
                  Guardar Personal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}