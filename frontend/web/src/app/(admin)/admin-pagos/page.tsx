'use client';

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { IconoCalendario } from '@/components/icons/IconoCalendario';
import { IconoPerfil } from '@/components/icons/IconoPerfil';
import { IconoTarjetaCredito } from '@/components/icons/IconoTarjetaCredito';
import { IconoWallet } from '@/components/icons/IconoWallet';

type PaymentStatus = 'pagado' | 'no_pagado';
type PaymentDisplayStatus = PaymentStatus | 'vencido';
type PaymentMethod = 'efectivo' | 'tarjeta' | 'transferencia';

type PaymentRecord = {
  id: string;
  folioPago: string;
  cliente: string;
  suscripcion: string;
  fechaPago: string | null;
  proximoPago: string | null;
  montoMXN: number;
  metodoPago: PaymentMethod;
  estado: PaymentStatus;
};

type PaymentForm = {
  folioPago: string;
  cliente: string;
  suscripcion: string;
  fechaPago: string;
  proximoPago: string;
  montoMXN: string;
  metodoPago: PaymentMethod;
  estado: PaymentStatus;
};

const INITIAL_TODAY = '2026-10-23';
const PAGE_SIZE_OPTIONS = [5, 10, 15];
const METHODS: PaymentMethod[] = ['efectivo', 'tarjeta', 'transferencia'];
// fuente local provisional
const INITIAL_RECORDS: PaymentRecord[] = [
  { id: 'demo-001', folioPago: 'DEMO-2026-1042', cliente: 'María González', suscripcion: 'Membresía Fuerza · mensual', fechaPago: '2026-10-22', proximoPago: '2026-11-22', montoMXN: 899, metodoPago: 'tarjeta', estado: 'pagado' },
  { id: 'demo-002', folioPago: 'DEMO-2026-1041', cliente: 'Carlos Ramírez', suscripcion: 'Membresía Black · mensual', fechaPago: null, proximoPago: '2026-10-22', montoMXN: 1299, metodoPago: 'transferencia', estado: 'no_pagado' },
  { id: 'demo-003', folioPago: 'DEMO-2026-1040', cliente: 'Valeria Soto', suscripcion: 'Membresía Fuerza · mensual', fechaPago: '2026-10-20', proximoPago: '2026-11-20', montoMXN: 899, metodoPago: 'efectivo', estado: 'pagado' },
  { id: 'demo-004', folioPago: 'DEMO-2026-1039', cliente: 'Jorge Méndez', suscripcion: 'Membresía Black · trimestral', fechaPago: null, proximoPago: '2026-10-17', montoMXN: 3297, metodoPago: 'tarjeta', estado: 'no_pagado' },
  { id: 'demo-005', folioPago: 'DEMO-2026-1038', cliente: 'Ana Torres', suscripcion: 'Membresía Fuerza · mensual', fechaPago: '2026-10-18', proximoPago: '2026-11-18', montoMXN: 899, metodoPago: 'transferencia', estado: 'pagado' },
  { id: 'demo-006', folioPago: 'DEMO-2026-1037', cliente: 'Diego Herrera', suscripcion: 'Membresía Fuerza · mensual', fechaPago: null, proximoPago: '2026-10-23', montoMXN: 899, metodoPago: 'efectivo', estado: 'no_pagado' },
  { id: 'demo-007', folioPago: 'DEMO-2026-1036', cliente: 'Sofía Navarro', suscripcion: 'Membresía Black · mensual', fechaPago: '2026-10-14', proximoPago: '2026-11-14', montoMXN: 1299, metodoPago: 'tarjeta', estado: 'pagado' },
  { id: 'demo-008', folioPago: 'DEMO-2026-1035', cliente: 'Luis Ortega', suscripcion: 'Membresía Fuerza · mensual', fechaPago: null, proximoPago: '2026-11-02', montoMXN: 899, metodoPago: 'transferencia', estado: 'no_pagado' },
  { id: 'demo-009', folioPago: 'DEMO-2026-1034', cliente: 'Fernanda Cruz', suscripcion: 'Membresía Fuerza · mensual', fechaPago: '2026-10-08', proximoPago: '2026-11-08', montoMXN: 899, metodoPago: 'efectivo', estado: 'pagado' },
  { id: 'demo-010', folioPago: 'DEMO-2026-1033', cliente: 'Pablo Reyes', suscripcion: 'Membresía Black · trimestral', fechaPago: null, proximoPago: null, montoMXN: 3297, metodoPago: 'tarjeta', estado: 'no_pagado' },
  { id: 'demo-011', folioPago: 'DEMO-2026-1032', cliente: 'Lucía Flores', suscripcion: 'Membresía Fuerza · mensual', fechaPago: '2026-09-23', proximoPago: '2026-10-23', montoMXN: 899, metodoPago: 'transferencia', estado: 'pagado' },
  { id: 'demo-012', folioPago: 'DEMO-2026-1031', cliente: 'Mateo Silva', suscripcion: 'Membresía Fuerza · mensual', fechaPago: null, proximoPago: '2026-10-24', montoMXN: 899, metodoPago: 'efectivo', estado: 'no_pagado' },
];

const EMPTY_FORM: PaymentForm = {
  folioPago: '',
  cliente: '',
  suscripcion: '',
  fechaPago: '',
  proximoPago: '',
  montoMXN: '',
  metodoPago: 'efectivo',
  estado: 'no_pagado',
};

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

function formatCurrency(amount: number) {
  return currencyFormatter.format(amount);
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addCalendarDays(dateKey: string, days: number) {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day, 12);
  date.setDate(date.getDate() + days);
  return getLocalDateKey(date);
}

function getDisplayStatus(record: PaymentRecord, today: string): PaymentDisplayStatus {
  if (record.estado === 'pagado') return 'pagado';
  if (record.proximoPago && record.proximoPago < today) return 'vencido';
  return 'no_pagado';
}

function formatDate(date: string | null) {
  if (!date) return 'Pendiente';
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}

function formatMonth(dateKey: string) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric' })
    .format(new Date(year, month - 1, day, 12));
}

function methodLabel(method: PaymentMethod) {
  return method.charAt(0).toUpperCase() + method.slice(1);
}

function statusLabel(status: PaymentDisplayStatus) {
  if (status === 'pagado') return 'Pagado';
  return status === 'vencido' ? 'Vencido' : 'No pagado';
}

function csvValue(value: string | number | null) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

function getNextWeekRange(today: string) {
  return addCalendarDays(today, 7);
}

function calculateSummary(records: PaymentRecord[], today: string) {
  const month = today.slice(0, 7);
  const nextWeek = getNextWeekRange(today);

  return {
    collected: records
      .filter((record) => record.estado === 'pagado' && record.fechaPago?.startsWith(month))
      .reduce((total, record) => total + record.montoMXN, 0),
    completed: records.filter((record) => record.estado === 'pagado').length,
    pending: records.filter((record) => record.estado === 'no_pagado').length,
    dueSoon: records.filter((record) => (
      record.estado === 'no_pagado'
      && record.proximoPago !== null
      && record.proximoPago >= today
      && record.proximoPago <= nextWeek
    )).length,
  };
}

function filterPayments(
  records: PaymentRecord[],
  search: string,
  dateFrom: string,
  dateTo: string,
  status: PaymentDisplayStatus | 'todos',
  method: PaymentMethod | 'todos',
  today: string,
) {
  const query = search.trim().toLocaleLowerCase('es-MX');

  return records.filter((record) => {
    const matchesSearch = !query
      || record.cliente.toLocaleLowerCase('es-MX').includes(query)
      || record.folioPago.toLocaleLowerCase('es-MX').includes(query);
    const matchesFrom = !dateFrom || (record.fechaPago !== null && record.fechaPago >= dateFrom);
    const matchesTo = !dateTo || (record.fechaPago !== null && record.fechaPago <= dateTo);
    const matchesStatus = status === 'todos' || getDisplayStatus(record, today) === status;
    const matchesMethod = method === 'todos' || record.metodoPago === method;

    return matchesSearch && matchesFrom && matchesTo && matchesStatus && matchesMethod;
  });
}

function StatusBadge({ status, compact = false }: { status: PaymentDisplayStatus; compact?: boolean }) {
  const styles: Record<PaymentDisplayStatus, string> = {
    pagado: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    no_pagado: 'border-amber-300/20 bg-amber-300/[0.08] text-amber-200',
    vencido: 'border-rose-400/25 bg-rose-400/[0.1] text-rose-300',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border ${compact ? 'px-1.5 py-1 text-[11px]' : 'px-2.5 py-1 text-[11px]'} font-semibold ${styles[status]}`}>
      <span aria-hidden="true" className={`${compact ? 'h-1 w-1' : 'h-1.5 w-1.5'} shrink-0 rounded-full bg-current`} />
      {statusLabel(status)}
    </span>
  );
}

function StatCard({
  label,
  value,
  detail,
  icon,
  accent = 'text-[#ff7186]',
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: ReactNode;
  accent?: string;
}) {
  return (
    <article className="rounded-2xl border border-white/[0.07] bg-[#121319] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-[#9b9da8]">{label}</p>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ${accent}`}>
          {icon}
        </span>
      </div>
      <p className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">{value}</p>
      <p className="mt-1 text-[11px] text-[#717684]">{detail}</p>
    </article>
  );
}

function PaymentModal({
  onClose,
  onSave,
  today,
}: {
  onClose: () => void;
  onSave: (form: PaymentForm) => string | null;
  today: string;
}) {
  const [form, setForm] = useState<PaymentForm>(EMPTY_FORM);
  const [error, setError] = useState('');

  const updateField = <K extends keyof PaymentForm>(key: K, value: PaymentForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const amount = Number(form.montoMXN);
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Ingresa un monto mayor que cero.');
      return;
    }
    if (form.fechaPago && form.fechaPago > today) {
      setError('La fecha de pago no puede ser posterior a la fecha de referencia.');
      return;
    }
    if (form.proximoPago && form.fechaPago && form.proximoPago < form.fechaPago) {
      setError('El próximo pago no puede ser anterior a la fecha de pago.');
      return;
    }

    const saveError = onSave({ ...form, montoMXN: amount.toFixed(2) });
    if (saveError) {
      setError(saveError);
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="payment-modal-title" className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-2xl border border-white/[0.09] bg-[#15161c] p-5 shadow-2xl sm:p-6" style={{ scrollbarColor: '#454955 #15161c' }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff7186]">Registro local</span>
            <h2 id="payment-modal-title" className="mt-1 text-lg font-bold text-white">Registrar pago de demostración</h2>
            <p className="mt-1 text-xs leading-relaxed text-[#858894]">Este registro solo actualiza los datos de esta sesión; no procesa ni confirma un cobro real.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar formulario" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl text-[#858894] transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">×</button>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="block text-xs font-medium text-[#c4c5cc]">Folio</span>
              <input required maxLength={50} value={form.folioPago} onChange={(event) => updateField('folioPago', event.target.value)} placeholder="DEMO-2026-1043" className="payment-input" />
            </label>
            <label className="space-y-1.5">
              <span className="block text-xs font-medium text-[#c4c5cc]">Cliente</span>
              <input required value={form.cliente} onChange={(event) => updateField('cliente', event.target.value)} placeholder="Nombre de demostración" className="payment-input" />
            </label>
            <label className="space-y-1.5 sm:col-span-2">
              <span className="block text-xs font-medium text-[#c4c5cc]">Suscripción</span>
              <input required value={form.suscripcion} onChange={(event) => updateField('suscripcion', event.target.value)} placeholder="Plan · periodo" className="payment-input" />
            </label>
            <label className="space-y-1.5">
              <span className="block text-xs font-medium text-[#c4c5cc]">Monto (MXN)</span>
              <input required type="number" min="0.01" step="0.01" value={form.montoMXN} onChange={(event) => updateField('montoMXN', event.target.value)} placeholder="899.00" className="payment-input" />
            </label>
            <label className="space-y-1.5">
              <span className="block text-xs font-medium text-[#c4c5cc]">Método de pago</span>
              <select value={form.metodoPago} onChange={(event) => updateField('metodoPago', event.target.value as PaymentMethod)} className="payment-input">
                {METHODS.map((method) => <option key={method} value={method}>{methodLabel(method)}</option>)}
              </select>
            </label>
            <label className="space-y-1.5">
              <span className="block text-xs font-medium text-[#c4c5cc]">Estado</span>
              <select value={form.estado} onChange={(event) => {
                const estado = event.target.value as PaymentStatus;
                updateField('estado', estado);
                if (estado === 'no_pagado') updateField('fechaPago', '');
              }} className="payment-input">
                <option value="pagado">Pagado</option>
                <option value="no_pagado">No pagado</option>
              </select>
            </label>
            <label className="space-y-1.5">
              <span className="block text-xs font-medium text-[#c4c5cc]">Fecha de pago</span>
              <input type="date" max={today} value={form.fechaPago} onChange={(event) => updateField('fechaPago', event.target.value)} disabled={form.estado === 'no_pagado'} className="payment-input disabled:cursor-not-allowed disabled:opacity-45" />
            </label>
            <label className="space-y-1.5 sm:col-span-2">
              <span className="block text-xs font-medium text-[#c4c5cc]">Próximo pago <span className="text-[#717684]">(opcional)</span></span>
              <input type="date" value={form.proximoPago} onChange={(event) => updateField('proximoPago', event.target.value)} className="payment-input sm:max-w-[calc(50%-0.375rem)]" />
            </label>
          </div>
          {form.estado === 'no_pagado' && <p className="text-[10px] text-[#858894]">El pago pendiente no tendrá fecha de pago completado.</p>}
          {error && <p role="alert" className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-xs text-rose-300">{error}</p>}
          <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="min-h-10 rounded-xl border border-white/[0.1] px-4 text-sm font-semibold text-[#c4c5cc] transition hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">Cancelar</button>
            <button type="submit" className="min-h-10 rounded-xl bg-[#ff3355] px-4 text-sm font-semibold text-white transition hover:bg-[#e92d4d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8495]">Guardar demostración</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function AdminPagosPage() {
  const [records, setRecords] = useState<PaymentRecord[]>(INITIAL_RECORDS);
  const [today, setToday] = useState(INITIAL_TODAY);
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentDisplayStatus | 'todos'>('todos');
  const [methodFilter, setMethodFilter] = useState<PaymentMethod | 'todos'>('todos');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedId, setSelectedId] = useState<string | null>(INITIAL_RECORDS[0]?.id ?? null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const syncLocalDate = () => {
      const localToday = getLocalDateKey();
      setToday((current) => current === localToday ? current : localToday);
    };
    const initialSync = window.setTimeout(syncLocalDate, 0);
    const dateSyncInterval = window.setInterval(syncLocalDate, 60_000);

    return () => {
      window.clearTimeout(initialSync);
      window.clearInterval(dateSyncInterval);
    };
  }, []);

  const filteredRecords = useMemo(() => filterPayments(records, search, dateFrom, dateTo, statusFilter, methodFilter, today), [records, search, dateFrom, dateTo, statusFilter, methodFilter, today]);
  const summary = useMemo(() => calculateSummary(records, today), [records, today]);
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleRecords = filteredRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  // La selección se limita a la página visible para que el panel siempre corresponda a una fila actual.
  const selectedRecord = visibleRecords.find((record) => record.id === selectedId) ?? visibleRecords[0] ?? null;

  const selectFirstMatch = (
    nextSearch: string,
    nextDateFrom: string,
    nextDateTo: string,
    nextStatus: PaymentDisplayStatus | 'todos',
    nextMethod: PaymentMethod | 'todos',
  ) => {
    const matches = filterPayments(records, nextSearch, nextDateFrom, nextDateTo, nextStatus, nextMethod, today);
    const firstPage = matches.slice(0, pageSize);
    setPage(1);
    setSelectedId(firstPage.some((record) => record.id === selectedId) ? selectedId : firstPage[0]?.id ?? null);
  };

  const setSearchAndResetPage = (value: string) => {
    setSearch(value);
    selectFirstMatch(value, dateFrom, dateTo, statusFilter, methodFilter);
  };
  const setDateFromAndResetPage = (value: string) => {
    setDateFrom(value);
    selectFirstMatch(search, value, dateTo, statusFilter, methodFilter);
  };
  const setDateToAndResetPage = (value: string) => {
    setDateTo(value);
    selectFirstMatch(search, dateFrom, value, statusFilter, methodFilter);
  };
  const setStatusAndResetPage = (value: PaymentDisplayStatus | 'todos') => {
    setStatusFilter(value);
    selectFirstMatch(search, dateFrom, dateTo, value, methodFilter);
  };
  const setMethodAndResetPage = (value: PaymentMethod | 'todos') => {
    setMethodFilter(value);
    selectFirstMatch(search, dateFrom, dateTo, statusFilter, value);
  };

  const goToPage = (requestedPage: number) => {
    const nextPage = Math.min(Math.max(requestedPage, 1), totalPages);
    const nextPageRecords = filteredRecords.slice((nextPage - 1) * pageSize, nextPage * pageSize);
    setPage(nextPage);
    setSelectedId(nextPageRecords.some((record) => record.id === selectedId) ? selectedId : nextPageRecords[0]?.id ?? null);
  };

  const clearFilters = () => {
    setSearch('');
    setDateFrom('');
    setDateTo('');
    setStatusFilter('todos');
    setMethodFilter('todos');
    setPage(1);
    const firstPage = records.slice(0, pageSize);
    setSelectedId(firstPage.some((record) => record.id === selectedId) ? selectedId : firstPage[0]?.id ?? null);
  };

  const savePayment = (form: PaymentForm) => {
    const folio = form.folioPago.trim();
    if (!folio || !form.cliente.trim() || !form.suscripcion.trim()) {
      return 'Completa el folio, el cliente y la suscripción.';
    }
    if (records.some((record) => record.folioPago.toLocaleLowerCase('es-MX') === folio.toLocaleLowerCase('es-MX'))) {
      return 'Ese folio ya existe en los datos de demostración.';
    }
    if (form.estado === 'pagado' && !form.fechaPago) {
      return 'Un pago marcado como pagado requiere fecha de pago.';
    }
    if (form.estado === 'no_pagado' && form.fechaPago) {
      return 'Un pago no pagado no puede tener fecha de pago completado.';
    }

    const newRecord: PaymentRecord = {
      id: `demo-${Date.now()}`,
      folioPago: folio,
      cliente: form.cliente.trim(),
      suscripcion: form.suscripcion.trim(),
      fechaPago: form.estado === 'pagado' ? form.fechaPago : null,
      proximoPago: form.proximoPago || null,
      montoMXN: Number(form.montoMXN),
      metodoPago: form.metodoPago,
      estado: form.estado,
    };

    setRecords((current) => [newRecord, ...current]);
    clearFilters();
    setSelectedId(newRecord.id);
    return null;
  };

  const markAsPaid = (record: PaymentRecord) => {
    if (record.estado !== 'no_pagado') return;
    const updated: PaymentRecord = { ...record, estado: 'pagado', fechaPago: today };
    const nextRecords = records.map((item) => item.id === record.id ? updated : item);
    const matches = filterPayments(nextRecords, search, dateFrom, dateTo, statusFilter, methodFilter, today);
    const nextTotalPages = Math.max(1, Math.ceil(matches.length / pageSize));
    const nextPage = Math.min(page, nextTotalPages);
    setRecords(nextRecords);
    setPage(nextPage);
    const nextPageRecords = matches.slice((nextPage - 1) * pageSize, nextPage * pageSize);
    setSelectedId(nextPageRecords.some((item) => item.id === selectedId) ? selectedId : nextPageRecords[0]?.id ?? null);
  };

  const exportCsv = () => {
    const headers = ['Folio', 'Cliente', 'Suscripción', 'Fecha de pago', 'Próximo pago', 'Monto MXN', 'Método', 'Estado'];
    const rows = filteredRecords.map((record) => [
      record.folioPago,
      record.cliente,
      record.suscripcion,
      record.fechaPago ?? 'Pendiente',
      record.proximoPago ?? '—',
      record.montoMXN.toFixed(2),
      methodLabel(record.metodoPago),
      statusLabel(getDisplayStatus(record, today)),
    ]);
    const csv = `\uFEFF${[headers, ...rows].map((row) => row.map(csvValue).join(',')).join('\r\n')}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ironfit-pagos-demo.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="payments-page w-full min-w-0 max-w-none space-y-5 px-4 pb-8 pt-5 sm:px-6 sm:pt-6 lg:px-14 lg:pt-8">
      <header className="flex flex-col gap-4 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Gestión de pagos</h1>
          <p className="mt-1.5 text-sm leading-relaxed text-[#858894]">Supervisa los cobros registrados y los próximos vencimientos de suscripciones.</p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-3 py-1.5 text-[11px] font-semibold text-amber-200">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            Datos de demostración
          </span>
          <button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#ff3355] px-4 text-sm font-semibold text-white shadow-lg shadow-[#ff3355]/15 transition hover:bg-[#e92d4d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8495]">
            <span aria-hidden="true" className="text-lg leading-none">+</span>
            Registrar pago
          </button>
        </div>
      </header>

      <section aria-label="Indicadores de pagos de demostración" className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 2xl:grid-cols-4">
        <StatCard label="Cobrado este mes" value={formatCurrency(summary.collected)} detail={`Pagos completados durante ${formatMonth(today)}`} icon={<IconoWallet className="h-5 w-5" />} />
        <StatCard label="Pagos completados" value={summary.completed} detail="Registros con estado pagado" icon={<IconoTarjetaCredito className="h-5 w-5" />} accent="text-emerald-300" />
        <StatCard label="Pagos pendientes" value={summary.pending} detail="Incluye pagos vencidos" icon={<IconoPerfil className="h-5 w-5" />} accent="text-amber-200" />
        <StatCard label="Próximos vencimientos" value={summary.dueSoon} detail="Próximos siete días" icon={<IconoCalendario className="h-5 w-5" />} accent="text-[#ff8495]" />
      </section>

      <section aria-label="Filtros de movimientos" className="rounded-2xl border border-white/[0.07] bg-[#121319] p-4 sm:p-5">
        <div className="grid items-end gap-3 md:grid-cols-2 2xl:grid-cols-[minmax(220px,1.5fr)_minmax(230px,1.3fr)_minmax(145px,1fr)_minmax(150px,1fr)_auto]">
          <label className="min-w-0">
            <span className="mb-1 block text-[11px] font-medium text-[#9b9da8]">Buscar</span>
            <span className="relative block">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717684]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
              <input type="search" value={search} onChange={(event) => setSearchAndResetPage(event.target.value)} aria-label="Buscar por cliente o folio" placeholder="Cliente o folio" className="payment-input pl-10" />
            </span>
          </label>
          <div role="group" aria-label="Intervalo de fecha de pago" className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-2 md:col-span-2 2xl:col-span-1">
            <label className="min-w-0">
              <span className="mb-1 block text-[11px] font-medium text-[#9b9da8]">Desde</span>
              <input type="date" value={dateFrom} onChange={(event) => setDateFromAndResetPage(event.target.value)} aria-label="Fecha de pago desde" className="payment-input min-w-0 px-2" />
            </label>
            <span aria-hidden="true" className="pb-2 text-sm text-[#858894]">—</span>
            <label className="min-w-0">
              <span className="mb-1 block text-[11px] font-medium text-[#9b9da8]">Hasta</span>
              <input type="date" value={dateTo} onChange={(event) => setDateToAndResetPage(event.target.value)} aria-label="Fecha de pago hasta" className="payment-input min-w-0 px-2" />
            </label>
          </div>
          <label className="min-w-0">
            <span className="mb-1 block text-[11px] font-medium text-[#9b9da8]">Estado</span>
            <select value={statusFilter} onChange={(event) => setStatusAndResetPage(event.target.value as PaymentDisplayStatus | 'todos')} className="payment-input">
              <option value="todos">Todos los estados</option>
              <option value="pagado">Pagado</option>
              <option value="no_pagado">No pagado</option>
              <option value="vencido">Vencido</option>
            </select>
          </label>
          <label className="min-w-0">
            <span className="mb-1 block text-[11px] font-medium text-[#9b9da8]">Método de pago</span>
            <select value={methodFilter} onChange={(event) => setMethodAndResetPage(event.target.value as PaymentMethod | 'todos')} className="payment-input">
              <option value="todos">Todos los métodos</option>
              {METHODS.map((method) => <option key={method} value={method}>{methodLabel(method)}</option>)}
            </select>
          </label>
          <div className="flex flex-wrap items-end gap-2 md:col-span-2 2xl:col-span-1 2xl:justify-end">
            <button type="button" onClick={clearFilters} className="min-h-10 flex-1 rounded-xl border border-white/[0.1] px-3 text-xs font-semibold text-[#b4b5bd] transition hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186] sm:flex-none">Limpiar filtros</button>
            <button type="button" onClick={exportCsv} disabled={!filteredRecords.length} className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-[#ff4964]/25 px-3 text-xs font-semibold text-[#ff8495] transition hover:bg-[#ff3355]/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186] sm:flex-none">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" /></svg>
              Exportar CSV
            </button>
          </div>
        </div>
        <p className="mt-3 text-[11px] text-[#626572]">El intervalo se aplica a la fecha de pago. Los movimientos pendientes sin fecha no aparecen al filtrar por fechas.</p>
      </section>

      <section aria-label="Movimientos y detalle de pago" className="grid w-full min-w-0 grid-cols-1 gap-4 min-[1600px]:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#121319]">
          <div className="flex flex-col gap-3 border-b border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <h2 className="text-base font-bold text-white">Movimientos de pago</h2>
              <p className="mt-1 text-xs text-[#717684]">{filteredRecords.length} resultado{filteredRecords.length === 1 ? '' : 's'}</p>
            </div>
            <label className="flex items-center gap-2 text-xs text-[#858894]">
              <span>Mostrar</span>
              <select value={pageSize} onChange={(event) => {
                const size = Number(event.target.value);
                const firstPage = filteredRecords.slice(0, size);
                setPageSize(size);
                setPage(1);
                setSelectedId(firstPage.some((record) => record.id === selectedId) ? selectedId : firstPage[0]?.id ?? null);
              }} aria-label="Registros por página" className="rounded-lg border border-white/[0.1] bg-[#0f1015] px-2 py-1.5 text-xs text-white outline-none focus:border-[#ff4964]/70">
                {PAGE_SIZE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
              <span>por página</span>
            </label>
          </div>

          {visibleRecords.length ? (
            <div className="payment-table-scroll overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff7186]" role="region" aria-label="Tabla desplazable de movimientos de pago" tabIndex={0}>
              <table className="w-full min-w-[860px] table-fixed text-left text-xs">
                <caption className="sr-only">Movimientos de pago de demostración</caption>
                <colgroup>
                  <col className="w-[13%]" />
                  <col className="w-[16%]" />
                  <col className="w-[17%]" />
                  <col className="w-[12%]" />
                  <col className="w-[12%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                  <col className="w-[10%]" />
                </colgroup>
                <thead className="border-b border-white/[0.07] bg-white/[0.015] text-xs uppercase tracking-[0.08em] text-[#858894]">
                  <tr>
                    <th scope="col" className="px-1.5 py-3 font-semibold">Folio</th>
                    <th scope="col" className="px-1.5 py-3 font-semibold">Cliente</th>
                    <th scope="col" className="px-1.5 py-3 font-semibold">Suscripción</th>
                    <th scope="col" className="px-1.5 py-3 font-semibold">Fecha de pago</th>
                    <th scope="col" className="px-1.5 py-3 font-semibold">Próximo pago</th>
                    <th scope="col" className="px-1.5 py-3 text-right font-semibold">Monto</th>
                    <th scope="col" className="px-1.5 py-3 font-semibold">Método</th>
                    <th scope="col" className="px-1.5 py-3 font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {visibleRecords.map((record) => (
                    <tr
                      key={record.id}
                      tabIndex={0}
                      aria-selected={selectedRecord?.id === record.id}
                      onClick={() => setSelectedId(record.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setSelectedId(record.id);
                        }
                      }}
                      className={`cursor-pointer transition-colors hover:bg-white/[0.025] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff7186] ${selectedRecord?.id === record.id ? 'bg-[#ff3355]/[0.045]' : ''}`}
                    >
                      <td className="wrap-break-word px-2 py-3.5 font-mono text-xs font-semibold text-[#ff8495]">{record.folioPago}</td>
                      <td className="px-2 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ff3355]/10 text-[#ff7186]"><IconoPerfil className="h-3.5 w-3.5" /></span>
                          <span className="min-w-0 wrap-break-word font-medium text-white">{record.cliente}</span>
                        </div>
                      </td>
                      <td className="wrap-break-word px-2 py-3.5 text-xs leading-snug text-[#b4b5bd]">{record.suscripcion}</td>
                      <td className="whitespace-nowrap px-2 py-3.5 text-xs text-[#b4b5bd]">{record.fechaPago ? formatDate(record.fechaPago) : 'Pendiente'}</td>
                      <td className="whitespace-nowrap px-2 py-3.5 text-xs text-[#b4b5bd]">{formatDate(record.proximoPago)}</td>
                      <td className="whitespace-nowrap px-2 py-3.5 text-right text-xs font-semibold text-white">{formatCurrency(record.montoMXN)}</td>
                      <td className="wrap-break-word px-2 py-3.5 text-xs leading-snug text-[#b4b5bd]">{methodLabel(record.metodoPago)}</td>
                      <td className="px-2 py-3.5"><StatusBadge status={getDisplayStatus(record, today)} compact /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-[#717684]"><IconoTarjetaCredito className="h-6 w-6" /></div>
              <h3 className="mt-4 text-sm font-semibold text-white">No hay pagos que coincidan</h3>
              <p className="mt-1 text-xs text-[#717684]">Cambia los criterios o limpia los filtros para ver movimientos.</p>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-[#717684]">Página {currentPage} de {totalPages}</p>
            <div className="flex items-center gap-1" aria-label="Paginación">
              <button type="button" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} aria-label="Página anterior" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-[#858894] transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">‹</button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button key={pageNumber} type="button" onClick={() => goToPage(pageNumber)} aria-label={`Ir a página ${pageNumber}`} aria-current={pageNumber === currentPage ? 'page' : undefined} className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186] ${pageNumber === currentPage ? 'bg-[#ff3355] text-white' : 'text-[#858894] hover:bg-white/[0.05] hover:text-white'}`}>{pageNumber}</button>
              ))}
              <button type="button" disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)} aria-label="Página siguiente" className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-[#858894] transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">›</button>
            </div>
          </div>
        </div>

        <aside aria-label="Detalle del movimiento seleccionado" className="min-w-0 self-start rounded-2xl border border-white/[0.07] bg-[#121319] p-4 sm:p-5 min-[1600px]:sticky min-[1600px]:top-5">
          {selectedRecord ? (
            <>
              <div className="flex items-start justify-between gap-3 border-b border-white/[0.07] pb-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff7186]">Detalle del movimiento</p>
                  <h2 className="mt-1 break-all font-mono text-sm font-semibold text-white">{selectedRecord.folioPago}</h2>
                </div>
                <StatusBadge status={getDisplayStatus(selectedRecord, today)} />
              </div>
              <div className="mt-4 rounded-xl border border-[#ff4964]/15 bg-gradient-to-br from-[#ff3355]/[0.08] to-transparent p-4">
                <p className="text-xs text-[#858894]">Monto del registro</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-white">{formatCurrency(selectedRecord.montoMXN)}</p>
                <p className="mt-1 text-[11px] text-[#717684]">Monto en MXN · demostración</p>
              </div>
              <dl className="mt-4 space-y-3">
                <DetailRow label="Cliente" value={selectedRecord.cliente} />
                <DetailRow label="Suscripción" value={selectedRecord.suscripcion} />
                <DetailRow label="Método de pago" value={methodLabel(selectedRecord.metodoPago)} />
                <DetailRow label="Fecha de pago" value={formatDate(selectedRecord.fechaPago)} />
                <DetailRow label="Próximo pago" value={formatDate(selectedRecord.proximoPago)} />
                <DetailRow label="Estado" value={statusLabel(getDisplayStatus(selectedRecord, today))} />
              </dl>
              <div className="mt-5 rounded-xl border border-white/[0.07] bg-[#0f1015] p-3">
                <p className="text-xs font-semibold text-[#c4c5cc]">Revisión local</p>
                <p className="mt-1 text-[11px] leading-relaxed text-[#717684]">Las acciones solo cambian los datos de demostración en esta pantalla.</p>
                {selectedRecord.estado === 'no_pagado' ? (
                  <button type="button" onClick={() => markAsPaid(selectedRecord)} className="mt-3 min-h-10 w-full rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] px-3 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-400/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">Marcar pagado · demo</button>
                ) : (
                  <p className="mt-3 rounded-lg border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-2 text-center text-[11px] text-emerald-200">Movimiento marcado pagado en la maqueta</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-[#858894]">Selecciona un movimiento para consultar su detalle.</p>
          )}
        </aside>
      </section>

      <p className="text-center text-[11px] text-[#626572]">IRONFIT · Datos ficticios de demostración · No se procesan cobros</p>
      {isModalOpen && <PaymentModal onClose={() => setIsModalOpen(false)} onSave={savePayment} today={today} />}

      <style jsx global>{`
        .payment-input {
          min-height: 2.5rem;
          width: 100%;
          border: 1px solid rgb(255 255 255 / 0.1);
          border-radius: 0.75rem;
          background: #0f1015;
          padding: 0 0.75rem;
          color: #fff;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }
        .payment-input::placeholder { color: #626572; }
        .payment-input:focus { border-color: rgb(255 73 100 / 0.7); box-shadow: 0 0 0 2px rgb(255 73 100 / 0.2); }
        .payment-input:disabled { cursor: not-allowed; opacity: 0.45; }
        select.payment-input { color-scheme: dark; }
        input[type='date'].payment-input { color-scheme: dark; }
        .payment-table-scroll { scrollbar-color: #3a3c46 #0f1015; scrollbar-width: thin; }
        .payment-table-scroll::-webkit-scrollbar { height: 8px; }
        .payment-table-scroll::-webkit-scrollbar-track { background: #0f1015; }
        .payment-table-scroll::-webkit-scrollbar-thumb { border: 2px solid #0f1015; border-radius: 999px; background: #3a3c46; }
        .payment-table-scroll::-webkit-scrollbar-thumb:hover { background: #555762; }
      `}</style>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/[0.045] pb-2.5 last:border-b-0 last:pb-0">
      <dt className="shrink-0 text-[11px] text-[#717684]">{label}</dt>
      <dd className="min-w-0 break-words text-right text-xs font-medium text-[#d5d6dc]">{value}</dd>
    </div>
  );
}
