'use client';

import { useMemo, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import { IconoCalendario } from '@/components/icons/IconoCalendario';
import { IconoCalorias } from '@/components/icons/IconoCalorias';
import { IconoPerfil } from '@/components/icons/IconoPerfil';

type EventStatus = 'programado' | 'realizado' | 'cancelado';
type AgendaPeriod = 'proximos' | 'semana' | 'mes';
type EventDisplay = 'agenda' | 'lista';
type EventType = 'Taller' | 'Competencia' | 'Convivencia' | 'Jornada especial' | 'Evaluación';
type EventCategory = 'Bienestar' | 'Rendimiento' | 'Comunidad' | 'Salud';

// El backend modela id, nombre, fecha y duración. Tipo, categoría, salón y
// cancelación son metadatos locales de esta maqueta, no campos de la entidad.
type DemoEvent = {
  id: number;
  name: string;
  date: string;
  durationMinutes: number;
  demoType: EventType;
  demoCategory: EventCategory;
  demoVenue: string;
  demoCancelled: boolean;
};

type EventFormValues = {
  name: string;
  date: string;
  durationMinutes: string;
  type: EventType;
  category: EventCategory;
  venue: string;
};

const eventTypes: EventType[] = ['Taller', 'Competencia', 'Convivencia', 'Jornada especial', 'Evaluación'];
const eventCategories: EventCategory[] = ['Bienestar', 'Rendimiento', 'Comunidad', 'Salud'];
const demoVenues = ['Salón Norte', 'Área funcional', 'Terraza'];

function dateInMexicoCity(offsetDays = 0) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const year = Number(parts.find((part) => part.type === 'year')?.value);
  const month = Number(parts.find((part) => part.type === 'month')?.value);
  const day = Number(parts.find((part) => part.type === 'day')?.value);
  const date = new Date(year, month - 1, day + offsetDays, 12);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function makeInitialEvents(): DemoEvent[] {
  return [
    { id: 1, name: 'Taller de nutrición deportiva', date: dateInMexicoCity(4), durationMinutes: 90, demoType: 'Taller', demoCategory: 'Bienestar', demoVenue: 'Salón Norte', demoCancelled: false },
    { id: 2, name: 'Reto de fuerza IRONFIT', date: dateInMexicoCity(12), durationMinutes: 180, demoType: 'Competencia', demoCategory: 'Rendimiento', demoVenue: 'Área funcional', demoCancelled: false },
    { id: 3, name: 'Jornada de evaluación física', date: dateInMexicoCity(2), durationMinutes: 120, demoType: 'Evaluación', demoCategory: 'Salud', demoVenue: 'Salón Norte', demoCancelled: false },
    { id: 4, name: 'Encuentro de movilidad', date: dateInMexicoCity(8), durationMinutes: 75, demoType: 'Jornada especial', demoCategory: 'Bienestar', demoVenue: 'Terraza', demoCancelled: false },
    { id: 5, name: 'Convivencia de aniversario', date: dateInMexicoCity(-18), durationMinutes: 150, demoType: 'Convivencia', demoCategory: 'Comunidad', demoVenue: 'Terraza', demoCancelled: false },
    { id: 6, name: 'Clínica de levantamiento', date: dateInMexicoCity(20), durationMinutes: 105, demoType: 'Taller', demoCategory: 'Rendimiento', demoVenue: 'Área funcional', demoCancelled: false },
    { id: 7, name: 'Plática de recuperación', date: dateInMexicoCity(6), durationMinutes: 60, demoType: 'Jornada especial', demoCategory: 'Salud', demoVenue: 'Salón Norte', demoCancelled: true },
    { id: 8, name: 'Circuito solidario', date: dateInMexicoCity(15), durationMinutes: 120, demoType: 'Competencia', demoCategory: 'Comunidad', demoVenue: 'Área funcional', demoCancelled: false },
  ];
}

function getEventStatus(event: DemoEvent, today: string): EventStatus {
  if (event.demoCancelled) return 'cancelado';
  return event.date < today ? 'realizado' : 'programado';
}

function formatDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(new Date(year, month - 1, day, 12));
}

function formatDay(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })
    .format(new Date(year, month - 1, day, 12));
}

function dateToIso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function calendarDates(month: string) {
  const [year, monthNumber] = month.split('-').map(Number);
  const firstOfMonth = new Date(year, monthNumber - 1, 1, 12);
  const firstVisible = new Date(year, monthNumber - 1, 1 - firstOfMonth.getDay(), 12);
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(firstVisible);
    date.setDate(firstVisible.getDate() + index);
    return { value: dateToIso(date), day: date.getDate(), currentMonth: date.getMonth() === monthNumber - 1 };
  });
}

function isValidDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [, year, month, day] = match.map(Number) as [number, number, number, number];
  const date = new Date(year, month - 1, day, 12);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function sortEvents(events: DemoEvent[]) {
  return [...events].sort((first, second) => first.date.localeCompare(second.date) || first.name.localeCompare(second.name, 'es-MX'));
}

function filterEvents(
  events: DemoEvent[],
  filters: { search: string; date: string; type: EventType | ''; status: EventStatus | ''; venue: string },
  today: string,
) {
  const query = filters.search.trim().toLocaleLowerCase('es-MX');
  return sortEvents(events.filter((event) => {
    const matchesSearch = !query || `${event.name} ${event.demoCategory} ${event.demoVenue}`.toLocaleLowerCase('es-MX').includes(query);
    const matchesDate = !filters.date || event.date === filters.date;
    const matchesType = !filters.type || event.demoType === filters.type;
    const matchesStatus = !filters.status || getEventStatus(event, today) === filters.status;
    const matchesVenue = !filters.venue || event.demoVenue === filters.venue;
    return matchesSearch && matchesDate && matchesType && matchesStatus && matchesVenue;
  }));
}

function applyAgendaPeriod(events: DemoEvent[], period: AgendaPeriod, today: string, month: string, hasExactDate: boolean) {
  if (hasExactDate || period === 'proximos') return events;
  if (period === 'semana') {
    const lastDay = dateInMexicoCity(6);
    return events.filter((event) => event.date >= today && event.date <= lastDay);
  }
  return events.filter((event) => event.date.startsWith(month.slice(0, 7)));
}

const statusLabels: Record<EventStatus, string> = {
  programado: 'Programado',
  realizado: 'Realizado',
  cancelado: 'Cancelado',
};

const statusStyles: Record<EventStatus, string> = {
  programado: 'border-sky-400/20 bg-sky-400/10 text-sky-300',
  realizado: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  cancelado: 'border-rose-400/20 bg-rose-400/10 text-rose-300',
};

const fieldClassName = 'w-full rounded-xl border border-white/10 bg-[#111319] px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-[#ff4964]/60 focus:ring-2 focus:ring-[#ff4964]/15';
const labelClassName = 'mb-1.5 block text-sm font-medium text-[#b3b6c0]';

function StatusBadge({ status }: { status: EventStatus }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}>{statusLabels[status]}</span>;
}

function StatCard({ title, value, description, icon, accent }: { title: string; value: string; description: string; icon: ReactNode; accent: string }) {
  return (
    <article className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#101116] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#9b9da8]">{title}</p>
          <p className="mt-3 text-2xl font-bold tracking-tight text-white">{value}</p>
        </div>
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${accent}`}>{icon}</span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-[#858a96]">{description}</p>
    </article>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
      <span aria-hidden="true" className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-[#898d99]">
        <IconoCalendario className="h-5 w-5" />
      </span>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-[#858a96]">{description}</p>
    </div>
  );
}

function ModalShell({ title, description, onClose, children }: { title: string; description: string; onClose: () => void; children: ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
      onKeyDown={(event) => { if (event.key === 'Escape') onClose(); }}
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="event-modal-title" aria-describedby="event-modal-description" className="my-auto w-full max-w-xl rounded-2xl border border-white/10 bg-[#121319] p-5 shadow-2xl sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 id="event-modal-title" className="text-lg font-semibold text-white">{title}</h2>
            <p id="event-modal-description" className="mt-1 text-sm leading-relaxed text-[#8a8e99]">{description}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar formulario" className="shrink-0 rounded-lg p-1.5 text-[#8b8f9a] hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-xl border border-white/[0.055] bg-white/[0.018] px-3 py-2.5"><p className="text-xs font-medium uppercase tracking-[0.08em] text-[#858a96]">{label}</p><p className="mt-1.5 break-words text-sm font-medium text-[#d7d8de]">{value}</p></div>;
}

export default function EventosPage() {
  const [events, setEvents] = useState<DemoEvent[]>(makeInitialEvents);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(1);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<EventType | ''>('');
  const [statusFilter, setStatusFilter] = useState<EventStatus | ''>('');
  const [venueFilter, setVenueFilter] = useState('');
  const [agendaPeriod, setAgendaPeriod] = useState<AgendaPeriod>('proximos');
  const [eventDisplay, setEventDisplay] = useState<EventDisplay>('agenda');
  const [calendarMonth, setCalendarMonth] = useState(() => `${dateInMexicoCity().slice(0, 7)}-01`);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [dialog, setDialog] = useState<'new' | 'edit' | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [cancelTarget, setCancelTarget] = useState<DemoEvent | null>(null);
  const [form, setForm] = useState<EventFormValues>({
    name: '', date: dateInMexicoCity(), durationMinutes: '60', type: 'Taller', category: 'Bienestar', venue: demoVenues[0],
  });
  const [formError, setFormError] = useState('');
  const today = dateInMexicoCity();

  const baseFilteredEvents = useMemo(() => filterEvents(events, {
    search,
    date: dateFilter,
    type: typeFilter,
    status: statusFilter,
    venue: venueFilter,
  }, today), [events, search, dateFilter, typeFilter, statusFilter, venueFilter, today]);
  const filteredEvents = useMemo(
    () => applyAgendaPeriod(baseFilteredEvents, agendaPeriod, today, calendarMonth, Boolean(dateFilter)),
    [baseFilteredEvents, agendaPeriod, today, calendarMonth, dateFilter],
  );

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / pageSize));
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  const visibleEvents = useMemo(
    () => filteredEvents.slice((safePage - 1) * pageSize, safePage * pageSize),
    [filteredEvents, safePage, pageSize],
  );
  const effectiveSelectedId = visibleEvents.some((event) => event.id === selectedEventId)
    ? selectedEventId
    : visibleEvents[0]?.id ?? null;
  const selectedEvent = events.find((event) => event.id === effectiveSelectedId) ?? null;
  const selectedStatus = selectedEvent ? getEventStatus(selectedEvent, today) : null;

  const upcomingCount = events.filter((event) => getEventStatus(event, today) === 'programado').length;
  const monthCount = events.filter((event) => event.date.startsWith(today.slice(0, 7))).length;
  const completedCount = events.filter((event) => getEventStatus(event, today) === 'realizado').length;
  const cancelledCount = events.filter((event) => getEventStatus(event, today) === 'cancelado').length;
  const monthDays = useMemo(() => calendarDates(calendarMonth), [calendarMonth]);
  const nextEvents = sortEvents(events.filter((event) => event.date >= today && getEventStatus(event, today) === 'programado')).slice(0, 4);
  const agendaEvents = agendaPeriod === 'proximos'
    ? [...visibleEvents.filter((event) => event.date >= today), ...visibleEvents.filter((event) => event.date < today).sort((a, b) => b.date.localeCompare(a.date))]
    : visibleEvents;
  const agendaGroups = agendaEvents.reduce<Array<{ date: string; events: DemoEvent[] }>>((groups, event) => {
    const existing = groups.find((group) => group.date === event.date);
    if (existing) existing.events.push(event);
    else groups.push({ date: event.date, events: [event] });
    return groups;
  }, []);
  const firstResult = filteredEvents.length ? (safePage - 1) * pageSize + 1 : 0;
  const lastResult = Math.min(safePage * pageSize, filteredEvents.length);

  function resetForm(event?: DemoEvent) {
    setForm(event ? {
      name: event.name,
      date: event.date,
      durationMinutes: String(event.durationMinutes),
      type: event.demoType,
      category: event.demoCategory,
      venue: event.demoVenue,
    } : {
      name: '', date: dateInMexicoCity(), durationMinutes: '60', type: 'Taller', category: 'Bienestar', venue: demoVenues[0],
    });
    setFormError('');
  }

  function openNewEvent() {
    setEditingId(null);
    resetForm();
    setDialog('new');
  }

  function openEditEvent(event: DemoEvent) {
    setSelectedEventId(event.id);
    setEditingId(event.id);
    resetForm(event);
    setDialog('edit');
  }

  function clearFilters() {
    setSearch('');
    setDateFilter('');
    setTypeFilter('');
    setStatusFilter('');
    setVenueFilter('');
    setCurrentPage(1);
  }

  function changePeriod(period: AgendaPeriod) {
    setAgendaPeriod(period);
    setDateFilter('');
    setCurrentPage(1);
  }

  function changeCalendarMonth(direction: -1 | 1) {
    const [year, month] = calendarMonth.split('-').map(Number);
    const nextMonth = new Date(year, month - 1 + direction, 1, 12);
    setCalendarMonth(`${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}-01`);
    setDateFilter('');
    setCurrentPage(1);
  }

  function chooseCalendarDate(value: string) {
    setDateFilter((current) => current === value ? '' : value);
    if (value.slice(0, 7) !== calendarMonth.slice(0, 7)) setCalendarMonth(`${value.slice(0, 7)}-01`);
    setCurrentPage(1);
  }

  function submitEvent(submit: FormEvent<HTMLFormElement>) {
    submit.preventDefault();
    const name = form.name.trim();
    const durationMinutes = Number(form.durationMinutes);
    if (!name || !isValidDate(form.date) || !Number.isInteger(durationMinutes) || durationMinutes <= 0 || !form.type || !form.category || !demoVenues.includes(form.venue)) {
      setFormError('Ingresa un nombre, fecha válida, duración positiva y completa los datos de demostración.');
      return;
    }
    if (name.length > 150) {
      setFormError('El nombre no puede superar los 150 caracteres.');
      return;
    }
    if (events.some((event) => event.id !== editingId && event.name.toLocaleLowerCase('es-MX') === name.toLocaleLowerCase('es-MX'))) {
      setFormError('Ya existe un evento de demostración con ese nombre.');
      return;
    }

    const values = {
      name,
      date: form.date,
      durationMinutes,
      demoType: form.type,
      demoCategory: form.category,
      demoVenue: form.venue,
    };

    if (dialog === 'edit' && editingId !== null) {
      const nextEvents = events.map((event) => event.id === editingId ? { ...event, ...values } : event);
      const nextFilteredEvents = filterEvents(nextEvents, {
        search,
        date: dateFilter,
        type: typeFilter,
        status: statusFilter,
        venue: venueFilter,
      }, today);
      const selectedIndex = applyAgendaPeriod(nextFilteredEvents, agendaPeriod, today, calendarMonth, Boolean(dateFilter)).findIndex((event) => event.id === editingId);
      setEvents(nextEvents);
      setSelectedEventId(editingId);
      setCurrentPage(selectedIndex < 0 ? 1 : Math.floor(selectedIndex / pageSize) + 1);
    } else {
      const nextId = Math.max(0, ...events.map((event) => event.id)) + 1;
      const nextEvent: DemoEvent = { id: nextId, ...values, demoCancelled: false };
      const nextEvents = [...events, nextEvent];
      const nextSortedEvents = sortEvents(nextEvents);
      const selectedIndex = nextSortedEvents.findIndex((event) => event.id === nextId);
      setEvents(nextEvents);
      setSelectedEventId(nextId);
      clearFilters();
      setAgendaPeriod('proximos');
      setCurrentPage(Math.floor(selectedIndex / pageSize) + 1);
    }

    setDialog(null);
    setEditingId(null);
    setFormError('');
  }

  function confirmCancelEvent() {
    if (!cancelTarget) return;
    setEvents((current) => current.map((event) => event.id === cancelTarget.id ? { ...event, demoCancelled: true } : event));
    setSelectedEventId(cancelTarget.id);
    setCancelTarget(null);
  }

  function selectEvent(event: DemoEvent) {
    setSelectedEventId(event.id);
  }

  function handleRowKeyDown(keyEvent: KeyboardEvent<HTMLTableRowElement>, event: DemoEvent) {
    if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
      keyEvent.preventDefault();
      selectEvent(event);
    }
  }

  const calendarTitle = new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric' }).format(
    new Date(Number(calendarMonth.slice(0, 4)), Number(calendarMonth.slice(5, 7)) - 1, 1, 12),
  );

  return (
    <div className="w-full min-w-0 space-y-6 px-4 pb-8 pt-5 text-white sm:px-6 sm:pt-6 lg:px-14 lg:pt-8">
      <section className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.08] px-3 py-1.5 text-xs font-semibold text-amber-200"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-300" />Datos de demostración</span>
            <span className="text-xs text-[#858a96]">Los cambios son temporales y solo se conservan en esta vista.</span>
          </div>
          <h1 className="text-[24px] font-bold tracking-tight text-white sm:text-[28px]">Gestión de eventos</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#9296a2]">Consulta la agenda y administra las actividades del gimnasio</p>
        </div>
        <div className="flex flex-wrap gap-2 self-start xl:self-auto">
          <button type="button" onClick={() => setQuickViewOpen(true)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.025] px-4 text-sm font-semibold text-[#d5d6dc] transition hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]"><IconoCalendario className="h-4 w-4" />Vista rápida</button>
          <button type="button" onClick={openNewEvent} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#ff3355] px-4 text-sm font-semibold text-white shadow-lg shadow-[#ff3355]/15 transition hover:bg-[#ff4964] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9aaa]"><svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>Nuevo evento</button>
        </div>
      </section>

      <section aria-label="Resumen de eventos" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Próximos eventos" value={String(upcomingCount)} description="Programados para hoy o una fecha futura" icon={<IconoCalendario className="h-5 w-5" />} accent="border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300" />
        <StatCard title="Eventos de este mes" value={String(monthCount)} description="Registros locales en el mes actual" icon={<span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff7186] shadow-[0_0_12px_rgba(255,113,134,.5)]" />} accent="border-[#ff4964]/20 bg-[#ff4964]/[0.08] text-[#ff7186]" />
        <StatCard title="Realizados" value={String(completedCount)} description="Fechas anteriores que no se cancelaron" icon={<IconoCalorias className="h-5 w-5" />} accent="border-violet-400/20 bg-violet-400/[0.08] text-violet-300" />
        <StatCard title="Cancelados" value={String(cancelledCount)} description="Cancelaciones locales de demostración" icon={<IconoPerfil className="h-5 w-5" />} accent="border-rose-400/20 bg-rose-400/[0.08] text-rose-300" />
      </section>

      <section aria-label="Controles de agenda" className="space-y-4 rounded-2xl border border-white/[0.07] bg-[#101116] p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex w-fit max-w-full rounded-xl border border-white/[0.08] bg-[#0b0c11] p-1" role="group" aria-label="Periodo de agenda">
            {([['proximos', 'Próximos'], ['semana', 'Semana'], ['mes', 'Mes']] as const).map(([period, label]) => <button key={period} type="button" aria-pressed={agendaPeriod === period} onClick={() => changePeriod(period)} className={`min-h-9 rounded-lg px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186] ${agendaPeriod === period ? 'bg-[#ff3355]/15 text-[#ff8798]' : 'text-[#a4a7b1] hover:bg-white/[0.05] hover:text-white'}`}>{label}</button>)}
          </div>
          <div className="inline-flex w-fit rounded-xl border border-white/[0.08] bg-[#0b0c11] p-1" role="group" aria-label="Presentación de eventos">
            {([['agenda', 'Agenda'], ['lista', 'Lista']] as const).map(([display, label]) => <button key={display} type="button" aria-pressed={eventDisplay === display} onClick={() => setEventDisplay(display)} className={`min-h-9 rounded-lg px-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186] ${eventDisplay === display ? 'bg-white/[0.09] text-white' : 'text-[#9296a2] hover:text-white'}`}>{label}</button>)}
          </div>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1.5fr)_minmax(170px,1fr)_minmax(160px,1fr)_minmax(160px,1fr)_auto] xl:items-end">
          <label className="min-w-0"><span className={labelClassName}>Buscar por nombre o espacio</span><span className="relative block"><svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#707583]" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg><input aria-label="Buscar por nombre, categoría o espacio" value={search} onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }} className={`${fieldClassName} pl-9`} placeholder="Nombre o espacio" /></span></label>
          <label className="min-w-0"><span className={labelClassName}>Espacio (demo)</span><select aria-label="Filtrar por espacio de demostración" value={venueFilter} onChange={(event) => { setVenueFilter(event.target.value); setCurrentPage(1); }} className={fieldClassName}><option value="">Todos los espacios</option>{demoVenues.map((venue) => <option key={venue} value={venue}>{venue}</option>)}</select></label>
          <label className="min-w-0"><span className={labelClassName}>Tipo de evento (demo)</span><select aria-label="Filtrar por tipo" value={typeFilter} onChange={(event) => { setTypeFilter(event.target.value as EventType | ''); setCurrentPage(1); }} className={fieldClassName}><option value="">Todos los tipos</option>{eventTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
          <label className="min-w-0"><span className={labelClassName}>Estado (demo)</span><select aria-label="Filtrar por estado" value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value as EventStatus | ''); setCurrentPage(1); }} className={fieldClassName}><option value="">Todos los estados</option>{(Object.keys(statusLabels) as EventStatus[]).map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></label>
          <button type="button" onClick={clearFilters} className="min-h-11 rounded-xl border border-white/[0.09] px-3.5 text-sm font-semibold text-[#b9bbc3] transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186] sm:col-span-2 xl:col-span-1">Limpiar filtros</button>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#9296a2]">
          <span>{filteredEvents.length} eventos coincidentes</span>
          {dateFilter && <><span aria-hidden="true" className="text-[#565a66]">·</span><span>Fecha: {formatDate(dateFilter)}</span><button type="button" onClick={() => { setDateFilter(''); setCurrentPage(1); }} className="rounded-md px-1.5 py-0.5 font-semibold text-[#ff8798] hover:bg-[#ff4964]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">Quitar día</button></>}
          <span className="ml-auto text-[#737783]">Espacios, tipo, categoría y estado son datos de demostración</span>
        </div>
      </section>

      <section className="grid min-w-0 grid-cols-1 items-start gap-5 min-[1520px]:grid-cols-[minmax(0,1fr)_340px] min-[1520px]:gap-6">
        <div id="event-agenda" className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101116]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] p-4 sm:p-5">
            <div><h2 className="text-base font-semibold text-white">{eventDisplay === 'agenda' ? 'Agenda de eventos' : 'Lista de eventos'}</h2><p className="mt-1 text-sm text-[#838794]">{agendaPeriod === 'mes' ? `Eventos de ${calendarTitle}` : agendaPeriod === 'semana' ? 'Eventos de los próximos siete días' : 'Próximos primero; fechas pasadas al final'}</p></div>
            <span className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-xs text-[#a5a8b1]">{filteredEvents.length} resultados</span>
          </div>

          {eventDisplay === 'agenda' ? (
            <div className="space-y-5 p-4 sm:p-5">
              {agendaGroups.map((group) => {
                const past = group.date < today;
                return <section key={group.date} aria-label={formatDay(group.date)} className={past ? 'opacity-60' : ''}>
                  <div className="mb-3 flex items-center gap-3"><span className={`h-2 w-2 rounded-full ${past ? 'bg-[#777b86]' : 'bg-[#ff4964] shadow-[0_0_10px_rgba(255,73,100,.55)]'}`} /><h3 className={`text-sm font-semibold capitalize ${past ? 'text-[#9a9da6]' : 'text-[#e2e3e8]'}`}>{formatDay(group.date)}</h3><span className="h-px flex-1 bg-white/[0.07]" /><span className="text-xs text-[#777b86]">{group.events.length} {group.events.length === 1 ? 'evento' : 'eventos'}</span></div>
                  <div className="space-y-2.5">{group.events.map((event) => {
                    const status = getEventStatus(event, today);
                    const selected = event.id === selectedEvent?.id;
                    const [year, month, day] = event.date.split('-').map(Number);
                    const shortMonth = new Intl.DateTimeFormat('es-MX', { month: 'short' }).format(new Date(year, month - 1, day, 12));
                    return <button key={event.id} type="button" aria-pressed={selected} onClick={() => selectEvent(event)} className={`grid w-full min-w-0 grid-cols-[58px_minmax(0,1fr)] gap-3 rounded-xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186] sm:grid-cols-[68px_minmax(0,1fr)] sm:gap-4 sm:p-4 ${selected ? 'border-[#ff4964]/35 bg-[#ff3355]/[0.075] shadow-[inset_3px_0_0_#ff4964]' : 'border-white/[0.07] bg-[#15161d] hover:border-white/[0.13] hover:bg-white/[0.035]'}`}>
                      <span className="flex flex-col items-center justify-center rounded-lg border border-white/[0.07] bg-black/20 py-2"><span className={`text-xl font-bold leading-none ${selected ? 'text-[#ff8497]' : 'text-[#e0e1e6]'}`}>{day}</span><span className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8f939f]">{shortMonth}</span><span className="mt-1 font-mono text-[10px] text-[#737783]">EV-{String(event.id).padStart(3, '0')}</span></span>
                      <span className="flex min-w-0 flex-col justify-center gap-2"><span className="flex flex-wrap items-start justify-between gap-2"><span className="min-w-0 break-words text-sm font-semibold text-white sm:text-[15px]">{event.name}</span><StatusBadge status={status} /></span><span className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#a0a4af]"><span className="inline-flex items-center gap-1.5"><IconoCalorias className="h-3.5 w-3.5 text-[#ff8497]" />{event.durationMinutes} min</span><span className="inline-flex min-w-0 items-center gap-1.5 break-words"><IconoPerfil className="h-3.5 w-3.5 shrink-0 text-[#ff8497]" />{event.demoVenue}</span><span>{event.demoType} · {event.demoCategory}</span></span></span>
                    </button>;
                  })}</div>
                </section>;
              })}
              {visibleEvents.length === 0 && <EmptyState title="No hay eventos coincidentes" description="Prueba con otra búsqueda o ajusta los filtros para consultar los registros de demostración." />}
            </div>
          ) : (
            <div className="min-w-0 overflow-x-auto" style={{ scrollbarColor: '#454955 #111319' }}><table className="w-full min-w-[760px] border-collapse text-left text-sm"><thead><tr className="border-b border-white/[0.07] bg-white/[0.018] text-xs font-semibold uppercase tracking-[0.08em] text-[#a0a4af]"><th scope="col" className="px-4 py-3">Evento</th><th scope="col" className="px-3 py-3">Fecha</th><th scope="col" className="px-3 py-3">Duración</th><th scope="col" className="px-3 py-3">Espacio</th><th scope="col" className="px-3 py-3">Tipo</th><th scope="col" className="px-4 py-3">Estado</th></tr></thead><tbody className="divide-y divide-white/[0.055]">{visibleEvents.map((event) => { const status = getEventStatus(event, today); const selected = event.id === selectedEvent?.id; return <tr key={event.id} tabIndex={0} aria-selected={selected} onClick={() => selectEvent(event)} onKeyDown={(keyEvent) => handleRowKeyDown(keyEvent, event)} className={`cursor-pointer outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff7186] ${selected ? 'bg-[#ff3355]/[0.075] shadow-[inset_2px_0_0_#ff4964]' : 'hover:bg-white/[0.035]'}`}><td className="max-w-[280px] px-4 py-3.5"><span className="block break-words font-semibold text-[#f0f0f3]">{event.name}</span><span className="mt-1 block text-xs text-[#8e939f]">{event.demoCategory} · demo</span></td><td className="whitespace-nowrap px-3 py-3.5 text-[#c4c6cd]">{formatDate(event.date)}</td><td className="whitespace-nowrap px-3 py-3.5 text-[#c4c6cd]">{event.durationMinutes} min</td><td className="px-3 py-3.5 text-[#b1b4bd]">{event.demoVenue}</td><td className="px-3 py-3.5 text-[#b1b4bd]">{event.demoType}</td><td className="whitespace-nowrap px-4 py-3.5"><StatusBadge status={status} /></td></tr>; })}</tbody></table>{visibleEvents.length === 0 && <EmptyState title="No hay eventos coincidentes" description="Prueba con otra búsqueda o ajusta los filtros para consultar los registros de demostración." />}</div>
          )}

          <div className="flex flex-col gap-3 border-t border-white/[0.07] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5"><p className="text-sm text-[#8d919c]">Mostrando <span className="font-medium text-[#d5d6dc]">{firstResult}–{lastResult}</span> de <span className="font-medium text-[#d5d6dc]">{filteredEvents.length}</span> eventos</p><div className="flex flex-wrap items-center gap-2.5"><label className="flex items-center gap-2 text-sm text-[#8d919c]">Por página<select aria-label="Cantidad de eventos por página" value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setCurrentPage(1); }} className="rounded-lg border border-white/[0.09] bg-[#111319] px-2 py-1.5 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">{[5, 8, 12, 20].map((size) => <option key={size} value={size}>{size}</option>)}</select></label><span className="px-1 text-sm tabular-nums text-[#aaaeb8]">{safePage} / {totalPages}</span><button type="button" aria-label="Página anterior" disabled={safePage <= 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.09] text-[#c2c4cb] hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]"><svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg></button><button type="button" aria-label="Página siguiente" disabled={safePage >= totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.09] text-[#c2c4cb] hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]"><svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg></button></div></div>
        </div>

        <div className="min-w-0 space-y-5">
          <section aria-label="Calendario mensual de eventos" className="rounded-2xl border border-white/[0.07] bg-[#101116] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3"><div><h2 className="text-base font-semibold text-white">Calendario</h2><p className="mt-1 text-sm capitalize text-[#838794]">{calendarTitle}</p></div><div className="flex gap-1"><button type="button" aria-label="Mes anterior" onClick={() => changeCalendarMonth(-1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-[#c2c4cb] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]"><svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg></button><button type="button" aria-label="Mes siguiente" onClick={() => changeCalendarMonth(1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-[#c2c4cb] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]"><svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg></button></div></div>
            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase text-[#727783]">{['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => <span key={`${day}-${index}`} className="py-1">{day}</span>)}</div>
            <div className="mt-1 grid grid-cols-7 gap-1">{monthDays.map(({ value, day, currentMonth }) => { const count = events.filter((event) => event.date === value).length; const selected = dateFilter === value; const isToday = value === today; return <button key={value} type="button" aria-label={`${formatDay(value)}${count ? `, ${count} ${count === 1 ? 'evento' : 'eventos'}` : ', sin eventos'}`} aria-pressed={selected} onClick={() => chooseCalendarDate(value)} className={`relative flex aspect-square min-h-8 flex-col items-center justify-center rounded-lg text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186] ${selected ? 'bg-[#ff3355] font-bold text-white' : isToday ? 'border border-[#ff7186]/50 text-white' : currentMonth ? 'text-[#c7c9d0] hover:bg-white/[0.07]' : 'text-[#555a66] hover:bg-white/[0.04]'}`}>{day}{count > 0 && <span aria-hidden="true" className={`absolute bottom-1 h-1 w-1 rounded-full ${selected ? 'bg-white' : 'bg-[#ff7186]'}`} />}</button>; })}</div>
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.06] pt-3"><span className="inline-flex items-center gap-2 text-xs text-[#8b8f9b]"><span className="h-1.5 w-1.5 rounded-full bg-[#ff7186]" />Días con eventos</span>{dateFilter && <button type="button" onClick={() => { setDateFilter(''); setCurrentPage(1); }} className="text-xs font-semibold text-[#ff8798] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">Limpiar fecha</button>}</div>
          </section>

          <aside aria-label="Detalle del evento seleccionado" className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101116]">
            {selectedEvent && selectedStatus ? <><div className="border-b border-white/[0.07] p-5"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#ff7186]">Detalle del evento</p><h2 className="mt-2 break-words text-lg font-semibold text-white">{selectedEvent.name}</h2><p className="mt-1 font-mono text-xs text-[#858a96]">EV-{String(selectedEvent.id).padStart(3, '0')}</p></div><span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-[#ff7186]"><IconoCalendario className="h-5 w-5" /></span></div><div className="mt-4"><StatusBadge status={selectedStatus} /></div></div><div className="space-y-4 p-5"><div className="grid grid-cols-2 gap-3"><DetailItem label="Fecha" value={formatDate(selectedEvent.date)} /><DetailItem label="Duración" value={`${selectedEvent.durationMinutes} minutos`} /><DetailItem label="Espacio demo" value={selectedEvent.demoVenue} /><DetailItem label="Tipo demo" value={selectedEvent.demoType} /><DetailItem label="Categoría demo" value={selectedEvent.demoCategory} /><DetailItem label="Código local" value={`EV-${String(selectedEvent.id).padStart(3, '0')}`} /></div><div className="rounded-xl border border-sky-300/10 bg-sky-300/[0.035] p-3"><p className="text-xs font-semibold text-sky-200">Alcance de la demostración</p><p className="mt-1.5 text-xs leading-relaxed text-[#9297a4]">El modelo base contempla nombre, fecha y duración, con relación a salones. El espacio, tipo, categoría y estado son datos provisionales; no se consultan inscripciones.</p></div><div className="grid grid-cols-2 gap-2 pt-1"><button type="button" onClick={() => openEditEvent(selectedEvent)} className="min-h-10 rounded-xl border border-white/[0.1] bg-white/[0.035] px-3 text-sm font-semibold text-[#e0e1e6] transition hover:bg-white/[0.075] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">Editar evento</button><button type="button" onClick={() => setCancelTarget(selectedEvent)} disabled={selectedStatus === 'cancelado'} className="min-h-10 rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-400/[0.13] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300">Cancelar evento</button></div></div></> : <EmptyState title="Selecciona un evento" description="Elige un evento de la agenda para consultar sus datos y administrar el registro local." />}
          </aside>
        </div>
      </section>

      {dialog && <ModalShell title={dialog === 'edit' ? 'Editar evento' : 'Nuevo evento'} description="Los campos del modelo son nombre, fecha y duración. Los demás valores son metadatos locales de demostración." onClose={() => { setDialog(null); setEditingId(null); setFormError(''); }}><form noValidate onSubmit={submitEvent} className="space-y-4"><label className="block"><span className={labelClassName}>Nombre del evento</span><input autoFocus required maxLength={150} value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className={fieldClassName} placeholder="Ej. Taller de bienestar" /></label><div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><label className="block"><span className={labelClassName}>Fecha del evento</span><input required type="date" value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} className={fieldClassName} /></label><label className="block"><span className={labelClassName}>Duración (minutos)</span><input required type="number" min="1" step="1" value={form.durationMinutes} onChange={(event) => setForm((current) => ({ ...current, durationMinutes: event.target.value }))} className={fieldClassName} /></label><label className="block"><span className={labelClassName}>Tipo (demo)</span><select required value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as EventType }))} className={fieldClassName}>{eventTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label><label className="block"><span className={labelClassName}>Categoría (demo)</span><select required value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as EventCategory }))} className={fieldClassName}>{eventCategories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label><label className="block sm:col-span-2"><span className={labelClassName}>Espacio (demo)</span><select required value={form.venue} onChange={(event) => setForm((current) => ({ ...current, venue: event.target.value }))} className={fieldClassName}>{demoVenues.map((venue) => <option key={venue} value={venue}>{venue}</option>)}</select></label></div>{formError && <p role="alert" className="rounded-lg border border-rose-400/20 bg-rose-400/[0.07] px-3 py-2 text-sm text-rose-300">{formError}</p>}<div className="flex flex-wrap justify-end gap-2 border-t border-white/[0.07] pt-4"><button type="button" onClick={() => { setDialog(null); setEditingId(null); setFormError(''); }} className="min-h-10 rounded-xl border border-white/[0.1] px-4 text-sm font-semibold text-[#b7bac3] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">Cancelar</button><button type="submit" className="min-h-10 rounded-xl bg-[#ff3355] px-4 text-sm font-semibold text-white hover:bg-[#ff4964] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9aaa]">{dialog === 'edit' ? 'Guardar cambios demo' : 'Crear evento demo'}</button></div></form></ModalShell>}
      {cancelTarget && <ModalShell title="Confirmar cancelación" description="La cancelación solo cambiará el estado local de demostración. El registro permanecerá en la agenda." onClose={() => setCancelTarget(null)}><div className="space-y-5"><p className="text-sm leading-relaxed text-[#c2c5ce]">¿Quieres cancelar <span className="font-semibold text-white">{cancelTarget.name}</span> del {formatDate(cancelTarget.date)}?</p><div className="flex flex-wrap justify-end gap-2 border-t border-white/[0.07] pt-4"><button type="button" onClick={() => setCancelTarget(null)} className="min-h-10 rounded-xl border border-white/[0.1] px-4 text-sm font-semibold text-[#b7bac3] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">Volver</button><button type="button" onClick={confirmCancelEvent} className="min-h-10 rounded-xl bg-[#ff3355] px-4 text-sm font-semibold text-white hover:bg-[#ff4964] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9aaa]">Sí, cancelar evento</button></div></div></ModalShell>}
      {quickViewOpen && <ModalShell title="Vista rápida" description="Próximos eventos programados en los datos locales de demostración." onClose={() => setQuickViewOpen(false)}>{nextEvents.length ? <div className="space-y-2">{nextEvents.map((event) => <button key={event.id} type="button" onClick={() => { setSelectedEventId(event.id); setDateFilter(event.date); setCalendarMonth(`${event.date.slice(0, 7)}-01`); setCurrentPage(1); setQuickViewOpen(false); }} className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-left hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]"><span className="min-w-0"><span className="block break-words text-sm font-semibold text-white">{event.name}</span><span className="mt-1 block text-xs text-[#9296a2]">{formatDate(event.date)} · {event.durationMinutes} min · {event.demoVenue}</span></span><StatusBadge status={getEventStatus(event, today)} /></button>)}</div> : <EmptyState title="No hay próximos eventos" description="Crea un evento local para verlo en esta vista." />}<div className="mt-5 flex justify-end border-t border-white/[0.07] pt-4"><button type="button" onClick={() => setQuickViewOpen(false)} className="min-h-10 rounded-xl border border-white/[0.1] px-4 text-sm font-semibold text-[#b7bac3] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">Cerrar</button></div></ModalShell>}
    </div>
  );
}
