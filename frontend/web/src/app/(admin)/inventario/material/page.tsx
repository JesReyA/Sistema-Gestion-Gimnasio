'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export type CategoriaMaterial = 'Peso Libre' | 'Accesorios Polea' | 'Funcional y Clases' | 'Seguridad';

export interface MaterialDeportivo {
  id: string;
  nombre: string;
  categoria: CategoriaMaterial;
  cantidadTotal: number;
  enBuenEstado: number;
  danadosOExtraviados: number;
  ubicacion: string;
  notas?: string; // Campo agregado para información adicional del lote
}

const MATERIAL_INICIAL: MaterialDeportivo[] = [
  {
    id: 'MAT-01',
    nombre: 'Pares de Mancuernas Hexagonal (5 lb a 100 lb)',
    categoria: 'Peso Libre',
    cantidadTotal: 20,
    enBuenEstado: 19,
    danadosOExtraviados: 1,
    ubicacion: 'Rack Principal Peso Libre',
    notas: 'Lote inicial recibido con un desgaste menor en una mancuerna de 25 lbs.',
  },
  {
    id: 'MAT-02',
    nombre: 'Discos Olímpicos Bumper 45 lbs',
    categoria: 'Peso Libre',
    cantidadTotal: 32,
    enBuenEstado: 32,
    danadosOExtraviados: 0,
    ubicacion: 'Zona de Racks y Prensas',
    notas: 'Lote en óptimas condiciones.',
  },
];

export default function MaterialPage() {
  const [materiales, setMateriales] = useState<MaterialDeportivo[]>(MATERIAL_INICIAL);
  const [categoriaActiva, setCategoriaActiva] = useState<string>('Todas');
  
  // Estados para controlar el modal y los inputs de información del lote
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoId, setNuevoId] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState<CategoriaMaterial>('Peso Libre');
  const [nuevaCantidad, setNuevaCantidad] = useState<number>(10);
  const [nuevaUbicacion, setNuevaUbicacion] = useState('');
  const [nuevaInfo, setNuevaInfo] = useState(''); // Información adicional del lote

  const filtrados = materiales.filter(
    (item) => categoriaActiva === 'Todas' || item.categoria === categoriaActiva
  );

  const reportarDano = (id: string) => {
    setMateriales((prev) =>
      prev.map((item) => {
        if (item.id === id && item.enBuenEstado > 0) {
          return {
            ...item,
            enBuenEstado: item.enBuenEstado - 1,
            danadosOExtraviados: item.danadosOExtraviados + 1,
          };
        }
        return item;
      })
    );
  };

  const handleAgregarLote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoId || !nuevoNombre || !nuevaUbicacion) return;

    const nuevoLote: MaterialDeportivo = {
      id: nuevoId,
      nombre: nuevoNombre,
      categoria: nuevaCategoria,
      cantidadTotal: Number(nuevaCantidad),
      enBuenEstado: Number(nuevaCantidad),
      danadosOExtraviados: 0,
      ubicacion: nuevaUbicacion,
      notas: nuevaInfo || 'Lote nuevo registrado en el sistema.',
    };

    setMateriales([nuevoLote, ...materiales]);
    
    // Limpiar campos y cerrar modal
    setNuevoId('');
    setNuevoNombre('');
    setNuevaCantidad(10);
    setNuevaUbicacion('');
    setNuevaInfo('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Botón de Atrás y Encabezado con fondo oscuro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d0e12] p-5 rounded-2xl border border-white/10">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition border border-white/10"
          >
            ← Volver al Dashboard
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Inventario de Material y Accesorios</h1>
            <p className="text-xs text-[#717684]">Control de lotes, desgaste y disponibilidad de accesorios</p>
          </div>
        </div>

        <Link
          href="/inventario/maquinas"
          className="px-4 py-2 bg-[#ff3355]/20 hover:bg-[#ff3355]/30 text-[#ff3355] rounded-xl text-xs font-semibold transition text-center border border-[#ff3355]/30"
        >
          Ver Máquinas y Equipos →
        </Link>
      </div>

      {/* Filtros y Botón para abrir el Modal */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0d0e12] p-4 rounded-2xl border border-white/10">
        <div className="flex flex-wrap gap-2">
          {['Todas', 'Peso Libre', 'Accesorios Polea', 'Funcional y Clases'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                categoriaActiva === cat
                  ? 'bg-[#ff3355] text-white shadow-[0_0_15px_rgba(255,51,85,0.4)]'
                  : 'bg-[#090a0f] text-[#717684] hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#ff3355] hover:bg-[#ff3355]/90 rounded-xl text-xs font-semibold text-white transition shadow-[0_0_15px_rgba(255,51,85,0.4)]"
        >
          + Agregar Lote
        </button>
      </div>

      {/* Tarjetas de Material */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtrados.map((item) => {
          const porcentajeOptimo = Math.round((item.enBuenEstado / item.cantidadTotal) * 100);

          return (
            <div
              key={item.id}
              className="bg-[#0d0e12] border border-white/10 p-5 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-mono text-[#ff3355] uppercase">
                    {item.id} • {item.categoria}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{item.nombre}</h3>
                  <p className="text-xs text-[#717684] mt-0.5">📍 {item.ubicacion}</p>
                  
                  {/* Mostrar información / notas adicionales del lote */}
                  {item.notas && (
                    <p className="text-[11px] text-amber-400/90 mt-2 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                      ℹ️ {item.notas}
                    </p>
                  )}
                </div>
                <span className="px-2.5 py-1 bg-[#090a0f] border border-white/10 rounded-lg text-xs font-bold text-white">
                  Total: {item.cantidadTotal}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-400 font-medium">✓ En buen estado: {item.enBuenEstado}</span>
                  <span className="text-rose-400 font-medium">✕ Dañados: {item.danadosOExtraviados}</span>
                </div>
                <div className="w-full h-2 bg-[#090a0f] rounded-full overflow-hidden border border-white/10">
                  <div className="h-full bg-emerald-500 transition-all" style={{ width: `${porcentajeOptimo}%` }} />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-[#717684]">
                  Disponibilidad: <strong className="text-white">{porcentajeOptimo}%</strong>
                </span>
                <button
                  onClick={() => reportarDano(item.id)}
                  className="px-3 py-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 rounded-lg text-xs font-semibold transition border border-rose-500/30"
                >
                  Reportar pieza dañada (-1)
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- MODAL CON CAMPO DE INFORMACIÓN ADICIONAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#0d0e12] border border-white/15 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">Registrar Nuevo Lote de Material</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#717684] hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAgregarLote} className="space-y-3.5">
              <div>
                <label className="block text-xs text-[#717684] mb-1">Código / ID (ej. MAT-04)</label>
                <input
                  type="text"
                  required
                  placeholder="MAT-04"
                  value={nuevoId}
                  onChange={(e) => setNuevoId(e.target.value)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#717684] mb-1">Nombre del Material o Accesorio</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ligas de Resistencia Alta"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#717684] mb-1">Categoría</label>
                <select
                  value={nuevaCategoria}
                  onChange={(e) => setNuevaCategoria(e.target.value as CategoriaMaterial)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                >
                  <option value="Peso Libre">Peso Libre</option>
                  <option value="Accesorios Polea">Accesorios Polea</option>
                  <option value="Funcional y Clases">Funcional y Clases</option>
                  <option value="Seguridad">Seguridad</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#717684] mb-1">Cantidad Total del Lote</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={nuevaCantidad}
                  onChange={(e) => setNuevaCantidad(Number(e.target.value))}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#717684] mb-1">Ubicación en el Gimnasio</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Estante Principal de Clases"
                  value={nuevaUbicacion}
                  onChange={(e) => setNuevaUbicacion(e.target.value)}
                  className="w-full bg-[#090a0f] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff3355]"
                />
              </div>

              {/* Nuevo campo para información / notas adicionales */}
              <div>
                <label className="block text-xs text-[#717684] mb-1">Información o Notas Adicionales (Opcional)</label>
                <textarea
                  rows={2}
                  placeholder="Ej. Proveedor nuevo, recibido con empaque sellado..."
                  value={nuevaInfo}
                  onChange={(e) => setNuevaInfo(e.target.value)}
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
                  Guardar Lote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}