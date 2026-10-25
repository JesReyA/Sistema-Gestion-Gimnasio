'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconoCalorias } from "@/components/icons/IconoCalorias";
interface DiaAsistenciaReal {
  fechaId: string;
  letraDia: string;
  numeroDia: string;
  esHoy: boolean;
  esFuturo: boolean;
}

interface DatosUsuario {
  nombre: string;
  fotoPerfil: string;
  idMembresia: string;
  planActivo: boolean;
  objetivo: string;
  pesoInicial: number;
  pesoActual: number;
  pesoMeta: number;
}

const Iconos = {
  Casa: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  ),
  Rayo: () => <IconoCalorias className="w-5 h-5 fill-current" />,
  Mancuerna: () => (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <rect x="2" y="7.5" width="2" height="9" rx="1" />
      <rect x="4.5" y="4.5" width="3.5" height="15" rx="1.5" />
      <rect x="8" y="10.5" width="8" height="3" rx="0.5" />
      <rect x="16" y="4.5" width="3.5" height="15" rx="1.5" />
      <rect x="20" y="7.5" width="2" height="9" rx="1" />
    </svg>
  ),
  Perfil: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Pagos: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
  Fuego: ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
    </svg>
  ),

  Ubicacion: () => (
    <svg className="w-3.5 h-3.5 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  FlechaDerecha: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  ),
  Palomita: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  TendenciaBaja: () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  ),
  Lapiz: () => (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  ),
};

export default function PaginaInicioCliente() {
  const [datosUsuario, setDatosUsuario] = useState<DatosUsuario>({
    nombre: 'usuario',
    fotoPerfil: '/home/alexandersue/Escritorio/Escuela/Admin_Proyectos/Sistema-Gestion-Gimnasio/frontend/web/public/sisi.jpg',
    idMembresia: '#IF-8941',
    planActivo: true,
    objetivo: 'Objetivo definición',
    pesoInicial: 63.5,
    pesoActual: 62,
    pesoMeta: 60,
  });

  const [mesActualNombre, setMesActualNombre] = useState<string>('');
  const [diasSemana, setDiasSemana] = useState<DiaAsistenciaReal[]>([]);
  const [asistencias, setAsistencias] = useState<string[]>([]);
  const [cargandoAsistencias, setCargandoAsistencias] = useState<boolean>(true);

  // Estados para editar el PESO ACTUAL
  const [editandoPeso, setEditandoPeso] = useState<boolean>(false);
  const [nuevoPesoInput, setNuevoPesoInput] = useState<string>('');
  const [guardandoPeso, setGuardandoPeso] = useState<boolean>(false);

  // ESTADOS NUEVOS PARA EDITAR LA META DE PESO
  const [editandoMeta, setEditandoMeta] = useState<boolean>(false);
  const [nuevoMetaInput, setNuevoMetaInput] = useState<string>('');
  const [guardandoMeta, setGuardandoMeta] = useState<boolean>(false);

  useEffect(() => {
    const ahora = new Date();

    const nombreMes = ahora.toLocaleDateString('es-ES', { month: 'long' });
    setMesActualNombre(nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1));

    const diaIndex = ahora.getDay(); 
    const distanciaLunes = (diaIndex + 6) % 7; 

    const fechaLunes = new Date(ahora);
    fechaLunes.setDate(ahora.getDate() - distanciaLunes);

    const letrasDias = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const diasCalculados: DiaAsistenciaReal[] = [];
    const hoyStr = ahora.toISOString().split('T')[0];
    const hoyMedianoche = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());

    for (let i = 0; i < 7; i++) {
      const fechaDia = new Date(fechaLunes);
      fechaDia.setDate(fechaLunes.getDate() + i);

      const fechaId = fechaDia.toISOString().split('T')[0];
      const esHoy = fechaId === hoyStr;

      const fechaDiaMedianoche = new Date(fechaDia.getFullYear(), fechaDia.getMonth(), fechaDia.getDate());
      const esFuturo = fechaDiaMedianoche > hoyMedianoche;

      diasCalculados.push({
        fechaId,
        letraDia: letrasDias[i],
        numeroDia: fechaDia.getDate().toString(),
        esHoy,
        esFuturo,
      });
    }

    setDiasSemana(diasCalculados);

    // =========================================================================
    // OBTENER DATOS DESDE EL BACKEND
    // =========================================================================
    const obtenerDatosDelBackend = async () => {
      setCargandoAsistencias(true);
      try {
        /*
          // GENÉRICO: Aquí harías los fetch a tu backend
          const respAsistencias = await fetch('http://tu-backend.com/api/asistencias');
          const datosAsistencias = await respAsistencias.json();
          setAsistencias(datosAsistencias.fechas_asistencia_generico);

          const respUsuario = await fetch('http://tu-backend.com/api/usuario/pesos');
          const datosPesos = await respUsuario.json();
          setDatosUsuario(prev => ({ 
            ...prev, 
            pesoActual: datosPesos.peso_actual_generico,
            pesoMeta: datosPesos.peso_meta_generico 
          }));
        */

        setTimeout(() => {
          setAsistencias([hoyStr]);
          setDatosUsuario(prev => ({ ...prev, pesoActual: 61.8 }));
          setCargandoAsistencias(false);
        }, 1000);

      } catch (error) {
        console.error("Error al obtener datos del backend:", error);
        setCargandoAsistencias(false);
      }
    };

    obtenerDatosDelBackend();

  }, []);

  const alternarAsistencia = (fechaId: string, esFuturo: boolean) => {
    if (esFuturo) return;
    setAsistencias((prev) =>
      prev.includes(fechaId) ? prev.filter((f) => f !== fechaId) : [...prev, fechaId]
    );
  };

  // =========================================================================
  // GUARDAR PESO ACTUAL EN EL BACKEND
  // =========================================================================
  const guardarNuevoPeso = async () => {
    const pesoParsed = parseFloat(nuevoPesoInput);
    if (!isNaN(pesoParsed) && pesoParsed > 0) {
      setGuardandoPeso(true);
      try {
        /*
          // GENÉRICO: Petición para actualizar peso actual
          await fetch('http://tu-backend.com/api/usuario/peso-actual', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ peso_actual_generico: pesoParsed })
          });
        */
        setTimeout(() => {
          setDatosUsuario(prev => ({ ...prev, pesoActual: pesoParsed }));
          setEditandoPeso(false);
          setGuardandoPeso(false);
        }, 500);
      } catch(error) {
        console.error("Error al guardar el peso:", error);
        setGuardandoPeso(false);
      }
    }
  };

  // =========================================================================
  // GUARDAR META DE PESO EN EL BACKEND
  // =========================================================================
  const guardarNuevaMeta = async () => {
    const metaParsed = parseFloat(nuevoMetaInput);
    if (!isNaN(metaParsed) && metaParsed > 0) {
      setGuardandoMeta(true);
      try {
        /*
          // GENÉRICO: Petición para actualizar peso meta
          await fetch('http://tu-backend.com/api/usuario/peso-meta', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ peso_meta_generico: metaParsed })
          });
        */
        setTimeout(() => {
          setDatosUsuario(prev => ({ ...prev, pesoMeta: metaParsed }));
          setEditandoMeta(false);
          setGuardandoMeta(false);
        }, 500);
      } catch(error) {
        console.error("Error al guardar la meta:", error);
        setGuardandoMeta(false);
      }
    }
  };

  const rachaSemanal = diasSemana.filter((d) => asistencias.includes(d.fechaId)).length;

  const diferenciaPeso = (datosUsuario.pesoActual - datosUsuario.pesoInicial).toFixed(1);
  const porcentajeProgreso = Math.min(
    100,
    Math.max(
      0,
      ((datosUsuario.pesoInicial - datosUsuario.pesoActual) /
        (datosUsuario.pesoInicial - datosUsuario.pesoMeta)) * 100
    )
  );

  const botonesAccesoRapido = [
    { Icono: Iconos.Mancuerna, etiqueta: 'Rutinas', ruta: '/rutinas' },
    { Icono: Iconos.Pagos, etiqueta: 'Pagos', ruta: '/pagos-cliente' },
    { Icono: Iconos.Rayo, etiqueta: 'Nutricion', ruta: '/nutricion' },
    { Icono: Iconos.Perfil, etiqueta: 'Perfil', ruta: '/perfil' },
  ];

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[340px] bg-[#ff2a55]/15 blur-[140px] rounded-full -z-0" />
      {/* 1. CABECERA Y FOTO DE PERFIL */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/perfil" className="relative block group">
            <img
              src="/sisi.jpg"
              alt={datosUsuario.nombre}
              className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/40 group-hover:opacity-80 transition"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0d0f12]" />
          </Link>

          <div>
            <h1 className="text-lg font-bold flex items-center gap-1.5">
              Hola, {datosUsuario.nombre} 
            </h1>
            <p className="text-xs text-neutral-400">¡Vamos por más hoy!</p>
          </div>
        </div>
      </header>

      {/* 2. SECCIÓN PLAN ACTIVO PREMIUM */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-neutral-900/60 to-neutral-900/40 border border-emerald-900/30 flex items-center justify-between">
        <div className="space-y-1.5 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 tracking-wider">
                {datosUsuario.planActivo ? 'PLAN PREMIUM • ACTIVO' : 'PLAN INACTIVO'}
              </span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">
              {datosUsuario.idMembresia}
            </span>
          </div>
          <p className="text-xs text-neutral-300 flex items-center gap-1.5">
            <span className="text-emerald-400">✔</span> Torniquete: Habilitado (Paso libre)
          </p>
        </div>
      </div>

      {/* 3. TARJETA DE PRÓXIMA CLASE */}
      <div className="relative rounded-3xl overflow-hidden border border-neutral-800/80 p-5 bg-neutral-900 min-h-[210px] flex flex-col justify-between">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80"
          alt="Gimnasio"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-neutral-900/60 to-transparent" />

        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-950/60 text-red-400 border border-red-800/40">
            <Iconos.Fuego className="w-3 h-3 text-red-400" /> TU PRÓXIMA CLASE
          </span>
          <span className="text-xs text-neutral-400">Hoy, 8:00 AM</span>
        </div>

        <div className="relative z-10 mt-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold leading-tight">
              Entrenamiento<br />de fuerza
            </h2>
            <p className="text-xs text-neutral-400 mt-2 flex items-center gap-1">
              <Iconos.Ubicacion /> Zona Central • Coach Carlos
            </p>
          </div>
          <Link
            href="/rutinas"
            className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 hover:opacity-90 rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-orange-500/20 active:scale-95 transition"
          >
            Ver detalles <Iconos.FlechaDerecha />
          </Link>
        </div>
      </div>

      {/* 4. BOTONES DE NAVEGACIÓN */}
      <div className="grid grid-cols-4 gap-3">
        {botonesAccesoRapido.map((boton, indice) => (
          <Link
            key={indice}
            href={boton.ruta}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 group-hover:bg-neutral-800 group-hover:border-neutral-700 transition">
              <boton.Icono />
            </div>
            <span className="text-xs text-neutral-400 group-hover:text-white transition">
              {boton.etiqueta}
            </span>
          </Link>
        ))}
      </div>

      {/* 5. RESUMEN DE LA SEMANA */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm">Resumen de la semana</h3>
          
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-950/60 text-red-400 border border-red-800/40 flex items-center gap-1">
              <Iconos.Fuego className="w-3 h-3" /> Racha: {cargandoAsistencias ? '...' : rachaSemanal} {rachaSemanal === 1 ? 'día' : 'días'}
            </span>
            <span className="text-xs text-neutral-400 font-medium">{mesActualNombre}</span>
          </div>
        </div>

        <div className="flex justify-between gap-1.5 relative">
          
          {cargandoAsistencias && (
            <div className="absolute inset-0 z-10 bg-[#0d0f12]/50 flex items-center justify-center rounded-2xl">
              <span className="text-xs text-neutral-400 animate-pulse">Cargando...</span>
            </div>
          )}

          {diasSemana.map((dia) => {
            const asistio = asistencias.includes(dia.fechaId);

            return (
              <button
                key={dia.fechaId}
                type="button"
                onClick={() => alternarAsistencia(dia.fechaId, dia.esFuturo)}
                disabled={dia.esFuturo || cargandoAsistencias}
                className={`flex-1 py-3 px-1 rounded-2xl flex flex-col items-center gap-2 border text-xs transition-all ${
                  dia.esHoy
                    ? 'border-red-500/70 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                    : 'border-neutral-800/80 bg-neutral-900/50 hover:border-neutral-700'
                } ${dia.esFuturo ? 'cursor-default opacity-50' : 'cursor-pointer active:scale-95'}`}
              >
                <span
                  className={`text-[11px] font-medium ${
                    dia.esHoy ? 'text-red-400 font-bold' : 'text-neutral-400'
                  }`}
                >
                  {dia.letraDia}
                </span>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    dia.esHoy && asistio
                      ? 'bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-md shadow-red-500/30'
                      : asistio
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                      : dia.esHoy
                      ? 'border border-red-500/40 text-red-400'
                      : 'text-neutral-600'
                  }`}
                >
                  {dia.esHoy && asistio ? (
                    <Iconos.Fuego className="w-3.5 h-3.5" />
                  ) : asistio ? (
                    <Iconos.Palomita />
                  ) : (
                    '•'
                  )}
                </div>

                <span
                  className={`text-xs font-semibold ${
                    dia.esHoy ? 'text-white font-bold' : 'text-neutral-400'
                  }`}
                >
                  {dia.numeroDia}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. PROGRESO DE PESO DEL USUARIO (CON EDITAR PESO ACTUAL Y META) */}
      <div className="p-4 rounded-3xl bg-neutral-900/70 border border-neutral-800/80 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h4 className="font-bold text-sm">Tu progreso</h4>
            <p className="text-xs text-neutral-400">{datosUsuario.objetivo}</p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 flex items-center gap-1">
            <Iconos.TendenciaBaja /> {diferenciaPeso} kg
          </span>
        </div>

        <div className="flex items-end justify-between pt-2 relative z-10">
          
          {/* SECCIÓN PESO ACTUAL */}
          <div>
            <span className="text-[10px] text-neutral-400 uppercase flex items-center gap-1.5 mb-0.5">
              Peso actual
              {!editandoPeso && (
                <button 
                  onClick={() => { setNuevoPesoInput(datosUsuario.pesoActual.toString()); setEditandoPeso(true); }} 
                  className="text-neutral-500 hover:text-white transition p-0.5"
                >
                  <Iconos.Lapiz />
                </button>
              )}
            </span>
            
            {editandoPeso ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  step="0.1"
                  value={nuevoPesoInput}
                  onChange={(e) => setNuevoPesoInput(e.target.value)}
                  className="w-20 bg-neutral-950 border border-neutral-700 rounded-lg p-1.5 text-lg font-bold text-center text-white focus:outline-none focus:border-red-500 transition-colors"
                  autoFocus
                  disabled={guardandoPeso}
                />
                <span className="text-xs font-normal text-neutral-400">kg</span>
                
                <div className="flex flex-col gap-1 ml-1">
                  <button
                    onClick={guardarNuevoPeso}
                    disabled={guardandoPeso}
                    className="bg-emerald-600/80 hover:bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px] font-bold transition disabled:opacity-50"
                  >
                    {guardandoPeso ? '...' : 'OK'}
                  </button>
                  <button
                    onClick={() => setEditandoPeso(false)}
                    disabled={guardandoPeso}
                    className="bg-neutral-800 hover:bg-neutral-700 text-white px-2 py-0.5 rounded text-[10px] font-bold transition disabled:opacity-50"
                  >
                    X
                  </button>
                </div>
              </div>
            ) : (
              <span className="text-2xl font-bold">
                {datosUsuario.pesoActual}{' '}
                <span className="text-xs font-normal text-neutral-400">kg</span>
              </span>
            )}
          </div>
          
          {/* SECCIÓN META DE PESO */}
          <div className="text-right">
            <span className="text-[10px] text-neutral-400 uppercase flex items-center justify-end gap-1.5 mb-0.5">
              {!editandoMeta && (
                <button 
                  onClick={() => { setNuevoMetaInput(datosUsuario.pesoMeta.toString()); setEditandoMeta(true); }} 
                  className="text-neutral-500 hover:text-white transition p-0.5"
                >
                  <Iconos.Lapiz />
                </button>
              )}
              Meta
            </span>

            {editandoMeta ? (
              <div className="flex items-center justify-end gap-2 mt-1">
                <div className="flex flex-col gap-1 mr-1">
                  <button
                    onClick={guardarNuevaMeta}
                    disabled={guardandoMeta}
                    className="bg-emerald-600/80 hover:bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px] font-bold transition disabled:opacity-50"
                  >
                    {guardandoMeta ? '...' : 'OK'}
                  </button>
                  <button
                    onClick={() => setEditandoMeta(false)}
                    disabled={guardandoMeta}
                    className="bg-neutral-800 hover:bg-neutral-700 text-white px-2 py-0.5 rounded text-[10px] font-bold transition disabled:opacity-50"
                  >
                    X
                  </button>
                </div>
                
                <span className="text-xs font-normal text-neutral-400">kg</span>
                <input
                  type="number"
                  step="0.1"
                  value={nuevoMetaInput}
                  onChange={(e) => setNuevoMetaInput(e.target.value)}
                  className="w-20 bg-neutral-950 border border-neutral-700 rounded-lg p-1.5 text-lg font-bold text-center text-white focus:outline-none focus:border-red-500 transition-colors"
                  autoFocus
                  disabled={guardandoMeta}
                />
              </div>
            ) : (
              <span className="text-lg font-bold text-neutral-300">
                {datosUsuario.pesoMeta}{' '}
                <span className="text-xs font-normal text-neutral-400">kg</span>
              </span>
            )}
          </div>

        </div>

        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden flex relative z-10 mt-1">
          <div
            style={{ width: `${porcentajeProgreso}%` }}
            className="bg-gradient-to-r from-red-500 to-amber-400 rounded-full transition-all duration-500"
          />
        </div>
      </div>

    </div>
  );
}