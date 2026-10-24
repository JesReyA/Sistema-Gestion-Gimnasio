'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// --- 1. MODELO DE DATOS Y TIPOS ---
export type PeriodoReporte = 'hoy' | 'semana' | 'mes';
export type MetodoPago = 'Tarjeta';
export type CategoriaIngreso = 'Membresía' | 'Visita Día' | 'Recepción / Suplementos';

export interface TransaccionReporte {
  folio: string;
  fecha: string;
  socio: string;
  concepto: string;
  categoria: CategoriaIngreso;
  metodo: MetodoPago;
  facturado: boolean;
  monto: number;
  periodo: PeriodoReporte[];
}

export interface BloqueHorario {
  horario: string;
  afluencia: number; // Porcentaje de ocupación promedio
  sociosPromedio: number;
}

// --- 2. DATOS DE PRUEBA (MOCK) ---
const TRANSACCIONES_INICIALES: TransaccionReporte[] = [
  {
    folio: 'F-2048',
    fecha: '2026-10-24 09:15',
    socio: 'Erik Azael',
    concepto: 'Plan Maka',
    categoria: 'Membresía',
    metodo: 'Tarjeta',
    facturado: true,
    monto: 550,
    periodo: ['hoy', 'semana', 'mes'],
  },
  {
    folio: 'F-2047',
    fecha: '2026-10-24 08:40',
    socio: 'Fernanda I.',
    concepto: 'Plan Aka',
    categoria: 'Membresía',
    metodo: 'Tarjeta',
    facturado: true,
    monto: 300,
    periodo: ['hoy', 'semana', 'mes'],
  },
  {
    folio: 'F-2046',
    fecha: '2026-10-24 07:55',
    socio: 'Harry Potter',
    concepto: 'Pase por Visita (Día)',
    categoria: 'Visita Día',
    metodo: 'Tarjeta',
    facturado: false,
    monto: 100,
    periodo: ['hoy', 'semana', 'mes'],
  },
  {
    folio: 'F-2045',
    fecha: '2026-10-22 18:20',
    socio: 'Alexander Guzman Garcia',
    concepto: 'Plan Aka',
    categoria: 'Membresía',
    metodo: 'Tarjeta',
    facturado: false,
    monto: 550,
    periodo: ['hoy', 'semana', 'mes'],
  },
  {
    folio: 'F-2044',
    fecha: '2026-10-21 17:10',
    socio: 'David Laid',
    concepto: 'Plan Aka',
    categoria: 'Membresía',
    metodo: 'Tarjeta',
    facturado: false,
    monto: 550,
    periodo: ['hoy', 'semana', 'mes'],
  },
  {
    folio: 'F-2043',
    fecha: '2026-10-10 11:00',
    socio: 'Sam Sulek',
    concepto: 'Plan Maka',
    categoria: 'Membresía',
    metodo: 'Tarjeta',
    facturado: true,
    monto: 550,
    periodo: ['hoy', 'semana', 'mes'],
  },
  {
    folio: 'F-2042',
    fecha: '2026-10-05 19:30',
    socio: 'Albertano',
    concepto: 'Plan Maka',
    categoria: 'Membresía',
    metodo: 'Tarjeta',
    facturado: true,
    monto: 550,
    periodo: ['hoy', 'semana', 'mes'],
  },
];

const HORAS_PICO: BloqueHorario[] = [
  { horario: '06:00 - 09:00', afluencia: 78, sociosPromedio: 65 },
  { horario: '09:00 - 13:00', afluencia: 40, sociosPromedio: 32 },
  { horario: '13:00 - 17:00', afluencia: 52, sociosPromedio: 44 },
  { horario: '17:00 - 20:00', afluencia: 95, sociosPromedio: 88 },
  { horario: '20:00 - 22:00', afluencia: 68, sociosPromedio: 54 },
];

export default function ReportesPage() {
  const [periodo, setPeriodo] = useState<PeriodoReporte>('mes');
  const [busqueda, setBusqueda] = useState('');

  // Transacciones filtradas por periodo y búsqueda (todas son con Tarjeta)
  const transaccionesFiltradas = useMemo(() => {
    return TRANSACCIONES_INICIALES.filter((t) => {
      const coincidePeriodo = t.periodo.includes(periodo);
      const coincideBusqueda =
        t.socio.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.folio.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.concepto.toLowerCase().includes(busqueda.toLowerCase());
      return coincidePeriodo && coincideBusqueda;
    });
  }, [periodo, busqueda]);

  // Cálculos dinámicos de ingresos según el periodo seleccionado
  const metricas = useMemo(() => {
    const delPeriodo = TRANSACCIONES_INICIALES.filter((t) => t.periodo.includes(periodo));
    const total = delPeriodo.reduce((acc, item) => acc + item.monto, 0);
    const tarjeta = delPeriodo
      .filter((t) => t.metodo === 'Tarjeta')
      .reduce((acc, item) => acc + item.monto, 0);
    const facturados = delPeriodo.filter((t) => t.facturado).length;

    return { total, tarjeta, facturados, cantidad: delPeriodo.length };
  }, [periodo]);

  // Función para exportar la tabla actual a un archivo CSV
  const exportarCSV = () => {
    const encabezados = ['Folio,Fecha,Socio,Concepto,Categoria,Metodo,Facturado,Monto'];
    const filas = transaccionesFiltradas.map(
      (t) =>
        `${t.folio},"${t.fecha}","${t.socio}","${t.concepto}","${t.categoria}",${t.metodo},${
          t.facturado ? 'Si' : 'No'
        },${t.monto}`
    );
    const contenidoCSV = 'data:text/csv;charset=utf-8,' + [encabezados, ...filas].join('\n');
    const encodedUri = encodeURI(contenidoCSV);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `corte_ironfit_${periodo}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* 1. Encabezado con Botón de Atrás y Selector de Periodo */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0d0e12] p-5 rounded-2xl border border-white/10">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition border border-white/10"
          >
            ← Volver al Dashboard
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Reportes Financieros y Operativos</h1>
            <p className="text-xs text-[#717684]">
              Auditoría de cobros con tarjeta, facturación y afluencia por horarios
            </p>
          </div>
        </div>

        {/* Selector de Periodo + Exportación */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-[#090a0f] p-1 rounded-xl border border-white/10">
            {(['hoy', 'semana', 'mes'] as PeriodoReporte[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase transition ${
                  periodo === p
                    ? 'bg-[#ff3355] text-white shadow-[0_0_15px_rgba(255,51,85,0.4)]'
                    : 'text-[#717684] hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={exportarCSV}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition border border-white/10"
          >
            ⬇ Exportar Corte (.CSV)
          </button>
        </div>
      </div>

      {/* 2. Tarjetas de Resumen Financiero (Exclusivo Tarjeta) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0d0e12] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-[#717684] uppercase">Ingreso Total ({periodo})</p>
          <p className="text-2xl font-extrabold text-white mt-1">
            ${metricas.total.toLocaleString('es-MX')} <span className="text-xs font-normal text-[#717684]">MXN</span>
          </p>
          <p className="text-[11px] text-[#ff3355] mt-2">
            {metricas.cantidad} movimientos registrados
          </p>
        </div>

        <div className="bg-[#0d0e12] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-[#717684] uppercase">Cobros en Terminal / Tarjeta</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            ${metricas.tarjeta.toLocaleString('es-MX')} <span className="text-xs font-normal text-[#717684]">MXN</span>
          </p>
          <p className="text-[11px] text-[#717684] mt-2">
            ✓ 100% Conciliación bancaria directa
          </p>
        </div>

        <div className="bg-[#0d0e12] border border-white/10 p-5 rounded-2xl">
          <p className="text-xs text-[#717684] uppercase">Comprobantes Facturados</p>
          <p className="text-2xl font-bold text-sky-400 mt-1">
            {metricas.facturados} <span className="text-xs font-normal text-[#717684]">de {metricas.cantidad} pagos</span>
          </p>
          <p className="text-[11px] text-[#717684] mt-2">
            Facturación fiscal emitida
          </p>
        </div>
      </div>

      {/* 3. Sección Analítica: Horas Pico de Asistencia + Estado de Inventario */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfica de Barras de Afluencia por Horario */}
        <div className="lg:col-span-2 bg-[#0d0e12] border border-white/10 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-white">Flujo de Asistencia por Bloque Horario</h2>
              <p className="text-xs text-[#717684]">Porcentaje de ocupación promedio medido por escaneo de códigos QR</p>
            </div>
            <span className="text-xs font-mono text-[#ff3355] bg-[#ff3355]/10 px-2.5 py-1 rounded-lg border border-[#ff3355]/20">
              Hora Pico: 17:00 - 20:00
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {HORAS_PICO.map((bloque) => (
              <div key={bloque.horario} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-white">{bloque.horario} hrs</span>
                  <span className="text-[#717684]">
                    ~{bloque.sociosPromedio} socios ({bloque.afluencia}% capacidad)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#090a0f] rounded-full overflow-hidden border border-white/10">
                  <div
                    className={`h-full rounded-full transition-all ${
                      bloque.afluencia >= 85
                        ? 'bg-[#ff3355]'
                        : bloque.afluencia >= 65
                        ? 'bg-amber-400'
                        : 'bg-emerald-400'
                    }`}
                    style={{ width: `${bloque.afluencia}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen Rápido de Incidencias Operativas */}
        <div className="bg-[#0d0e12] border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">Indicadores de Calidad</h2>
              <p className="text-xs text-[#717684]">Resumen operativo de sucursal</p>
            </div>

            <div className="space-y-3">
              <div className="bg-[#090a0f] border border-white/10 p-3.5 rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-xs text-white font-semibold">Pagos con Tarjeta</p>
                  <p className="text-[11px] text-[#717684]">Terminal bancaria</p>
                </div>
                <span className="text-sm font-bold text-emerald-400">
                  {metricas.total > 0 ? Math.round((metricas.tarjeta / metricas.total) * 100) : 0}%
                </span>
              </div>

              <div className="bg-[#090a0f] border border-white/10 p-3.5 rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-xs text-white font-semibold">Disponibilidad de Maquinaria</p>
                  <p className="text-[11px] text-[#717684]">Equipos en estándar óptimo</p>
                </div>
                <span className="text-sm font-bold text-amber-400">85%</span>
              </div>

              <div className="bg-[#090a0f] border border-white/10 p-3.5 rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-xs text-white font-semibold">Retención Mensual</p>
                  <p className="text-[11px] text-[#717684]">Socios que renovaron a tiempo</p>
                </div>
                <span className="text-sm font-bold text-sky-400">91%</span>
              </div>
            </div>
          </div>

          <Link
            href="/inventario/maquinas"
            className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-center rounded-xl text-xs font-semibold text-white transition border border-white/10"
          >
            Revisar Reportes de Mantenimiento →
          </Link>
        </div>
      </div>

      {/* 4. Bitácora Auditable de Transacciones */}
      <div className="bg-[#0d0e12] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white">Bitácora de Transacciones y Facturación</h2>
            <p className="text-xs text-[#717684]">Historial exclusivo de cobros mediante tarjeta</p>
          </div>

          {/* Etiqueta de Método Único y Buscador */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#ff3355] text-white">
              Método: Tarjeta
            </span>

            <input
              type="text"
              placeholder="Buscar folio o socio..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="bg-[#090a0f] border border-white/10 rounded-xl px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#ff3355]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-[#717684] text-xs uppercase">
              <tr>
                <th className="p-3.5">Folio</th>
                <th className="p-3.5">Fecha y Hora</th>
                <th className="p-3.5">Socio</th>
                <th className="p-3.5">Concepto</th>
                <th className="p-3.5">Método</th>
                <th className="p-3.5">Factura</th>
                <th className="p-3.5 text-right">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {transaccionesFiltradas.map((t) => (
                <tr key={t.folio} className="hover:bg-white/5 transition">
                  <td className="p-3.5 font-mono text-xs text-[#ff3355]">{t.folio}</td>
                  <td className="p-3.5 text-xs text-[#717684]">{t.fecha}</td>
                  <td className="p-3.5 font-medium text-white">{t.socio}</td>
                  <td className="p-3.5 text-xs text-[#717684]">{t.concepto}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 bg-[#090a0f] border border-white/10 rounded-lg text-xs text-white">
                      {t.metodo}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {t.facturado ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400">
                        Facturado
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 text-[#717684]">
                        Ticket Simple
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right font-bold text-white">
                    ${t.monto.toLocaleString('es-MX')} MXN
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