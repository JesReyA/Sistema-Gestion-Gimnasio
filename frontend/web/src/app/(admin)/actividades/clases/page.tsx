'use client';

import { useMemo, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import { IconoCalendario } from '@/components/icons/IconoCalendario';
import { IconoCalorias } from '@/components/icons/IconoCalorias';
import { IconoMancuerna } from '@/components/icons/IconoMancuerna';
import { IconoPerfil } from '@/components/icons/IconoPerfil';

type SessionStatus = 'programada' | 'en_curso' | 'finalizada' | 'cancelada';

type ClassCatalogItem = {
  id: number;
  name: string;
  theme: string;
  defaultCapacity: number;
};

type ClassSession = {
  id: number;
  classId: number;
  date: string;
  startTime: string;
  endTime: string;
  status: SessionStatus;
  roomId: number;
  capacity: number;
};

type DemoTrainer = { id: number; name: string };
type DemoRoom = { id: number; name: string; capacity: number };
type TrainerClassAssignment = { trainerId: number; classId: number };

type ClassFormValues = {
  name: string;
  theme: string;
  defaultCapacity: string;
};

type SessionFormValues = {
  classId: string;
  date: string;
  startTime: string;
  endTime: string;
  roomId: string;
  capacity: string;
  status: SessionStatus;
};

const trainers: DemoTrainer[] = [
  { id: 1, name: 'Valeria Cruz' },
  { id: 2, name: 'Diego Salas' },
  { id: 3, name: 'Camila Ríos' },
  { id: 4, name: 'Mateo Luna' },
];

const rooms: DemoRoom[] = [
  { id: 1, name: 'Salón A', capacity: 24 },
  { id: 2, name: 'Salón B', capacity: 18 },
  { id: 3, name: 'Estudio funcional', capacity: 16 },
];

// Estas fuentes locales se podrán sustituir por servicios cuando exista una API de clases.
const initialCatalog: ClassCatalogItem[] = [
  { id: 1, name: 'Fuerza total', theme: 'Fuerza', defaultCapacity: 20 },
  { id: 2, name: 'Ritmo y energía', theme: 'Cardio', defaultCapacity: 18 },
  { id: 3, name: 'Ciclo indoor', theme: 'Ciclismo', defaultCapacity: 16 },
  { id: 4, name: 'Movilidad consciente', theme: 'Movilidad', defaultCapacity: 14 },
  { id: 5, name: 'Circuito funcional', theme: 'Entrenamiento funcional', defaultCapacity: 20 },
  { id: 6, name: 'Box recreativo', theme: 'Box', defaultCapacity: 16 },
];

const initialAssignments: TrainerClassAssignment[] = [
  { trainerId: 1, classId: 1 },
  { trainerId: 2, classId: 2 },
  { trainerId: 3, classId: 3 },
  { trainerId: 4, classId: 4 },
  { trainerId: 1, classId: 5 },
  { trainerId: 2, classId: 6 },
];

function mexicoDateOffset(days: number) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const year = Number(parts.find((part) => part.type === 'year')?.value);
  const month = Number(parts.find((part) => part.type === 'month')?.value);
  const day = Number(parts.find((part) => part.type === 'day')?.value);
  const date = new Date(year, month - 1, day + days, 12);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

const initialSessions: ClassSession[] = [
  { id: 1, classId: 1, date: mexicoDateOffset(0), startTime: '07:00', endTime: '08:00', status: 'en_curso', roomId: 1, capacity: 20 },
  { id: 2, classId: 2, date: mexicoDateOffset(0), startTime: '08:30', endTime: '09:15', status: 'programada', roomId: 2, capacity: 18 },
  { id: 3, classId: 3, date: mexicoDateOffset(0), startTime: '10:00', endTime: '10:50', status: 'finalizada', roomId: 3, capacity: 16 },
  { id: 4, classId: 4, date: mexicoDateOffset(1), startTime: '09:00', endTime: '10:00', status: 'programada', roomId: 3, capacity: 14 },
  { id: 5, classId: 5, date: mexicoDateOffset(1), startTime: '11:00', endTime: '12:00', status: 'programada', roomId: 1, capacity: 20 },
  { id: 6, classId: 6, date: mexicoDateOffset(2), startTime: '17:00', endTime: '18:00', status: 'programada', roomId: 2, capacity: 16 },
  { id: 7, classId: 1, date: mexicoDateOffset(-1), startTime: '18:00', endTime: '19:00', status: 'finalizada', roomId: 1, capacity: 20 },
  { id: 8, classId: 4, date: mexicoDateOffset(3), startTime: '12:00', endTime: '13:00', status: 'cancelada', roomId: 3, capacity: 14 },
  { id: 9, classId: 2, date: mexicoDateOffset(4), startTime: '18:30', endTime: '19:15', status: 'programada', roomId: 2, capacity: 18 },
  { id: 10, classId: 5, date: mexicoDateOffset(5), startTime: '07:30', endTime: '08:30', status: 'programada', roomId: 1, capacity: 20 },
  { id: 11, classId: 3, date: mexicoDateOffset(6), startTime: '09:30', endTime: '10:20', status: 'programada', roomId: 3, capacity: 16 },
];

const statusLabels: Record<SessionStatus, string> = {
  programada: 'Programada',
  en_curso: 'En curso',
  finalizada: 'Finalizada',
  cancelada: 'Cancelada',
};

const statusStyles: Record<SessionStatus, string> = {
  programada: 'border-sky-400/20 bg-sky-400/10 text-sky-300',
  en_curso: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  finalizada: 'border-violet-400/20 bg-violet-400/10 text-violet-300',
  cancelada: 'border-rose-400/20 bg-rose-400/10 text-rose-300',
};

const fieldClassName = 'w-full rounded-xl border border-white/10 bg-[#111319] px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-[#6f7480] focus:border-[#ff4964]/60 focus:ring-2 focus:ring-[#ff4964]/15';
const labelClassName = 'mb-1.5 block text-sm font-medium text-[#b3b6c0]';

function formatDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(new Date(year, month - 1, day, 12));
}

function nextPageValue(value: number, totalPages: number) {
  return Math.max(1, Math.min(value, totalPages));
}

function sortSessionsByDateAndTime(sessionsToSort: ClassSession[]) {
  return [...sessionsToSort].sort((first, second) => first.date.localeCompare(second.date) || first.startTime.localeCompare(second.startTime));
}

function getSessionTrainerName(session: ClassSession, assignments: TrainerClassAssignment[]) {
  const assignment = assignments.find((item) => item.classId === session.classId);
  return trainers.find((trainer) => trainer.id === assignment?.trainerId)?.name ?? 'Sin asignar';
}

function filterSessions(
  sessionsToFilter: ClassSession[],
  catalog: ClassCatalogItem[],
  assignments: TrainerClassAssignment[],
  filters: { search: string; date: string; trainer: string; status: SessionStatus | '' },
) {
  const query = filters.search.trim().toLocaleLowerCase('es-MX');
  return sortSessionsByDateAndTime(sessionsToFilter.filter((session) => {
    const classItem = catalog.find((item) => item.id === session.classId);
    const matchesSearch = !query || `${classItem?.name ?? ''} ${classItem?.theme ?? ''}`.toLocaleLowerCase('es-MX').includes(query);
    const matchesDate = !filters.date || session.date === filters.date;
    const trainerName = getSessionTrainerName(session, assignments);
    const matchesTrainer = !filters.trainer || trainerName === filters.trainer;
    const matchesStatus = !filters.status || session.status === filters.status;
    return matchesSearch && matchesDate && matchesTrainer && matchesStatus;
  }));
}

function IconButtonMark({ children }: { children: ReactNode }) {
  return <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-[#ff7186]">{children}</span>;
}

function StatusBadge({ status }: { status: SessionStatus }) {
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
      <p className="mt-3 text-xs leading-relaxed text-[#777c88]">{description}</p>
    </article>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-[#898d99]">
        <IconoCalendario className="h-5 w-5" />
      </span>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-[#858a96]">{description}</p>
    </div>
  );
}

function ModalShell({ title, description, onClose, children }: { title: string; description: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="class-modal-title" aria-describedby="class-modal-description" className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#121319] p-5 shadow-2xl sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="class-modal-title" className="text-lg font-semibold text-white">{title}</h2>
            <p id="class-modal-description" className="mt-1 text-sm leading-relaxed text-[#8a8e99]">{description}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar formulario" className="rounded-lg p-1.5 text-[#8b8f9a] hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export default function ClasesPage() {
  const [catalog, setCatalog] = useState(initialCatalog);
  const [sessions, setSessions] = useState(initialSessions);
  const assignments = initialAssignments;
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(initialSessions[0]?.id ?? null);
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [trainerFilter, setTrainerFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<SessionStatus | ''>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [modal, setModal] = useState<'class' | 'session' | 'edit' | null>(null);
  const [classForm, setClassForm] = useState<ClassFormValues>({ name: '', theme: '', defaultCapacity: '' });
  const [sessionForm, setSessionForm] = useState<SessionFormValues>({
    classId: '', date: mexicoDateOffset(0), startTime: '09:00', endTime: '10:00', roomId: '', capacity: '', status: 'programada',
  });
  const [formError, setFormError] = useState('');

  const filteredSessions = useMemo(() => {
    return filterSessions(sessions, catalog, assignments, {
      search,
      date: dateFilter,
      trainer: trainerFilter,
      status: statusFilter,
    });
  }, [sessions, catalog, assignments, search, dateFilter, trainerFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredSessions.length / pageSize));
  const safePage = nextPageValue(currentPage, totalPages);
  const visibleSessions = useMemo(
    () => filteredSessions.slice((safePage - 1) * pageSize, safePage * pageSize),
    [filteredSessions, safePage, pageSize],
  );

  const effectiveSelectedSessionId = visibleSessions.some((session) => session.id === selectedSessionId)
    ? selectedSessionId
    : visibleSessions[0]?.id ?? null;
  const selectedSession = sessions.find((session) => session.id === effectiveSelectedSessionId) ?? null;
  const selectedClass = selectedSession ? catalog.find((item) => item.id === selectedSession.classId) ?? null : null;
  const selectedRoom = selectedSession ? rooms.find((room) => room.id === selectedSession.roomId) ?? null : null;
  const selectedTrainer = selectedSession ? getSessionTrainerName(selectedSession, assignments) : '';

  const scheduledCount = sessions.filter((session) => session.status === 'programada').length;
  const inProgressCount = sessions.filter((session) => session.status === 'en_curso').length;
  const finishedCount = sessions.filter((session) => session.status === 'finalizada').length;
  const nominalCapacity = sessions.reduce((total, session) => total + session.capacity, 0);
  const firstResult = filteredSessions.length ? (safePage - 1) * pageSize + 1 : 0;
  const lastResult = Math.min(safePage * pageSize, filteredSessions.length);

  function clearFilters() {
    setSearch('');
    setDateFilter('');
    setTrainerFilter('');
    setStatusFilter('');
    setCurrentPage(1);
  }

  function resetClassForm() {
    setClassForm({ name: '', theme: '', defaultCapacity: '' });
    setFormError('');
  }

  function openClassModal() {
    resetClassForm();
    setModal('class');
  }

  function openScheduleModal() {
    setFormError('');
    setSessionForm({ classId: catalog[0] ? String(catalog[0].id) : '', date: mexicoDateOffset(0), startTime: '09:00', endTime: '10:00', roomId: String(rooms[0]?.id ?? ''), capacity: catalog[0] ? String(catalog[0].defaultCapacity) : '', status: 'programada' });
    setModal('session');
  }

  function openEditModal(session: ClassSession) {
    setFormError('');
    setSelectedSessionId(session.id);
    setSessionForm({ classId: String(session.classId), date: session.date, startTime: session.startTime, endTime: session.endTime, roomId: String(session.roomId), capacity: String(session.capacity), status: session.status });
    setModal('edit');
  }

  function submitClass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = classForm.name.trim();
    const theme = classForm.theme.trim();
    const capacity = Number(classForm.defaultCapacity);
    if (!name || !theme || !Number.isInteger(capacity) || capacity <= 0) {
      setFormError('Completa el nombre, la temática y un aforo predeterminado mayor que cero.');
      return;
    }
    if (catalog.some((item) => item.name.toLocaleLowerCase('es-MX') === name.toLocaleLowerCase('es-MX'))) {
      setFormError('Ya existe una clase de demostración con ese nombre.');
      return;
    }
    const nextId = Math.max(0, ...catalog.map((item) => item.id)) + 1;
    setCatalog((current) => [...current, { id: nextId, name, theme, defaultCapacity: capacity }]);
    setModal(null);
    resetClassForm();
  }

  function submitSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const classId = Number(sessionForm.classId);
    const roomId = Number(sessionForm.roomId);
    const capacity = Number(sessionForm.capacity);
    if (!catalog.some((item) => item.id === classId) || !rooms.some((room) => room.id === roomId) || !sessionForm.date || !sessionForm.startTime || !sessionForm.endTime || !Number.isInteger(capacity) || capacity <= 0) {
      setFormError('Completa todos los campos con valores válidos.');
      return;
    }
    if (sessionForm.endTime <= sessionForm.startTime) {
      setFormError('La hora de fin debe ser posterior a la hora de inicio.');
      return;
    }
    const nextValues: Omit<ClassSession, 'id'> = { classId, date: sessionForm.date, startTime: sessionForm.startTime, endTime: sessionForm.endTime, roomId, capacity, status: sessionForm.status };
    if (modal === 'edit' && selectedSessionId !== null) {
      const nextSessions = sessions.map((session) => session.id === selectedSessionId ? { ...session, ...nextValues } : session);
      const nextFilteredSessions = filterSessions(nextSessions, catalog, assignments, {
        search,
        date: dateFilter,
        trainer: trainerFilter,
        status: statusFilter,
      });
      const selectedIndex = nextFilteredSessions.findIndex((session) => session.id === selectedSessionId);
      setSessions(nextSessions);
      setCurrentPage(selectedIndex < 0 ? 1 : Math.floor(selectedIndex / pageSize) + 1);
      setSelectedSessionId(selectedSessionId);
    } else {
      const nextId = Math.max(0, ...sessions.map((session) => session.id)) + 1;
      const nextSessions = [...sessions, { id: nextId, ...nextValues }];
      setSessions(nextSessions);
      setSelectedSessionId(nextId);
      setSearch('');
      setDateFilter('');
      setTrainerFilter('');
      setStatusFilter('');
      const selectedIndex = sortSessionsByDateAndTime(nextSessions).findIndex((session) => session.id === nextId);
      setCurrentPage(Math.floor(selectedIndex / pageSize) + 1);
    }
    setModal(null);
    setFormError('');
  }

  function cancelSession(session: ClassSession) {
    if (session.status === 'cancelada') return;
    const classItem = catalog.find((item) => item.id === session.classId);
    if (!window.confirm(`¿Cancelar la sesión de “${classItem?.name ?? 'clase'}” del ${formatDate(session.date)}? La sesión se conservará en el listado.`)) return;
    setSessions((current) => current.map((item) => item.id === session.id ? { ...item, status: 'cancelada' } : item));
  }

  function selectRow(session: ClassSession) {
    setSelectedSessionId(session.id);
  }

  function handleRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>, session: ClassSession) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectRow(session);
    }
  }

  function updateSessionClass(classIdValue: string) {
    const selectedCatalogItem = catalog.find((item) => item.id === Number(classIdValue));
    setSessionForm((current) => ({ ...current, classId: classIdValue, capacity: selectedCatalogItem ? String(selectedCatalogItem.defaultCapacity) : current.capacity }));
  }

  return (
    <div className="w-full min-w-0 space-y-6 px-4 pb-8 pt-5 text-white sm:space-y-7 sm:px-6 sm:pt-6 lg:px-14 lg:pt-8">
      <section className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.08] px-3 py-1.5 text-xs font-semibold text-amber-200">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Datos de demostración
            </span>
            <span className="text-xs text-[#747987]">Los cambios se guardan solo en esta vista.</span>
          </div>
          <h1 className="text-[24px] font-bold tracking-tight text-white sm:text-[28px]">Gestión de clases</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#9296a2]">Organiza el catálogo de actividades y consulta las sesiones programadas, sus horarios y espacios asignados.</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button type="button" onClick={openScheduleModal} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/[0.11] bg-white/[0.04] px-4 text-sm font-semibold text-[#e7e8ec] transition hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-[#ff7186]" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 5v14M5 12h14" /><rect x="3" y="3" width="18" height="18" rx="4" /></svg>
            Programar sesión
          </button>
          <button type="button" onClick={openClassModal} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#ff3355] px-4 text-sm font-semibold text-white shadow-lg shadow-[#ff3355]/15 transition hover:bg-[#ff4964] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9aaa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090a0f]">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
            Nueva clase
          </button>
        </div>
      </section>

      <section aria-label="Resumen de clases" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Sesiones programadas" value={String(scheduledCount)} description="Sesiones con estado programada" icon={<IconoCalendario className="h-5 w-5" />} accent="border-sky-400/20 bg-sky-400/[0.08] text-sky-300" />
        <StatCard title="Sesiones en curso" value={String(inProgressCount)} description="Sesiones marcadas en curso" icon={<span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.5)]" />} accent="border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300" />
        <StatCard title="Clases finalizadas" value={String(finishedCount)} description="Sesiones con estado finalizada" icon={<IconoCalorias className="h-5 w-5" />} accent="border-violet-400/20 bg-violet-400/[0.08] text-violet-300" />
        <StatCard title="Aforo nominal configurado" value={String(nominalCapacity)} description="Suma del aforo de las sesiones de demostración; no representa inscripciones" icon={<IconoPerfil className="h-5 w-5" />} accent="border-[#ff4964]/20 bg-[#ff4964]/[0.08] text-[#ff7186]" />
      </section>

      <section className="grid min-w-0 grid-cols-1 items-start gap-5 min-[1725px]:grid-cols-[minmax(0,1fr)_300px] min-[1725px]:gap-6">
        <div className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101116]">
          <div className="border-b border-white/[0.07] p-4 sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-white">Sesiones</h2>
                <p className="mt-1 text-sm text-[#838794]">Consulta y administra las sesiones de clase.</p>
              </div>
              <span className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-xs text-[#a5a8b1]">{sessions.length} registros demo</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(190px,1.35fr)_minmax(150px,.8fr)_minmax(160px,1fr)_minmax(145px,.9fr)_auto] xl:items-end">
              <label className="min-w-0">
                <span className={labelClassName}>Buscar clase o temática</span>
                <span className="relative block">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#707583]" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
                  <input value={search} onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }} className={`${fieldClassName} pl-9`} placeholder="Nombre o temática" />
                </span>
              </label>
              <label className="min-w-0">
                <span className={labelClassName}>Fecha</span>
                <input type="date" value={dateFilter} onChange={(event) => { setDateFilter(event.target.value); setCurrentPage(1); }} className={fieldClassName} />
              </label>
              <label className="min-w-0">
                <span className={labelClassName}>Entrenador</span>
                <select value={trainerFilter} onChange={(event) => { setTrainerFilter(event.target.value); setCurrentPage(1); }} className={fieldClassName}>
                  <option value="">Todos los entrenadores</option>
                  {trainers.map((trainer) => <option key={trainer.id} value={trainer.name}>{trainer.name}</option>)}
                  <option value="Sin asignar">Sin asignar</option>
                </select>
              </label>
              <label className="min-w-0">
                <span className={labelClassName}>Estado</span>
                <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value as SessionStatus | ''); setCurrentPage(1); }} className={fieldClassName}>
                  <option value="">Todos los estados</option>
                  {(Object.keys(statusLabels) as SessionStatus[]).map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}
                </select>
              </label>
              <button type="button" onClick={clearFilters} className="min-h-10 rounded-xl border border-white/[0.09] px-3.5 text-sm font-semibold text-[#b9bbc3] transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186] sm:col-span-2 xl:col-span-1">Limpiar filtros</button>
            </div>
          </div>

          <div className="min-w-0 overflow-x-auto" style={{ scrollbarColor: '#454955 #111319' }}>
            <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.018] text-xs font-semibold uppercase tracking-[0.08em] text-[#a0a4af]">
                  <th scope="col" className="px-4 py-3.5">Clase / código</th>
                  <th scope="col" className="px-3 py-3.5">Temática</th>
                  <th scope="col" className="px-3 py-3.5">Fecha</th>
                  <th scope="col" className="px-3 py-3.5">Horario</th>
                  <th scope="col" className="px-3 py-3.5">Entrenador</th>
                  <th scope="col" className="px-3 py-3.5">Salón</th>
                  <th scope="col" className="px-3 py-3.5 text-right">Aforo nominal</th>
                  <th scope="col" className="px-4 py-3.5">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.055]">
                {visibleSessions.map((session) => {
                  const classItem = catalog.find((item) => item.id === session.classId);
                  const room = rooms.find((item) => item.id === session.roomId);
                  const trainerName = getSessionTrainerName(session, assignments);
                  const selected = session.id === selectedSession?.id;
                  return (
                    <tr
                      key={session.id}
                      tabIndex={0}
                      aria-selected={selectedSession?.id === session.id}
                      onClick={() => selectRow(session)}
                      onKeyDown={(event) => handleRowKeyDown(event, session)}
                      className={`cursor-pointer outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff7186] ${selected ? 'bg-[#ff3355]/[0.075] shadow-[inset_2px_0_0_#ff4964]' : 'hover:bg-white/[0.035]'}`}
                    >
                      <td className="max-w-[190px] px-4 py-3.5">
                        <p className="truncate font-semibold text-[#f0f0f3]">{classItem?.name ?? 'Clase no disponible'}</p>
                        <p className="mt-1 font-mono text-xs text-[#8e939f]">CL-{String(session.classId).padStart(3, '0')} · SES-{String(session.id).padStart(3, '0')}</p>
                      </td>
                      <td className="max-w-[165px] px-3 py-3.5 text-[#b1b4bd]"><span className="block truncate" title={classItem?.theme}>{classItem?.theme ?? '—'}</span></td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-[#c4c6cd]">{formatDate(session.date)}</td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-[#c4c6cd]">{session.startTime}–{session.endTime}</td>
                      <td className="max-w-[145px] px-3 py-3.5 text-[#b1b4bd]"><span className="block truncate" title={trainerName}>{trainerName}</span></td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-[#b1b4bd]">{room?.name ?? '—'}</td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-right font-medium tabular-nums text-[#e2e3e7]">{session.capacity} plazas</td>
                      <td className="whitespace-nowrap px-4 py-3.5"><StatusBadge status={session.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {visibleSessions.length === 0 && <EmptyState title="No hay sesiones coincidentes" description="Prueba con otra búsqueda o ajusta los filtros para consultar las sesiones de demostración." />}

          <div className="flex flex-col gap-3 border-t border-white/[0.07] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm text-[#8d919c]">Mostrando <span className="font-medium text-[#d5d6dc]">{firstResult}–{lastResult}</span> de <span className="font-medium text-[#d5d6dc]">{filteredSessions.length}</span> sesiones</p>
            <div className="flex flex-wrap items-center gap-2.5">
              <label className="flex items-center gap-2 text-sm text-[#8d919c]">Filas
                <select aria-label="Cantidad de sesiones por página" value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setCurrentPage(1); }} className="rounded-lg border border-white/[0.09] bg-[#111319] px-2 py-1.5 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">
                  {[5, 8, 12, 20].map((size) => <option key={size} value={size}>{size}</option>)}
                </select>
              </label>
              <span className="px-1 text-sm tabular-nums text-[#aaaeb8]">{safePage} / {totalPages}</span>
              <button type="button" aria-label="Página anterior" disabled={safePage <= 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.09] text-[#c2c4cb] hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button type="button" aria-label="Página siguiente" disabled={safePage >= totalPages} onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.09] text-[#c2c4cb] hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        </div>

        <aside aria-label="Detalle de sesión seleccionada" className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101116]">
          {selectedSession && selectedClass ? (
            <>
              <div className="border-b border-white/[0.07] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#ff7186]">Detalle de sesión</p>
                    <h2 className="mt-2 break-words text-lg font-semibold text-white">{selectedClass.name}</h2>
                    <p className="mt-1 font-mono text-xs text-[#858a96]">CL-{String(selectedClass.id).padStart(3, '0')} · SES-{String(selectedSession.id).padStart(3, '0')}</p>
                  </div>
                  <IconButtonMark><IconoMancuerna className="h-5 w-5" /></IconButtonMark>
                </div>
                <div className="mt-4"><StatusBadge status={selectedSession.status} /></div>
              </div>
              <div className="space-y-4 p-5">
                <div className="grid grid-cols-2 gap-3">
                  <DetailItem label="Temática" value={selectedClass.theme} />
                  <DetailItem label="Aforo nominal" value={`${selectedSession.capacity} plazas`} />
                  <DetailItem label="Fecha" value={formatDate(selectedSession.date)} />
                  <DetailItem label="Horario" value={`${selectedSession.startTime}–${selectedSession.endTime}`} />
                  <DetailItem label="Entrenador" value={selectedTrainer} />
                  <DetailItem label="Salón" value={selectedRoom?.name ?? 'No disponible'} />
                </div>
                <div className="rounded-xl border border-sky-300/10 bg-sky-300/[0.035] p-3">
                  <p className="text-xs font-semibold text-sky-200">Información de demostración</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#9297a4]">El aforo es la capacidad configurada para esta sesión. No hay datos de inscripciones ni ocupación real disponibles.</p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button type="button" onClick={() => openEditModal(selectedSession)} className="min-h-10 rounded-xl border border-white/[0.1] bg-white/[0.035] px-3 text-sm font-semibold text-[#e0e1e6] transition hover:bg-white/[0.075] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">Editar sesión</button>
                  <button type="button" onClick={() => cancelSession(selectedSession)} disabled={selectedSession.status === 'cancelada'} className="min-h-10 rounded-xl border border-rose-400/20 bg-rose-400/[0.07] px-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-400/[0.13] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300">Cancelar sesión</button>
                </div>
              </div>
            </>
          ) : (
            <EmptyState title="Selecciona una sesión" description="Elige una fila de la tabla para consultar sus datos y administrar la sesión." />
          )}
        </aside>
      </section>

      {modal === 'class' && (
        <ModalShell title="Nueva clase" description="Agrega una actividad al catálogo local de demostración." onClose={() => { setModal(null); setFormError(''); }}>
          <form onSubmit={submitClass} className="space-y-4">
            <label className="block"><span className={labelClassName}>Nombre de la clase</span><input autoFocus maxLength={100} value={classForm.name} onChange={(event) => setClassForm((current) => ({ ...current, name: event.target.value }))} className={fieldClassName} placeholder="Ej. Fuerza y acondicionamiento" /></label>
            <label className="block"><span className={labelClassName}>Temática</span><input maxLength={100} value={classForm.theme} onChange={(event) => setClassForm((current) => ({ ...current, theme: event.target.value }))} className={fieldClassName} placeholder="Ej. Fuerza" /></label>
            <label className="block"><span className={labelClassName}>Aforo predeterminado</span><input type="number" min="1" step="1" value={classForm.defaultCapacity} onChange={(event) => setClassForm((current) => ({ ...current, defaultCapacity: event.target.value }))} className={fieldClassName} placeholder="20" /></label>
            {formError && <p role="alert" className="rounded-lg border border-rose-400/20 bg-rose-400/[0.07] px-3 py-2 text-xs text-rose-300">{formError}</p>}
            <p className="text-xs leading-relaxed text-[#858a96]">Campos basados en el catálogo de clases. El registro solo se conserva en esta demostración.</p>
            <div className="flex justify-end gap-2 border-t border-white/[0.07] pt-4">
              <button type="button" onClick={() => { setModal(null); setFormError(''); }} className="min-h-10 rounded-xl border border-white/[0.1] px-4 text-sm font-semibold text-[#b7bac3] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">Cancelar</button>
              <button type="submit" className="min-h-10 rounded-xl bg-[#ff3355] px-4 text-sm font-semibold text-white hover:bg-[#ff4964] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9aaa]">Agregar clase demo</button>
            </div>
          </form>
        </ModalShell>
      )}

      {(modal === 'session' || modal === 'edit') && (
        <ModalShell title={modal === 'edit' ? 'Editar sesión' : 'Programar sesión'} description="Configura los datos de la sesión. No se realizan comprobaciones de disponibilidad ni se guardan cambios en un servidor." onClose={() => { setModal(null); setFormError(''); }}>
          {catalog.length === 0 ? (
            <div className="space-y-4"><p className="text-sm text-[#c2c5ce]">Primero agrega una clase al catálogo de demostración.</p><button type="button" onClick={() => { setModal(null); openClassModal(); }} className="min-h-10 rounded-xl bg-[#ff3355] px-4 text-xs font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9aaa]">Crear clase demo</button></div>
          ) : (
            <form onSubmit={submitSession} className="space-y-4">
              <label className="block"><span className={labelClassName}>Clase</span><select autoFocus value={sessionForm.classId} onChange={(event) => updateSessionClass(event.target.value)} className={fieldClassName}>{catalog.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.theme}</option>)}</select></label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block"><span className={labelClassName}>Fecha</span><input type="date" value={sessionForm.date} onChange={(event) => setSessionForm((current) => ({ ...current, date: event.target.value }))} className={fieldClassName} /></label>
                <label className="block"><span className={labelClassName}>Salón</span><select value={sessionForm.roomId} onChange={(event) => setSessionForm((current) => ({ ...current, roomId: event.target.value }))} className={fieldClassName}>{rooms.map((room) => <option key={room.id} value={room.id}>{room.name} · capacidad demo {room.capacity}</option>)}</select></label>
                <label className="block"><span className={labelClassName}>Hora de inicio</span><input type="time" value={sessionForm.startTime} onChange={(event) => setSessionForm((current) => ({ ...current, startTime: event.target.value }))} className={fieldClassName} /></label>
                <label className="block"><span className={labelClassName}>Hora de fin</span><input type="time" value={sessionForm.endTime} onChange={(event) => setSessionForm((current) => ({ ...current, endTime: event.target.value }))} className={fieldClassName} /></label>
                <label className="block"><span className={labelClassName}>Aforo nominal de la sesión</span><input type="number" min="1" step="1" value={sessionForm.capacity} onChange={(event) => setSessionForm((current) => ({ ...current, capacity: event.target.value }))} className={fieldClassName} /></label>
                <label className="block"><span className={labelClassName}>{modal === 'edit' ? 'Estado' : 'Estado inicial permitido'}</span><select value={sessionForm.status} onChange={(event) => setSessionForm((current) => ({ ...current, status: event.target.value as SessionStatus }))} className={fieldClassName}>
                  <option value="programada">Programada</option>
                  <option value="en_curso">En curso</option>
                  {modal === 'edit' && <option value="finalizada">Finalizada</option>}
                  {modal === 'edit' && sessionForm.status === 'cancelada' && <option value="cancelada">Cancelada</option>}
                </select></label>
              </div>
              {formError && <p role="alert" className="rounded-lg border border-rose-400/20 bg-rose-400/[0.07] px-3 py-2 text-xs text-rose-300">{formError}</p>}
              <p className="text-xs leading-relaxed text-[#858a96]">El entrenador se consulta desde la asignación de demostración de la clase. No se valida disponibilidad de salón.</p>
              <div className="flex justify-end gap-2 border-t border-white/[0.07] pt-4">
                <button type="button" onClick={() => { setModal(null); setFormError(''); }} className="min-h-10 rounded-xl border border-white/[0.1] px-4 text-sm font-semibold text-[#b7bac3] hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]">Cancelar</button>
                <button type="submit" className="min-h-10 rounded-xl bg-[#ff3355] px-4 text-sm font-semibold text-white hover:bg-[#ff4964] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9aaa]">{modal === 'edit' ? 'Guardar cambios demo' : 'Crear sesión demo'}</button>
              </div>
            </form>
          )}
        </ModalShell>
      )}
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0 rounded-xl border border-white/[0.055] bg-white/[0.018] px-3 py-2.5"><p className="text-xs font-medium uppercase tracking-[0.08em] text-[#858a96]">{label}</p><p className="mt-1.5 break-words text-sm font-medium text-[#d7d8de]">{value}</p></div>;
}
