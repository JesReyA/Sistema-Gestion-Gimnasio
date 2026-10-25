//lol no estába el page en la rama main
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export type EstadoMaquina = 'Operativa' | 'En Mantenimiento' | 'Fuera de Servicio';
export type ZonaGimnasio = 'Cardio' | 'Peso Integrado' | 'Peso Libre / Racks';

export interface Maquina {
  id: string;
  nombre: string;
  marca: string;
  zona: ZonaGimnasio;
  estado: EstadoMaquina;
  ultimoMantenimiento: string;
  proximoMantenimiento: string;
  notas?: string;
}

const MAQUINAS_INICIALES: Maquina[] = [
  {
    id: 'MAQ-001',
    nombre: 'Caminadora Uso Rudo T80',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-002',
    nombre: 'Caminadora Uso Rudo T80',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-003',
    nombre: 'Caminadora Uso Rudo T80',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-004',
    nombre: 'Caminadora Uso Rudo T80',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
{
    id: 'MAQ-005',
    nombre: 'Caminadora Uso Rudo T80',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-006',
    nombre: 'Escaleras mecánicas',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-007',
    nombre: 'Escaleras mecánicas',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-008',
    nombre: 'Escaleras mecánicas',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-009',
    nombre: 'Escaleras mecánicas',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-010',
    nombre: 'Escaleras mecánicas',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-011',
    nombre: 'Press de Banca horizontal',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-012',
    nombre: 'Press de Banca horizontal',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-013',
    nombre: 'Press de Banca horizontal',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-014',
    nombre: 'Press de Banca horizontal',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-015',
    nombre: 'Press de Banca Inclinado',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-016',
    nombre: 'Press de Banca Inclinado',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-017',
    nombre: 'Press de Banca Inclinado',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-018',
    nombre: 'Press de Banca Inclinado',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-019',
    nombre: 'Banco Fijo',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-020',
    nombre: 'Banco Fijo',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-021',
    nombre: 'Banco Fijo',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-022',
    nombre: 'Banco Fijo',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-023',
    nombre: 'Banco Fijo',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-024',
    nombre: 'Banco dinámico',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-025',
    nombre: 'Banco dinámico',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-026',
    nombre: 'Banco dinámico',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-027',
    nombre: 'Banco dinámico',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-028',
    nombre: 'Banco dinámico',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-029',
    nombre: 'Máquina de Poleas',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-030',
    nombre: 'Máquina de Poleas',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-031',
    nombre: 'Máquina de Poleas',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-032',
    nombre: 'Máquina de Poleas',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-033',
    nombre: 'Máquina de Poleas',
    marca: 'Life Fitness',
    zona: 'Cardio',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-09-15',
    proximoMantenimiento: '2026-12-15',
  },
  {
    id: 'MAQ-034',
    nombre: 'Máquina de Poleas',
    marca: 'Hammer Strength',
    zona: 'Peso Libre / Racks',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-10-01',
    proximoMantenimiento: '2027-01-01',
  },
  {
    id: 'MAQ-035',
    nombre: 'Máquina de Remo',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de modulos individuales',
  },
  {
    id: 'MAQ-036',
    nombre: 'Maquina Peck Hammer',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Rechino de asiento',
  },
    {
    id: 'MAQ-037',
    nombre: 'Maquina Peck Hammer',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de soporte',
  },
    {
    id: 'MAQ-038',
    nombre: 'Estación de Poleas',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
  },
    {
    id: 'MAQ-039',
    nombre: 'Maquina de Pull ups',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de soporte',
  },
    {
    id: 'MAQ-040',
    nombre: 'Máquina Smith',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'cambio de modulos de movimiento horizontal',
  },
    {
    id: 'MAQ-041',
    nombre: 'Máquina Smith',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Barra descalibrada',
  },    {
    id: 'MAQ-042',
    nombre: 'Máquina Smith',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
  },    {
    id: 'MAQ-043',
    nombre: 'Máquina Smith',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
  },    {
    id: 'MAQ-044',
    nombre: 'Rack Sentadilla Libre',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
  },    {
    id: 'MAQ-045',
    nombre: 'Rack Sentadilla Libre',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
  },    {
    id: 'MAQ-046',
    nombre: 'Máquila de sentadilla Hack',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
  },    {
    id: 'MAQ-047',
    nombre: 'Máquila de sentadilla Hack',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
  },    {
    id: 'MAQ-048',
    nombre: 'Prensa 45 grados',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
  },    {
    id: 'MAQ-049',
    nombre: 'Prensa 45 grados',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
  },    {
    id: 'MAQ-050',
    nombre: 'Prensa 45 grados',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
  },
      {
    id: 'MAQ-051',
    nombre: 'Costurera',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',

  },
        {
    id: 'MAQ-052',
    nombre: 'Costurera',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
  },
      {
    id: 'MAQ-053',
    nombre: 'Máquina de femoral acostado',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    
  },
      {
    id: 'MAQ-054',
    nombre: 'Máquina de femoral acostado',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de peso',
  },
      {
    id: 'MAQ-055',
    nombre: 'Máquina de femoral acostado',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
  },
      {
    id: 'MAQ-056',
    nombre: 'Máquina de femoral sentado',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de asiento',
  },
      {
    id: 'MAQ-057',
    nombre: 'Máquina de femoral sentado',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'Operativa',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
  },
    {
    id: 'MAQ-058',
    nombre: 'Máquina de extesión de cuatricep',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de asiento',
  },
    {
    id: 'MAQ-059',
    nombre: 'Máquina de extesión de cuatricep',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de asiento',
  },
    {
    id: 'MAQ-060',
    nombre: 'Máquina de extesión de cuatricep',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de asiento',
  },
    {
    id: 'MAQ-061',
    nombre: 'Máquina de extesión de cuatricep',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de asiento',
  },
    {
    id: 'MAQ-062',
    nombre: 'Máquina de Abductor',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de cable',
  },
    {
    id: 'MAQ-063',
    nombre: 'Máquina de Abductor',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de cable acerado en polea ',
  },

    {
    id: 'MAQ-064',
    nombre: 'Abductor',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de cable',
  },
    {
    id: 'MAQ-065',
    nombre: 'Máquina de Abductor',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de cable',
  },
    {
    id: 'MAQ-066',
    nombre: 'Máquina de extesión de cuatricep',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de asiento',
  },
    {
    id: 'MAQ-67',
    nombre: 'Máquina predicador',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de cable',
  },
    {
    id: 'MAQ-068',
    nombre: 'Máquina de crunches',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Rechino de asiento',
  },
      {
    id: 'MAQ-069',
    nombre: 'Máquina de Jalón',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de cable',
  },
      {
    id: 'MAQ-070',
    nombre: 'Máquina de jalón',
    marca: 'Matrix',
    zona: 'Peso Integrado',
    estado: 'En Mantenimiento',
    ultimoMantenimiento: '2026-07-20',
    proximoMantenimiento: '2026-10-25',
    notas: 'Cambio de cable',
  },
];

export default function MaquinasPage() {
  const [maquinas, setMaquinas] = useState<Maquina[]>(MAQUINAS_INICIALES);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos');

  const maquinasFiltradas = useMemo(() => {
    return maquinas.filter((m) => {
      const coincideTexto =
        m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        m.id.toLowerCase().includes(busqueda.toLowerCase());
      const coincideEstado = filtroEstado === 'Todos' || m.estado === filtroEstado;
      return coincideTexto && coincideEstado;
    });
  }, [maquinas, busqueda, filtroEstado]);

  const cambiarEstado = (id: string, nuevoEstado: EstadoMaquina) => {
    setMaquinas((prev) =>
      prev.map((m) => (m.id === id ? { ...m, estado: nuevoEstado } : m))
    );
  };

  return (
    <div className="space-y-6">
      {/* Botón de Atrás y Encabezado con fondo oscuro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d0e12] p-5 rounded-2xl border border-white/10">
        <div className="flex items-center gap-4">
          <Link
            href="/inventario"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition border border-white/10"
          >
            ← Volver a Inventario
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Control de Maquinaria y Equipos</h1>
            <p className="text-xs text-[#717684]">Supervisión de estados operativos y mantenimientos preventivos</p>
          </div>
        </div>

        {/* Enlace rápido para alternar a Material */}
        <Link
          href="/inventario/material"
          className="px-4 py-2 bg-[#ff3355]/20 hover:bg-[#ff3355]/30 text-[#ff3355] rounded-xl text-xs font-semibold transition text-center border border-[#ff3355]/30"
        >
          Ver Material y Accesorios →
        </Link>
      </div>

      {/* Filtros con fondo oscuro */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-[#0d0e12] p-4 rounded-2xl border border-white/10">
        <div className="flex flex-wrap gap-2">
          {['Todos', 'Operativa', 'En Mantenimiento', 'Fuera de Servicio'].map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                filtroEstado === estado
                  ? 'bg-[#ff3355] text-white shadow-[0_0_15px_rgba(255,51,85,0.4)]'
                  : 'bg-[#090a0f] text-[#717684] hover:text-white border border-white/10'
              }`}
            >
              {estado}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Buscar máquina por ID o nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="bg-[#090a0f] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355] w-full sm:w-64"
        />
      </div>

      {/* Tabla con fondo oscuro */}
      <div className="bg-[#0d0e12] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-[#717684] text-xs uppercase">
              <tr>
                <th className="p-4">Código</th>
                <th className="p-4">Máquina / Marca</th>
                <th className="p-4">Zona</th>
                <th className="p-4">Próximo Mant.</th>
                <th className="p-4">Estado Actual</th>
                <th className="p-4 text-right">Cambiar Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {maquinasFiltradas.map((m) => (
                <tr key={m.id} className="hover:bg-white/5 transition">
                  <td className="p-4 font-mono text-xs text-[#ff3355]">{m.id}</td>
                  <td className="p-4">
                    <p className="font-semibold text-white">{m.nombre}</p>
                    <p className="text-xs text-[#717684]">{m.marca}</p>
                    {m.notas && <p className="text-[11px] text-amber-400/90 mt-1">⚠️ {m.notas}</p>}
                  </td>
                  <td className="p-4 text-xs text-[#717684]">{m.zona}</td>
                  <td className="p-4 text-xs text-[#717684]">{m.proximoMantenimiento}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        m.estado === 'Operativa'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : m.estado === 'En Mantenimiento'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {m.estado}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={m.estado}
                      onChange={(e) => cambiarEstado(m.id, e.target.value as EstadoMaquina)}
                      className="bg-[#090a0f] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                    >
                      <option value="Operativa">Operativa</option>
                      <option value="En Mantenimiento">En Mantenimiento</option>
                      <option value="Fuera de Servicio">Fuera de Servicio</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}