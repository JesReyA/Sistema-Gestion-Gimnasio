'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { IconoCalendario } from '@/components/icons/IconoCalendario';
import { IconoPerfil } from '@/components/icons/IconoPerfil';
import { Qr } from '@/components/icons/Qr';

type AttendanceStatus = 'entrenando' | 'finalizada' | 'incidencia';

type AttendanceRecord = {
  id: string;
  clientName: string;
  memberId: string;
  date: string;
  entryTime: string;
  exitTime: string | null;
  status: AttendanceStatus;
};

type AttendanceForm = {
  clientName: string;
  memberId: string;
  date: string;
  entryTime: string;
  exitTime: string;
  status: AttendanceStatus;
};

type ModalState =
  | { type: 'details'; record: AttendanceRecord }
  | { type: 'edit'; record: AttendanceRecord }
  | null;

const REFERENCE_DATE = '2026-10-22';
const PAGE_SIZE_OPTIONS = [5, 10, 15];

const initialRecords: AttendanceRecord[] = [
  { id: 'attendance-001', clientName: 'María González', memberId: 'IF-1023', date: '2026-10-22', entryTime: '07:42', exitTime: '12:18', status: 'finalizada' },
  { id: 'attendance-002', clientName: 'Carlos Ramírez', memberId: 'IF-1187', date: '2026-10-22', entryTime: '08:10', exitTime: null, status: 'entrenando' },
  { id: 'attendance-003', clientName: 'Valeria Soto', memberId: 'IF-0951', date: '2026-10-22', entryTime: '09:05', exitTime: null, status: 'incidencia' },
  { id: 'attendance-004', clientName: 'Jorge Méndez', memberId: 'IF-1320', date: '2026-10-22', entryTime: '06:55', exitTime: '11:40', status: 'finalizada' },
  { id: 'attendance-005', clientName: 'Ana Torres', memberId: 'IF-0874', date: '2026-10-21', entryTime: '18:20', exitTime: '20:05', status: 'finalizada' },
  { id: 'attendance-006', clientName: 'Diego Herrera', memberId: 'IF-1412', date: '2026-10-21', entryTime: '17:12', exitTime: null, status: 'entrenando' },
  { id: 'attendance-007', clientName: 'Sofía Navarro', memberId: 'IF-1106', date: '2026-10-20', entryTime: '07:30', exitTime: '09:15', status: 'finalizada' },
  { id: 'attendance-008', clientName: 'Luis Ortega', memberId: 'IF-1248', date: '2026-10-18', entryTime: '10:02', exitTime: '11:27', status: 'finalizada' },
  { id: 'attendance-009', clientName: 'Fernanda Cruz', memberId: 'IF-1018', date: '2026-10-17', entryTime: '08:45', exitTime: null, status: 'incidencia' },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));
}

function csvValue(value: string | null) {
  return `"${(value ?? '').replaceAll('"', '""')}"`;
}

function StatusBadge({ status }: { status: AttendanceStatus }) {
  const styles: Record<AttendanceStatus, string> = {
    entrenando: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    finalizada: 'border-blue-400/20 bg-blue-400/10 text-blue-300',
    incidencia: 'border-amber-400/20 bg-amber-400/10 text-amber-300',
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}>
      <span aria-hidden="true" className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status === 'entrenando' ? 'Entrenando' : status === 'finalizada' ? 'Finalizada' : 'Incidencia'}
    </span>
  );
}

function StatCard({ label, value, detail, icon }: { label: string; value: number; detail: string; icon: React.ReactNode }) {
  return (
    <article className="rounded-2xl border border-white/[0.07] bg-[#121319] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-[#9b9da8]">{label}</p>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff3355]/10 text-[#ff7186]">
          {icon}
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-white">{value}</p>
      <p className="mt-1 text-[10px] text-[#717684]">{detail}</p>
    </article>
  );
}

function ModalShell({ title, description, onClose, children }: { title: string; description: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="attendance-modal-title"
        className="w-full max-w-lg rounded-2xl border border-white/[0.09] bg-[#15161c] p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="attendance-modal-title" className="text-lg font-bold text-white">{title}</h2>
            <p className="mt-1 text-xs leading-relaxed text-[#858894]">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl text-[#858894] transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]"
          >
            ×
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="space-y-1.5">
      <span className="block text-xs font-medium text-[#c4c5cc]">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-10 w-full rounded-xl border border-white/[0.1] bg-[#0f1015] px-3 text-sm text-white outline-none transition placeholder:text-[#626572] focus:border-[#ff4964]/70 focus:ring-2 focus:ring-[#ff4964]/20"
      />
    </label>
  );
}

export default function AsistenciasPage() {
  const [records, setRecords] = useState<AttendanceRecord[]>(initialRecords);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<AttendanceStatus | 'Todos'>('Todos');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [modal, setModal] = useState<ModalState>(null);
  const [form, setForm] = useState<AttendanceForm>({
    clientName: '',
    memberId: '',
    date: REFERENCE_DATE,
    entryTime: '',
    exitTime: '',
    status: 'entrenando',
  });
  const [formError, setFormError] = useState('');

  const filteredRecords = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('es-MX');

    return records.filter((record) => {
      const matchesSearch = !normalizedSearch
        || record.clientName.toLocaleLowerCase('es-MX').includes(normalizedSearch)
        || record.memberId.toLocaleLowerCase('es-MX').includes(normalizedSearch);
      const matchesDate = !dateFilter || record.date === dateFilter;
      const matchesStatus = statusFilter === 'Todos' || record.status === statusFilter;

      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [dateFilter, records, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Sustituir esta fuente local por la consulta al backend cuando se integre el servicio.
  const todayRecords = filteredRecords.filter((record) => record.date === REFERENCE_DATE);
  const monthRecords = filteredRecords.filter((record) => record.date.startsWith(REFERENCE_DATE.slice(0, 7)));
  const membersTraining = todayRecords.filter((record) => record.status === 'entrenando').length;
  const pendingReviews = filteredRecords.filter((record) => record.status === 'incidencia').length;

  const clearFilters = () => {
    setSearch('');
    setDateFilter('');
    setStatusFilter('Todos');
    setPage(1);
  };

  const openEdit = (record: AttendanceRecord) => {
    setForm({
      clientName: record.clientName,
      memberId: record.memberId,
      date: record.date,
      entryTime: record.entryTime,
      exitTime: record.exitTime ?? '',
      status: record.status,
    });
    setFormError('');
    setModal({ type: 'edit', record });
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    if (!form.clientName.trim() || !form.memberId.trim() || !form.date || !form.entryTime) {
      setFormError('Completa nombre, matrícula, fecha y hora de entrada.');
      return;
    }

    if (form.status === 'finalizada' && !form.exitTime) {
      setFormError('Una asistencia finalizada necesita una hora de salida.');
      return;
    }

    if (form.status === 'entrenando' && form.exitTime) {
      setFormError('Una asistencia en curso no puede tener hora de salida.');
      return;
    }

    const normalizedRecord = {
      clientName: form.clientName.trim(),
      memberId: form.memberId.trim().toUpperCase(),
      date: form.date,
      entryTime: form.entryTime,
      exitTime: form.exitTime || null,
      status: form.status,
    } satisfies Omit<AttendanceRecord, 'id'>;

    if (modal?.type !== 'edit') return;
    setRecords((current) => current.map((record) => (
      record.id === modal.record.id ? { ...record, ...normalizedRecord } : record
    )));

    setModal(null);
  };

  const exportCsv = () => {
    const headers = ['Cliente', 'Matrícula', 'Fecha', 'Entrada', 'Salida', 'Estado'];
    const rows = filteredRecords.map((record) => [
      record.clientName,
      record.memberId,
      record.date,
      record.entryTime,
      record.exitTime ?? 'Pendiente',
      record.status,
    ]);
    const csv = [headers, ...rows].map((row) => row.map(csvValue).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ironfit-asistencias-demo.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="min-w-0 space-y-6 px-4 pb-8 sm:px-6 lg:px-14">
      <header className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Control de asistencias</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#858894]">
            Supervisa las entradas y salidas registradas de los miembros. Esta vista utiliza datos locales de demostración.
          </p>
        </div>
        <aside aria-label="Sistema de acceso QR en demostración" className="flex items-center gap-3 rounded-2xl border border-[#ff4964]/20 bg-[#ff3355]/[0.06] px-4 py-3 sm:min-w-64">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ff3355]/10 text-[#ff7186]"><Qr className="h-5 w-5" /></span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white">Sistema de acceso QR <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-200">Demostración</span></span>
            <span className="mt-1 block text-[10px] leading-relaxed text-[#858894]">Las lecturas son simuladas; no hay lector conectado.</span>
          </span>
        </aside>
      </header>

      <section aria-label="Indicadores de asistencias" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Asistencias de hoy" value={todayRecords.length} detail="Registros del 22 oct 2026" icon={<IconoCalendario className="h-5 w-5" />} />
        <StatCard label="Miembros entrenando" value={membersTraining} detail="Entradas activas en el día" icon={<IconoPerfil className="h-5 w-5" />} />
        <StatCard label="Registros del mes" value={monthRecords.length} detail="Datos locales de demostración" icon={<span className="text-sm font-bold">31</span>} />
        <StatCard label="Incidencias por revisar" value={pendingReviews} detail="Asistencias marcadas para revisión" icon={<span className="text-sm font-bold">!</span>} />
      </section>

      <section className="rounded-2xl border border-white/[0.07] bg-[#121319] p-4 sm:p-5" aria-label="Filtros de asistencias">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Buscar por nombre o matrícula</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717684]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(event) => { setSearch(event.target.value); setPage(1); }}
              placeholder="Buscar cliente o matrícula"
              className="min-h-11 w-full rounded-xl border border-white/[0.1] bg-[#0f1015] pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-[#626572] focus:border-[#ff4964]/70 focus:ring-2 focus:ring-[#ff4964]/20"
            />
          </label>
          <label className="min-w-0 xl:w-44">
            <span className="sr-only">Filtrar por fecha</span>
            <input
              type="date"
              value={dateFilter}
              onChange={(event) => { setDateFilter(event.target.value); setPage(1); }}
              className="min-h-11 w-full rounded-xl border border-white/[0.1] bg-[#0f1015] px-3 text-sm text-[#c4c5cc] outline-none focus:border-[#ff4964]/70 focus:ring-2 focus:ring-[#ff4964]/20"
            />
          </label>
          <label className="min-w-0 xl:w-48">
            <span className="sr-only">Filtrar por estado</span>
            <select
              value={statusFilter}
              onChange={(event) => { setStatusFilter(event.target.value as AttendanceStatus | 'Todos'); setPage(1); }}
              className="min-h-11 w-full rounded-xl border border-white/[0.1] bg-[#0f1015] px-3 text-sm text-[#c4c5cc] outline-none focus:border-[#ff4964]/70 focus:ring-2 focus:ring-[#ff4964]/20"
            >
              <option value="Todos">Todos los estados</option>
              <option value="entrenando">Entrenando</option>
              <option value="finalizada">Finalizada</option>
              <option value="incidencia">Incidencia</option>
            </select>
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={clearFilters} className="min-h-11 rounded-xl border border-white/[0.1] px-3 text-xs font-semibold text-[#b4b5bd] transition hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">
              Limpiar filtros
            </button>
            <button type="button" onClick={exportCsv} disabled={!filteredRecords.length} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#ff4964]/25 px-3 text-xs font-semibold text-[#ff8495] transition hover:bg-[#ff3355]/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
              </svg>
              Exportar CSV
            </button>
          </div>
        </div>
        <p className="mt-3 text-[10px] text-[#626572]">Los filtros se aplican sobre los registros locales de demostración.</p>
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#121319]" aria-labelledby="attendance-table-title">
        <div className="flex flex-col gap-3 border-b border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <h2 id="attendance-table-title" className="text-base font-bold text-white">Registros de asistencia</h2>
            <p className="mt-1 text-xs text-[#717684]">{filteredRecords.length} resultado{filteredRecords.length === 1 ? '' : 's'} encontrados</p>
          </div>
          <label className="flex items-center gap-2 text-xs text-[#858894]">
            <span>Mostrar</span>
            <select
              value={pageSize}
              onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}
              className="rounded-lg border border-white/[0.1] bg-[#0f1015] px-2 py-1.5 text-xs text-white outline-none focus:border-[#ff4964]/70"
              aria-label="Registros por página"
            >
              {PAGE_SIZE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <span>por página</span>
          </label>
        </div>

        {visibleRecords.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <caption className="sr-only">Registros de asistencia de demostración</caption>
              <thead className="border-b border-white/[0.07] bg-white/[0.015] text-[10px] uppercase tracking-[0.12em] text-[#717684]">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Cliente</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Matrícula</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Fecha</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Entrada</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Salida</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Estado</th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {visibleRecords.map((record) => (
                  <tr key={record.id} className="transition-colors hover:bg-white/[0.025]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff3355]/10 text-[#ff7186]"><IconoPerfil className="h-4 w-4" /></span>
                        <span className="font-medium text-white">{record.clientName}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-[#b4b5bd]">{record.memberId}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-[#b4b5bd]">{formatDate(record.date)}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-[#d5d6dc]">{record.entryTime}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-[#858894]">{record.exitTime ?? 'Pendiente'}</td>
                    <td className="px-5 py-4"><StatusBadge status={record.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">
                        <button type="button" onClick={() => setModal({ type: 'details', record })} aria-label={`Consultar detalles de ${record.clientName}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#858894] transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">
                          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></svg>
                        </button>
                        <button type="button" onClick={() => openEdit(record)} aria-label={`Editar registro de ${record.clientName}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#858894] transition hover:bg-white/[0.06] hover:text-[#ff8495] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">
                          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-[#717684]"><IconoCalendario className="h-6 w-6" /></div>
            <h3 className="mt-4 text-sm font-semibold text-white">No hay registros que coincidan</h3>
            <p className="mt-1 text-xs text-[#717684]">Prueba con otros filtros o limpia la búsqueda.</p>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-xs text-[#717684]">Página {currentPage} de {totalPages}</p>
          <div className="flex items-center gap-1">
            <button type="button" disabled={currentPage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))} aria-label="Página anterior" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-[#858894] transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">‹</button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button key={pageNumber} type="button" onClick={() => setPage(pageNumber)} aria-label={`Ir a página ${pageNumber}`} aria-current={pageNumber === currentPage ? 'page' : undefined} className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186] ${pageNumber === currentPage ? 'bg-[#ff3355] text-white' : 'text-[#858894] hover:bg-white/[0.05] hover:text-white'}`}>
                {pageNumber}
              </button>
            ))}
            <button type="button" disabled={currentPage === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} aria-label="Página siguiente" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-[#858894] transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">›</button>
          </div>
        </div>
      </section>

      {modal?.type === 'details' && (
        <ModalShell title="Detalle de asistencia" description="Registro local de demostración." onClose={() => setModal(null)}>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-[#0f1015] p-3"><dt className="text-[10px] text-[#717684]">Cliente</dt><dd className="mt-1 font-semibold text-white">{modal.record.clientName}</dd></div>
            <div className="rounded-xl bg-[#0f1015] p-3"><dt className="text-[10px] text-[#717684]">Matrícula</dt><dd className="mt-1 font-semibold text-white">{modal.record.memberId}</dd></div>
            <div className="rounded-xl bg-[#0f1015] p-3"><dt className="text-[10px] text-[#717684]">Fecha</dt><dd className="mt-1 text-[#d5d6dc]">{formatDate(modal.record.date)}</dd></div>
            <div className="rounded-xl bg-[#0f1015] p-3"><dt className="text-[10px] text-[#717684]">Entrada</dt><dd className="mt-1 text-[#d5d6dc]">{modal.record.entryTime}</dd></div>
            <div className="rounded-xl bg-[#0f1015] p-3"><dt className="text-[10px] text-[#717684]">Salida</dt><dd className="mt-1 text-[#d5d6dc]">{modal.record.exitTime ?? 'Pendiente'}</dd></div>
            <div className="rounded-xl bg-[#0f1015] p-3"><dt className="text-[10px] text-[#717684]">Estado</dt><dd className="mt-1"><StatusBadge status={modal.record.status} /></dd></div>
          </dl>
          <button type="button" onClick={() => setModal(null)} className="mt-5 min-h-10 w-full rounded-xl border border-white/[0.1] px-4 text-sm font-semibold text-[#c4c5cc] transition hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">Cerrar</button>
        </ModalShell>
      )}

      {modal?.type === 'edit' && (
        <ModalShell
          title="Corregir asistencia"
          description="Los cambios se mantienen únicamente en esta sesión de demostración."
          onClose={() => setModal(null)}
        >
          <form onSubmit={submitForm} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Cliente" value={form.clientName} onChange={(value) => setForm((current) => ({ ...current, clientName: value }))} required />
              <FormField label="Matrícula" value={form.memberId} onChange={(value) => setForm((current) => ({ ...current, memberId: value }))} required />
              <FormField label="Fecha" type="date" value={form.date} onChange={(value) => setForm((current) => ({ ...current, date: value }))} required />
              <FormField label="Hora de entrada" type="time" value={form.entryTime} onChange={(value) => setForm((current) => ({ ...current, entryTime: value }))} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Hora de salida (opcional)" type="time" value={form.exitTime} onChange={(value) => setForm((current) => ({ ...current, exitTime: value }))} />
              <label className="space-y-1.5">
                <span className="block text-xs font-medium text-[#c4c5cc]">Estado</span>
                <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as AttendanceStatus }))} className="min-h-10 w-full rounded-xl border border-white/[0.1] bg-[#0f1015] px-3 text-sm text-white outline-none focus:border-[#ff4964]/70 focus:ring-2 focus:ring-[#ff4964]/20">
                  <option value="entrenando">Entrenando</option>
                  <option value="finalizada">Finalizada</option>
                  <option value="incidencia">Incidencia</option>
                </select>
              </label>
            </div>
            {formError && <p role="alert" className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs text-rose-300">{formError}</p>}
            <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setModal(null)} className="min-h-10 rounded-xl border border-white/[0.1] px-4 text-sm font-semibold text-[#c4c5cc] transition hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">Cancelar</button>
              <button type="submit" className="min-h-10 rounded-xl bg-[#ff3355] px-4 text-sm font-semibold text-white transition hover:bg-[#e92d4d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8495]">Guardar corrección</button>
            </div>
          </form>
        </ModalShell>
      )}
    </div>
  );
}
