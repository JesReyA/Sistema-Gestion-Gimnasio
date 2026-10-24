'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// --- 1. MODELO DE DATOS Y TIPOS ---
export type EstadoAcceso = 'Permitido' | 'Tolerancia' | 'Bloqueado';

export interface RegistroAccesoQR {
  id: string;
  socio: string;
  plan: string;
  hora: string;
  estado: EstadoAcceso;
  detalle: string;
}

export interface AlertaInventario {
  id: string;
  item: string;
  tipo: 'Máquina' | 'Material';
  estado: 'En Mantenimiento' | 'Fuera de Servicio' | 'Baja de Lote';
  nota: string;
  ruta: string;
}

// --- 2. DATOS INICIALES (CONECTADOS CON TUS OTROS MÓDULOS) ---
const ACCESOS_INICIALES: RegistroAccesoQR[] = [
  {
    id: 'QR-901',
    socio: 'Erik Azael',
    plan: 'Membresía IRON FIT Maka',
    hora: 'Hace 2 min',
    estado: 'Permitido',
    detalle: 'Vigencia al corriente (28 días restantes)',
  },
  {
    id: 'QR-900',
    socio: 'Alexander Guzman Garcia',
    plan: 'Membresía IRON FIT Paka',
    hora: 'Hace 9 min',
    estado: 'Permitido',
    detalle: 'Vigencia al corriente (19 días restantes)',
  },
  {
    id: 'QR-899',
    socio: 'Fernanda I.',
    plan: 'Plan Aka',
    hora: 'Hace 15 min',
    estado: 'Tolerancia',
    detalle: 'Venció ayer • Acceso en periodo de gracia (Día 1 de 3)',
  },
  {
    id: 'QR-898',
    socio: 'Roberto Díaz',
    plan: 'Mensualidad Básica',
    hora: 'Hace 24 min',
    estado: 'Bloqueado',
    detalle: 'Membresía vencida hace 6 días • Pasar a recepción',
  },
  {
    id: 'QR-897',
    socio: 'Sam Sulek',
    plan: 'Membresía IronFIT VIP',
    hora: 'Hace 35 min',
    estado: 'Permitido',
    detalle: 'Acceso Total + Clases Grupales activas',
  },
];

const ALERTAS_EQUIPO: AlertaInventario[] = [
  {
    id: 'MAQ-004',
    item: 'Escaladora Infinita (StairMaster)',
    tipo: 'Máquina',
    estado: 'Fuera de Servicio',
    nota: 'Falla crítica en tarjeta electrónica del panel principal.',
    ruta: '/inventario/maquinas',
  },
  {
    id: 'MAQ-003',
    item: 'Polea Doble Crossover (Matrix)',
    tipo: 'Máquina',
    estado: 'En Mantenimiento',
    nota: 'Cambio de cable acerado y lubricación en polea derecha.',
    ruta: '/inventario/maquinas',
  },
  {
    id: 'MAT-01',
    item: 'Mancuernas Hexagonales',
    tipo: 'Material',
    estado: 'Baja de Lote',
    nota: '1 pieza reportada con daño en rack principal.',
    ruta: '/inventario/material',
  },
];

export default function DashboardPage() {
  const [accesos, setAccesos] = useState<RegistroAccesoQR[]>(ACCESOS_INICIALES);
  const [aforoActual, setAforoActual] = useState<number>(48);
  const aforoMaximo = 120;

  // Estados para el modal de Simulación de Escaneo QR / Registro rápido de entrada
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [nombreSocioQR, setNombreSocioQR] = useState('');
  const [planSocioQR, setPlanSocioQR] = useState('Membresía IRON FIT Maka');
  const [estadoSimulado, setEstadoSimulado] = useState<EstadoAcceso>('Permitido');

  const handleSimularQR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreSocioQR) return;

    const nuevoRegistro: RegistroAccesoQR = {
      id: `QR-${Math.floor(902 + Math.random() * 90)}`,
      socio: nombreSocioQR,
      plan: planSocioQR,
      hora: 'Justo ahora',
      estado: estadoSimulado,
      detalle:
        estadoSimulado === 'Permitido'
          ? 'Validación QR exitosa en torniquete'
          : estadoSimulado === 'Tolerancia'
          ? 'Acceso permitido con aviso de renovación próxima'
          : 'Acceso denegado por bloqueo automático QR',
    };

    setAccesos([nuevoRegistro, ...accesos]);
    if (estadoSimulado !== 'Bloqueado') {
      setAforoActual((prev) => Math.min(prev + 1, aforoMaximo));
    }

    setNombreSocioQR('');
    setIsQrModalOpen(false);
  };

  const porcentajeAforo = Math.round((aforoActual / aforoMaximo) * 100);

  return (
    <div className="space-y-6">
      {/* 1. Encabezado Operativo y Acciones Rápidas */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0d0e12] p-6 rounded-2xl border border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              Sucursal Abierta • Turno Activo
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">Dashboard Operativo IRONFIT</h1>
          <p className="text-xs text-[#717684]">
            Resumen en tiempo real de accesos QR, ingresos con tarjeta, inventario y staff
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="px-4 py-2.5 bg-[#ff3355] hover:bg-[#ff3355]/90 text-white rounded-xl text-xs font-semibold transition shadow-[0_0_15px_rgba(255,51,85,0.4)]"
          >
            + Validar Acceso QR
          </button>
          <Link
            href="/admin-pagos"
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition border border-white/10"
          >
            Registrar Cobro (Tarjeta)
          </Link>
          <Link
            href="/clientes"
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition border border-white/10"
          >
            Directorio de Socios
          </Link>
        </div>
      </div>

      {/* 2. Cuatro Tarjetas KPI Conectadas a los Módulos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Aforo en tiempo real */}
        <div className="bg-[#0d0e12] border border-white/10 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-[#717684] uppercase">Aforo Actual en Gym</p>
              <span className="text-xs font-bold text-emerald-400">{porcentajeAforo}%</span>
            </div>
            <p className="text-3xl font-extrabold text-white mt-2">
              {aforoActual} <span className="text-xs font-normal text-[#717684]">/ {aforoMaximo} socios</span>
            </p>
          </div>
          <div className="mt-4 space-y-1.5">
            <div className="w-full h-2 bg-[#090a0f] rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-[#ff3355] transition-all"
                style={{ width: `${porcentajeAforo}%` }}
              />
            </div>
            <Link href="/asistencias" className="block text-[11px] text-[#ff3355] hover:underline pt-1">
              Ver bitácora de asistencias →
            </Link>
          </div>
        </div>

        {/* KPI 2: Ingresos con Tarjeta (Conectado a Reportes) */}
        <Link
          href="/reportes"
          className="bg-[#0d0e12] border border-white/10 hover:border-[#ff3355]/50 p-5 rounded-2xl flex flex-col justify-between transition group"
        >
          <div>
            <p className="text-xs text-[#717684] uppercase">Ingresos del Mes (Tarjeta)</p>
            <p className="text-3xl font-extrabold text-emerald-400 mt-2">
              $3,150 <span className="text-xs font-normal text-[#717684]">MXN</span>
            </p>
            <p className="text-xs text-[#717684] mt-1">7 cobros en terminal • 4 facturados</p>
          </div>
          <p className="text-[11px] text-[#ff3355] group-hover:underline mt-4">
            Auditar en Reportes Financieros →
          </p>
        </Link>

        {/* KPI 3: Membresías y Planes (Conectado a Administración / Control) */}
        <Link
          href="/administracion/control"
          className="bg-[#0d0e12] border border-white/10 hover:border-[#ff3355]/50 p-5 rounded-2xl flex flex-col justify-between transition group"
        >
          <div>
            <p className="text-xs text-[#717684] uppercase">Socios y Membresías</p>
            <p className="text-3xl font-extrabold text-white mt-2">
              245 <span className="text-xs font-normal text-[#717684]">activos</span>
            </p>
            <p className="text-xs text-amber-400 mt-1">8 membresías por vencer esta semana</p>
          </div>
          <p className="text-[11px] text-[#ff3355] group-hover:underline mt-4">
            Configurar tarifas y bloqueo QR →
          </p>
        </Link>

        {/* KPI 4: Estado de Inventario (Conectado a Inventario) */}
        <Link
          href="/inventario/maquinas"
          className="bg-[#0d0e12] border border-white/10 hover:border-[#ff3355]/50 p-5 rounded-2xl flex flex-col justify-between transition group"
        >
          <div>
            <p className="text-xs text-[#717684] uppercase">Alertas de Inventario</p>
            <p className="text-3xl font-extrabold text-rose-400 mt-2">
              3 <span className="text-xs font-normal text-[#717684]">incidencias</span>
            </p>
            <p className="text-xs text-[#717684] mt-1">2 máquinas y 1 lote con reporte</p>
          </div>
          <p className="text-[11px] text-[#ff3355] group-hover:underline mt-4">
            Supervisar Máquinas y Material →
          </p>
        </Link>
      </div>

      {/* 3. Bloque Central: Accesos QR en Vivo (Izquierda) + Estado Operativo (Derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda (2/3): Últimos Accesos por Código QR */}
        <div className="lg:col-span-2 bg-[#0d0e12] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-white">Accesos Recientes en Torniquete (QR)</h2>
              <p className="text-xs text-[#717684]">Monitoreo automático de entradas y vigencia de socios</p>
            </div>
            <Link href="/asistencias" className="text-xs text-[#ff3355] hover:underline font-semibold">
              Historial completo →
            </Link>
          </div>

          <div className="space-y-3">
            {accesos.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#090a0f] border border-white/10 rounded-xl hover:border-white/20 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#ff3355]">{item.id}</span>
                    <p className="font-bold text-sm text-white">{item.socio}</p>
                    <span className="text-xs text-[#717684]">• {item.hora}</span>
                  </div>
                  <p className="text-xs text-white/80 font-medium">{item.plan}</p>
                  <p className="text-[11px] text-[#717684]">{item.detalle}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-center shrink-0 ${
                    item.estado === 'Permitido'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : item.estado === 'Tolerancia'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {item.estado}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha (1/3): Alertas de Equipo + Staff en Turno */}
        <div className="space-y-6">
          {/* Tarjeta de Alertas de Maquinaria y Material */}
          <div className="bg-[#0d0e12] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-white">Incidencias de Equipo</h2>
              <Link href="/inventario" className="text-xs text-[#ff3355] hover:underline">
                Ir a Inventario
              </Link>
            </div>

            <div className="space-y-3">
              {ALERTAS_EQUIPO.map((alerta) => (
                <Link
                  key={alerta.id}
                  href={alerta.ruta}
                  className="block p-3.5 bg-[#090a0f] border border-white/10 hover:border-[#ff3355]/40 rounded-xl transition space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono text-[#ff3355]">
                      {alerta.id} • {alerta.tipo}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        alerta.estado === 'Fuera de Servicio'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {alerta.estado}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white">{alerta.item}</p>
                  <p className="text-[11px] text-[#717684]">{alerta.nota}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Tarjeta de Personal en Turno y Actividades */}
          <div className="bg-[#0d0e12] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-white">Staff en Turno Activo</h2>
              <Link href="/administracion/personal" className="text-xs text-[#ff3355] hover:underline">
                Ver Personal
              </Link>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-[#090a0f] border border-white/10 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">Coach Marcos Silva</p>
                  <p className="text-[#717684]">Entrenador • Piso de Pesas</p>
                </div>
                <span className="text-emerald-400 font-semibold">● Activo</span>
              </div>

              <div className="p-3 bg-[#090a0f] border border-white/10 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">Lic. Sofía Ramírez</p>
                  <p className="text-[#717684]">Nutrióloga • Consultorio 1</p>
                </div>
                <span className="text-emerald-400 font-semibold">● Activo</span>
              </div>

              <div className="p-3 bg-[#090a0f] border border-white/10 rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">Daniela Vega</p>
                  <p className="text-[#717684]">Recepción y Terminal</p>
                </div>
                <span className="text-emerald-400 font-semibold">● Activo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL PARA SIMULAR / VALIDAR ACCESO QR --- */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d0e12] border border-white/15 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">Validar / Simular Entrada QR</h2>
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="text-[#717684] hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSimularQR} className="space-y-4">
              <div>
                <label className="block text-xs text-[#717684] mb-1">Nombre del Socio</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. David Laid"
                  value={nombreSocioQR}
                  onChange={(e) => setNombreSocioQR(e.target.value)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#717684] mb-1">Membresía Asociada</label>
                <select
                  value={planSocioQR}
                  onChange={(e) => setPlanSocioQR(e.target.value)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                >
                  <option value="Membresía IRON FIT Maka">Membresía IRON FIT Maka</option>
                  <option value="Membresía IRON FIT Paka">Membresía IRON FIT Paka</option>
                  <option value="Plan Aka">Plan Aka</option>
                  <option value="Membresía IronFIT VIP">Membresía IronFIT VIP</option>
                  <option value="Mensualidad Básica">Mensualidad Básica</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#717684] mb-1">Resultado de Validación QR</label>
                <select
                  value={estadoSimulado}
                  onChange={(e) => setEstadoSimulado(e.target.value as EstadoAcceso)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                >
                  <option value="Permitido">Permitido (Al corriente)</option>
                  <option value="Tolerancia">Tolerancia (En periodo de gracia)</option>
                  <option value="Bloqueado">Bloqueado (Membresía vencida)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ff3355] hover:bg-[#ff3355]/90 text-white rounded-xl text-xs font-semibold transition"
                >
                  Registrar Entrada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}