'use client';

import { useMemo, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';

type AccountStatus = 'activa' | 'inactiva' | 'suspendida' | 'pendiente';
type SubscriptionStatus = 'activa' | 'vencida' | 'cancelada';

type ClientRecord = {
  id: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  curp: string;
  correoElectronico: string;
  numeroCelular: string;
  fechaNacimiento: string;
  estaturaMetros: string;
  pesoObjetivoKg: string;
  estadoCuenta: AccountStatus;
  suscripcion: {
    plan: string;
    estado: SubscriptionStatus;
    fechaInicio: string;
    fechaFin: string;
  } | null;
};

type ClientFormValues = Pick<
  ClientRecord,
  | 'nombres'
  | 'apellidoPaterno'
  | 'apellidoMaterno'
  | 'curp'
  | 'correoElectronico'
  | 'numeroCelular'
  | 'fechaNacimiento'
  | 'estaturaMetros'
  | 'pesoObjetivoKg'
>;

type FormErrors = Partial<Record<keyof ClientFormValues, string>>;
type AccountFilter = 'todos' | AccountStatus;
type SubscriptionFilter = 'todas' | SubscriptionStatus | 'sin_suscripcion';

const DEMO_CLIENTS: ClientRecord[] = [
  {
    id: 1042,
    nombres: 'Valeria Fernanda',
    apellidoPaterno: 'Cortés',
    apellidoMaterno: 'Mendoza',
    curp: 'CEMV940614MDFRNL08',
    correoElectronico: 'valeria.cortes@example.com',
    numeroCelular: '+52 55 4102 7831',
    fechaNacimiento: '1994-06-14',
    estaturaMetros: '1.64',
    pesoObjetivoKg: '62.00',
    estadoCuenta: 'activa',
    suscripcion: { plan: 'IRONFIT Total', estado: 'activa', fechaInicio: '2026-09-01', fechaFin: '2026-10-31' },
  },
  {
    id: 1041,
    nombres: 'Diego Alejandro',
    apellidoPaterno: 'Navarro',
    apellidoMaterno: 'Ruiz',
    curp: 'NARD960223HDFVRG04',
    correoElectronico: 'diego.navarro@example.com',
    numeroCelular: '+52 55 2837 1904',
    fechaNacimiento: '1996-02-23',
    estaturaMetros: '1.78',
    pesoObjetivoKg: '',
    estadoCuenta: 'activa',
    suscripcion: { plan: 'IRONFIT Fuerza', estado: 'activa', fechaInicio: '2026-08-15', fechaFin: '2026-11-14' },
  },
  {
    id: 1040,
    nombres: 'Camila',
    apellidoPaterno: 'Santos',
    apellidoMaterno: 'Lara',
    curp: 'SALC010908MDFNRM09',
    correoElectronico: 'camila.santos@example.com',
    numeroCelular: '+52 55 7214 0662',
    fechaNacimiento: '2001-09-08',
    estaturaMetros: '1.59',
    pesoObjetivoKg: '55.50',
    estadoCuenta: 'pendiente',
    suscripcion: { plan: 'IRONFIT Inicio', estado: 'vencida', fechaInicio: '2026-07-01', fechaFin: '2026-07-31' },
  },
  {
    id: 1039,
    nombres: 'Emiliano',
    apellidoPaterno: 'Vega',
    apellidoMaterno: 'Serrano',
    curp: 'VESE900315HDFGRM02',
    correoElectronico: 'emiliano.vega@example.com',
    numeroCelular: '+52 55 6518 2370',
    fechaNacimiento: '1990-03-15',
    estaturaMetros: '',
    pesoObjetivoKg: '',
    estadoCuenta: 'suspendida',
    suscripcion: { plan: 'IRONFIT Total', estado: 'cancelada', fechaInicio: '2026-03-10', fechaFin: '2026-04-09' },
  },
  {
    id: 1038,
    nombres: 'Renata Isabel',
    apellidoPaterno: 'Fuentes',
    apellidoMaterno: 'Mora',
    curp: 'FUMR980727MDFNRN06',
    correoElectronico: 'renata.fuentes@example.com',
    numeroCelular: '+52 55 3180 9491',
    fechaNacimiento: '1998-07-27',
    estaturaMetros: '1.68',
    pesoObjetivoKg: '60.00',
    estadoCuenta: 'activa',
    suscripcion: null,
  },
  {
    id: 1037,
    nombres: 'Mateo',
    apellidoPaterno: 'Ríos',
    apellidoMaterno: 'Castañeda',
    curp: 'RICM930511HDFSSN01',
    correoElectronico: 'mateo.rios@example.com',
    numeroCelular: '+52 55 9271 5046',
    fechaNacimiento: '1993-05-11',
    estaturaMetros: '1.82',
    pesoObjetivoKg: '84.00',
    estadoCuenta: 'inactiva',
    suscripcion: { plan: 'IRONFIT Fuerza', estado: 'vencida', fechaInicio: '2026-06-01', fechaFin: '2026-06-30' },
  },
  {
    id: 1036,
    nombres: 'Lucía Fernanda',
    apellidoPaterno: 'Ortega',
    apellidoMaterno: 'Paz',
    curp: 'OEPL000119MDFRZC05',
    correoElectronico: 'lucia.ortega@example.com',
    numeroCelular: '+52 55 4019 7288',
    fechaNacimiento: '2000-01-19',
    estaturaMetros: '1.61',
    pesoObjetivoKg: '58.00',
    estadoCuenta: 'activa',
    suscripcion: { plan: 'IRONFIT Inicio', estado: 'activa', fechaInicio: '2026-10-01', fechaFin: '2026-10-31' },
  },
  {
    id: 1035,
    nombres: 'Santiago',
    apellidoPaterno: 'Delgado',
    apellidoMaterno: '',
    curp: 'DEGS970802HDFLLN07',
    correoElectronico: 'santiago.delgado@example.com',
    numeroCelular: '+52 55 8420 1163',
    fechaNacimiento: '1997-08-02',
    estaturaMetros: '',
    pesoObjetivoKg: '76.00',
    estadoCuenta: 'pendiente',
    suscripcion: { plan: 'IRONFIT Total', estado: 'activa', fechaInicio: '2026-10-20', fechaFin: '2026-11-19' },
  },
];

const EMPTY_FORM: ClientFormValues = {
  nombres: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  curp: '',
  correoElectronico: '',
  numeroCelular: '',
  fechaNacimiento: '',
  estaturaMetros: '',
  pesoObjetivoKg: '',
};

const statusLabels: Record<AccountStatus, string> = {
  activa: 'Activa',
  inactiva: 'Inactiva',
  suspendida: 'Suspendida',
  pendiente: 'Pendiente',
};

const subscriptionLabels: Record<SubscriptionStatus, string> = {
  activa: 'Activa',
  vencida: 'Vencida',
  cancelada: 'Cancelada',
};

function fullName(client: ClientRecord) {
  return [client.nombres, client.apellidoPaterno, client.apellidoMaterno].filter(Boolean).join(' ');
}

function initials(client: ClientRecord) {
  return `${client.nombres.trim().charAt(0)}${client.apellidoPaterno.trim().charAt(0)}`.toUpperCase();
}

function formatDate(value: string) {
  if (!value) return 'Sin información registrada';
  return new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(`${value}T12:00:00`),
  );
}

function Icon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const shared = { className, fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, viewBox: '0 0 24 24', 'aria-hidden': true as const };
  const shapes: Record<string, ReactNode> = {
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    users: <><path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" /><circle cx="9" cy="7" r="4" /><path d="M20 20v-1.5a4 4 0 0 0-3-3.87M16 3.2a4 4 0 0 1 0 7.6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    back: <><path d="M19 12H5m7 7-7-7 7-7" /></>,
    edit: <><path d="m15 5 4 4M4 20l4-.8L19.2 8a2.1 2.1 0 0 0-3-3L5 16.2 4 20Z" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    chevron: <><path d="m9 18 6-6-6-6" /></>,
    left: <><path d="m15 18-6-6 6-6" /></>,
    right: <><path d="m9 18 6-6-6-6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <><path d="M7 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-2l-5-2-2 3a14 14 0 0 1-6-6l3-2-2-5Z" /></>,
    person: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h3" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    ruler: <><path d="M4 20V4M4 20h16M8 20v-4m4 4v-7m4 7v-4m4 4v-7" /></>,
    alert: <><path d="M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4m0 4h.01" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
  };

  return <svg {...shared}>{shapes[name] ?? shapes.person}</svg>;
}

function StatusBadge({ status, kind }: { status: AccountStatus | SubscriptionStatus; kind: 'account' | 'subscription' }) {
  const palette = status === 'activa'
    ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
    : status === 'pendiente'
      ? 'border-amber-400/20 bg-amber-400/10 text-amber-200'
      : status === 'suspendida' || status === 'vencida'
        ? 'border-rose-400/20 bg-rose-400/10 text-rose-300'
        : 'border-white/10 bg-white/[0.05] text-gray-300';
  const label = kind === 'account'
    ? statusLabels[status as AccountStatus]
    : subscriptionLabels[status as SubscriptionStatus];

  return <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${palette}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />{label}
  </span>;
}

function validateForm(values: ClientFormValues, clients: ClientRecord[], editingId: number | null): FormErrors {
  const errors: FormErrors = {};
  const required = ['nombres', 'apellidoPaterno', 'curp', 'correoElectronico', 'numeroCelular', 'fechaNacimiento'] as const;
  for (const field of required) {
    if (!values[field].trim()) errors[field] = 'Este campo es obligatorio.';
  }
  if (values.nombres.length > 100) errors.nombres = 'Usa máximo 100 caracteres.';
  if (values.apellidoPaterno.length > 100) errors.apellidoPaterno = 'Usa máximo 100 caracteres.';
  if (values.apellidoMaterno.length > 100) errors.apellidoMaterno = 'Usa máximo 100 caracteres.';
  if (values.curp.trim() && !/^[A-Z0-9]{18}$/i.test(values.curp.trim())) errors.curp = 'La CURP debe contener exactamente 18 letras o números.';
  if (values.correoElectronico.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correoElectronico.trim())) {
    errors.correoElectronico = 'Escribe un correo electrónico válido.';
  }
  if (values.correoElectronico.length > 150) errors.correoElectronico = 'Usa máximo 150 caracteres.';
  if (values.numeroCelular.length > 20) errors.numeroCelular = 'Usa máximo 20 caracteres.';

  if (values.fechaNacimiento) {
    const birthDate = new Date(`${values.fechaNacimiento}T12:00:00`);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (Number.isNaN(birthDate.getTime()) || birthDate > today) errors.fechaNacimiento = 'Ingresa una fecha válida que no sea futura.';
  }

  const normalizedEmail = values.correoElectronico.trim().toLocaleLowerCase();
  const normalizedCurp = values.curp.trim().toLocaleUpperCase();
  if (clients.some((client) => client.id !== editingId && client.correoElectronico.toLocaleLowerCase() === normalizedEmail)) {
    errors.correoElectronico = 'Este correo ya existe en los datos de demostración.';
  }
  if (clients.some((client) => client.id !== editingId && client.curp.toLocaleUpperCase() === normalizedCurp)) {
    errors.curp = 'Esta CURP ya existe en los datos de demostración.';
  }

  const validateMeasure = (field: 'estaturaMetros' | 'pesoObjetivoKg', min: number, max: number, label: string) => {
    const raw = values[field].trim();
    if (!raw) return;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed < min || parsed > max || !/^\d{1,3}(\.\d{1,2})?$/.test(raw)) {
      errors[field] = `${label}: usa un valor entre ${min} y ${max}, con máximo dos decimales.`;
    }
  };
  validateMeasure('estaturaMetros', 0.5, 3, 'La estatura');
  validateMeasure('pesoObjetivoKg', 1, 800, 'El peso objetivo');
  return errors;
}

function formFromClient(client: ClientRecord): ClientFormValues {
  return {
    nombres: client.nombres,
    apellidoPaterno: client.apellidoPaterno,
    apellidoMaterno: client.apellidoMaterno,
    curp: client.curp,
    correoElectronico: client.correoElectronico,
    numeroCelular: client.numeroCelular,
    fechaNacimiento: client.fechaNacimiento,
    estaturaMetros: client.estaturaMetros,
    pesoObjetivoKg: client.pesoObjetivoKg,
  };
}

function FormField({ label, id, value, onChange, error, type = 'text', maxLength, placeholder, required = false, autoComplete }: {
  label: string;
  id: keyof ClientFormValues;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-300">{label}{required && <span className="ml-1 text-rose-400" aria-hidden="true">*</span>}</label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      required={required}
      maxLength={maxLength}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={(event) => onChange(event.target.value)}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`min-h-11 w-full rounded-xl border bg-[#101115] px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#ff526a]/70 focus:ring-2 focus:ring-[#ff526a]/15 ${error ? 'border-rose-400/60' : 'border-white/10'}`}
    />
    {error && <p id={`${id}-error`} role="alert" className="text-xs text-rose-300">{error}</p>}
  </div>;
}

export default function ClientesPage() {
  const [clients, setClients] = useState<ClientRecord[]>(DEMO_CLIENTS);
  const [search, setSearch] = useState('');
  const [accountFilter, setAccountFilter] = useState<AccountFilter>('todos');
  const [subscriptionFilter, setSubscriptionFilter] = useState<SubscriptionFilter>('todas');
  const [planFilter, setPlanFilter] = useState('todos');
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'directory' | 'profile'>('directory');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit' | null>(null);
  const [formValues, setFormValues] = useState<ClientFormValues>(EMPTY_FORM);
  const [formInitial, setFormInitial] = useState<ClientFormValues | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  const plans = useMemo(() => [...new Set(clients.flatMap((client) => client.suscripcion ? [client.suscripcion.plan] : []))].sort(), [clients]);
  const filteredClients = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return clients.filter((client) => {
      const searchMatches = !query || [fullName(client), String(client.id), client.correoElectronico, client.numeroCelular]
        .some((value) => value.toLocaleLowerCase().includes(query));
      const accountMatches = accountFilter === 'todos' || client.estadoCuenta === accountFilter;
      const subscriptionMatches = subscriptionFilter === 'todas'
        || (subscriptionFilter === 'sin_suscripcion' ? !client.suscripcion : client.suscripcion?.estado === subscriptionFilter);
      const planMatches = planFilter === 'todos' || client.suscripcion?.plan === planFilter;
      return searchMatches && accountMatches && subscriptionMatches && planMatches;
    });
  }, [clients, search, accountFilter, subscriptionFilter, planFilter]);
  const pageCount = Math.max(1, Math.ceil(filteredClients.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visibleClients = filteredClients.slice((safePage - 1) * pageSize, safePage * pageSize);
  const selectedClient = clients.find((client) => client.id === selectedId) ?? null;
  const summary = useMemo(() => ({
    total: clients.length,
    activeAccounts: clients.filter((client) => client.estadoCuenta === 'activa').length,
    suspendedAccounts: clients.filter((client) => client.estadoCuenta === 'suspendida').length,
    expiredSubscriptions: clients.filter((client) => client.suscripcion?.estado === 'vencida').length,
  }), [clients]);
  const hasFormChanges = formInitial !== null && JSON.stringify(formInitial) !== JSON.stringify(formValues);

  function resetPage() {
    setPage(1);
  }

  function clearFilters() {
    setSearch('');
    setAccountFilter('todos');
    setSubscriptionFilter('todas');
    setPlanFilter('todos');
    setPage(1);
  }

  function openCreate() {
    const initial = { ...EMPTY_FORM };
    setFormMode('create');
    setEditingId(null);
    setFormInitial(initial);
    setFormValues(initial);
    setFormErrors({});
  }

  function openEdit(client: ClientRecord) {
    const initial = formFromClient(client);
    setFormMode('edit');
    setEditingId(client.id);
    setFormInitial(initial);
    setFormValues(initial);
    setFormErrors({});
  }

  function closeForm(force = false) {
    if (!force && hasFormChanges && !window.confirm('Hay cambios sin guardar. ¿Deseas descartarlos?')) return;
    setFormMode(null);
    setEditingId(null);
    setFormInitial(null);
    setFormErrors({});
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validateForm(formValues, clients, editingId);
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    const cleanValues = {
      ...formValues,
      nombres: formValues.nombres.trim(),
      apellidoPaterno: formValues.apellidoPaterno.trim(),
      apellidoMaterno: formValues.apellidoMaterno.trim(),
      curp: formValues.curp.trim().toLocaleUpperCase(),
      correoElectronico: formValues.correoElectronico.trim().toLocaleLowerCase(),
      numeroCelular: formValues.numeroCelular.trim(),
      estaturaMetros: formValues.estaturaMetros.trim(),
      pesoObjetivoKg: formValues.pesoObjetivoKg.trim(),
    };

    if (editingId !== null) {
      setClients((current) => current.map((client) => client.id === editingId ? { ...client, ...cleanValues } : client));
      setSelectedId(editingId);
    } else {
      const id = Math.max(...clients.map((client) => client.id), 1000) + 1;
      const newClient: ClientRecord = {
        id,
        ...cleanValues,
        estadoCuenta: 'pendiente',
        suscripcion: null,
      };
      setClients((current) => [newClient, ...current]);
      setSelectedId(id);
      setView('profile');
    }
    closeForm(true);
  }

  function openProfile(client: ClientRecord) {
    setSelectedId(client.id);
    setView('profile');
  }

  function handleRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>, client: ClientRecord) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProfile(client);
    }
  }

  function updateFormField(field: keyof ClientFormValues, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: undefined }));
  }

  const selectClass = 'min-h-11 w-full rounded-xl border border-white/10 bg-[#101115] px-3.5 py-2.5 text-sm text-gray-200 outline-none focus:border-[#ff526a]/70 focus:ring-2 focus:ring-[#ff526a]/15';
  const buttonSecondary = 'inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-semibold text-gray-200 transition hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff526a]';

  return <div className="w-full min-w-0 space-y-6 px-4 py-6 text-white sm:px-6 lg:px-14">
    {view === 'directory' ? <>
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-amber-300/[0.06] px-2.5 py-1 text-xs font-medium text-amber-100/80">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />Datos de demostración
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">Gestión de clientes</h1>
          <p className="mt-1.5 text-sm text-gray-400">Consulta, localiza y administra los registros del gimnasio</p>
        </div>
        <button type="button" onClick={openCreate} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#df2f4e] to-[#ff526a] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-950/30 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7083] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090a0f]">
          <Icon name="plus" className="h-4 w-4" />Nuevo cliente
        </button>
      </section>

      <section aria-label="Resumen de clientes" className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          { title: 'Total de clientes', value: summary.total, note: 'Registros locales', icon: 'users', tone: 'text-rose-300 bg-rose-400/10' },
          { title: 'Cuentas activas', value: summary.activeAccounts, note: 'Estado de cuenta', icon: 'check', tone: 'text-emerald-300 bg-emerald-400/10' },
          { title: 'Cuentas suspendidas', value: summary.suspendedAccounts, note: 'Estado de cuenta', icon: 'shield', tone: 'text-amber-200 bg-amber-400/10' },
          { title: 'Suscripciones vencidas', value: summary.expiredSubscriptions, note: 'Estado de suscripción', icon: 'alert', tone: 'text-rose-300 bg-rose-400/10' },
        ].map((item) => <article key={item.title} className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#111216] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-400 sm:text-sm">{item.title}</p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-white">{item.value}</p>
              <p className="mt-1 text-xs text-gray-500">{item.note}</p>
            </div>
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.tone}`}><Icon name={item.icon} className="h-4 w-4" /></span>
          </div>
        </article>)}
      </section>

      <section aria-label="Buscar y filtrar clientes" className="rounded-2xl border border-white/[0.07] bg-[#111216] p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(250px,1.5fr)_repeat(3,minmax(150px,1fr))_auto] xl:items-end">
          <div className="space-y-2">
            <label htmlFor="client-search" className="block text-xs font-semibold text-gray-400">Buscar cliente</label>
            <div className="relative">
              <Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input id="client-search" type="search" value={search} onChange={(event) => { setSearch(event.target.value); resetPage(); }} placeholder="Nombre, ID, correo o celular" className="min-h-11 w-full rounded-xl border border-white/10 bg-[#101115] py-2.5 pl-10 pr-3.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#ff526a]/70 focus:ring-2 focus:ring-[#ff526a]/15" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="account-filter" className="block text-xs font-semibold text-gray-400">Estado de cuenta</label>
            <select id="account-filter" value={accountFilter} onChange={(event) => { setAccountFilter(event.target.value as AccountFilter); resetPage(); }} className={selectClass}>
              <option value="todos">Todas las cuentas</option>
              <option value="activa">Activa</option><option value="inactiva">Inactiva</option><option value="suspendida">Suspendida</option><option value="pendiente">Pendiente</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="subscription-filter" className="block text-xs font-semibold text-gray-400">Estado de suscripción</label>
            <select id="subscription-filter" value={subscriptionFilter} onChange={(event) => { setSubscriptionFilter(event.target.value as SubscriptionFilter); resetPage(); }} className={selectClass}>
              <option value="todas">Todas</option><option value="activa">Activa</option><option value="vencida">Vencida</option><option value="cancelada">Cancelada</option><option value="sin_suscripcion">Sin suscripción</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="plan-filter" className="block text-xs font-semibold text-gray-400">Plan <span className="text-amber-200/70">· demo</span></label>
            <select id="plan-filter" value={planFilter} onChange={(event) => { setPlanFilter(event.target.value); resetPage(); }} className={selectClass}>
              <option value="todos">Todos los planes</option>{plans.map((plan) => <option key={plan} value={plan}>{plan}</option>)}
            </select>
          </div>
          <button type="button" onClick={clearFilters} className={`${buttonSecondary} w-full xl:w-auto`}>Limpiar filtros</button>
        </div>
      </section>

      <section className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111216]">
        <div className="flex flex-col gap-3 border-b border-white/[0.07] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 className="text-base font-semibold">Directorio</h2>
            <p className="mt-0.5 text-xs text-gray-500">Selecciona un registro para consultar su perfil</p>
          </div>
          <span className="text-sm text-gray-400"><span className="font-semibold text-white">{filteredClients.length}</span> {filteredClients.length === 1 ? 'resultado' : 'resultados'}</span>
        </div>

        {filteredClients.length === 0 ? <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-gray-500"><Icon name="search" className="h-5 w-5" /></span>
          <h3 className="text-sm font-semibold text-white">No encontramos clientes</h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">Prueba con otro término o limpia los filtros para ver todos los registros.</p>
          <button type="button" onClick={clearFilters} className="mt-4 text-sm font-semibold text-rose-300 hover:text-rose-200">Limpiar filtros</button>
        </div> : <>
          <div className="hidden min-w-0 overflow-x-auto md:block">
            <table className="w-full min-w-[1040px] border-collapse text-left">
              <thead className="bg-white/[0.025] text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th scope="col" className="px-5 py-3.5">Cliente</th><th scope="col" className="px-4 py-3.5">ID</th><th scope="col" className="px-4 py-3.5">Correo electrónico</th><th scope="col" className="px-4 py-3.5">Celular</th><th scope="col" className="px-4 py-3.5">Estado de cuenta</th><th scope="col" className="px-4 py-3.5">Plan · demo</th><th scope="col" className="px-4 py-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.055]">
                {visibleClients.map((client) => <tr key={client.id} onClick={() => openProfile(client)} onKeyDown={(event) => handleRowKeyDown(event, client)} tabIndex={0} aria-label={`Abrir perfil de ${fullName(client)}`} className={`cursor-pointer outline-none transition focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff526a] hover:bg-white/[0.035] ${selectedId === client.id ? 'bg-rose-400/[0.07]' : ''}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#1b1c22] text-xs font-bold text-gray-200">{initials(client)}</span><span className="min-w-0"><span className="block truncate text-sm font-semibold text-white">{fullName(client)}</span><span className="mt-0.5 block text-xs text-gray-500">Cliente IRONFIT</span></span></div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 font-mono text-xs text-gray-400">CLI-{client.id}</td>
                  <td className="max-w-[230px] truncate px-4 py-3.5 text-sm text-gray-300" title={client.correoElectronico}>{client.correoElectronico}</td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm text-gray-300">{client.numeroCelular}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={client.estadoCuenta} kind="account" /></td>
                  <td className="px-4 py-3.5"><span className="block max-w-[180px] truncate text-sm font-medium text-gray-200">{client.suscripcion?.plan ?? 'Sin suscripción'}</span>{client.suscripcion && <span className="mt-1 block"><StatusBadge status={client.suscripcion.estado} kind="subscription" /></span>}</td>
                  <td className="px-4 py-3.5"><div className="flex justify-end gap-2">
                    <button type="button" aria-label={`Ver perfil de ${fullName(client)}`} title="Ver perfil" onClick={(event) => { event.stopPropagation(); openProfile(client); }} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:border-rose-300/30 hover:bg-rose-400/10 hover:text-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff526a]"><Icon name="arrow" className="h-4 w-4" /></button>
                    <button type="button" aria-label={`Editar ${fullName(client)}`} title="Editar cliente" onClick={(event) => { event.stopPropagation(); openEdit(client); }} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:border-rose-300/30 hover:bg-rose-400/10 hover:text-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff526a]"><Icon name="edit" className="h-4 w-4" /></button>
                  </div></td>
                </tr>)}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 p-3 md:hidden">
            {visibleClients.map((client) => <article key={client.id} className={`rounded-xl border p-4 transition ${selectedId === client.id ? 'border-rose-400/30 bg-rose-400/[0.055]' : 'border-white/[0.07] bg-[#0d0e12]'}`}>
              <button type="button" onClick={() => openProfile(client)} className="flex w-full items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff526a]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#1b1c22] text-xs font-bold text-gray-200">{initials(client)}</span>
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{fullName(client)}</span><span className="block font-mono text-xs text-gray-500">CLI-{client.id}</span></span><Icon name="chevron" className="h-4 w-4 text-gray-500" />
              </button>
              <div className="mt-4 grid grid-cols-1 gap-2 border-t border-white/[0.06] pt-3 text-sm">
                <p className="flex min-w-0 items-center gap-2 text-gray-400"><Icon name="mail" className="h-4 w-4 shrink-0 text-gray-500" /><span className="truncate">{client.correoElectronico}</span></p>
                <p className="flex items-center gap-2 text-gray-400"><Icon name="phone" className="h-4 w-4 shrink-0 text-gray-500" />{client.numeroCelular}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1"><StatusBadge status={client.estadoCuenta} kind="account" />{client.suscripcion && <StatusBadge status={client.suscripcion.estado} kind="subscription" />}</div>
                <p className="text-xs text-gray-500">Plan de demostración: {client.suscripcion?.plan ?? 'Sin suscripción'}</p>
              </div>
              <div className="mt-3 flex justify-end gap-2 border-t border-white/[0.06] pt-3">
                <button type="button" onClick={() => openProfile(client)} className={buttonSecondary}><Icon name="arrow" className="h-4 w-4" />Perfil</button>
                <button type="button" onClick={() => openEdit(client)} className={buttonSecondary}><Icon name="edit" className="h-4 w-4" />Editar</button>
              </div>
            </article>)}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/[0.07] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-2 text-xs text-gray-500"><label htmlFor="page-size">Filas por página</label><select id="page-size" value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} className="rounded-lg border border-white/10 bg-[#101115] px-2.5 py-1.5 text-xs text-gray-200 outline-none focus:border-rose-400/50"><option value={5}>5</option><option value={10}>10</option><option value={20}>20</option></select><span>Mostrando {filteredClients.length ? (safePage - 1) * pageSize + 1 : 0}–{Math.min(safePage * pageSize, filteredClients.length)} de {filteredClients.length}</span></div>
            <nav aria-label="Paginación del directorio" className="flex items-center gap-2 self-end sm:self-auto">
              <button type="button" disabled={safePage <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} aria-label="Página anterior" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff526a]"><Icon name="left" className="h-4 w-4" /></button>
              <span aria-live="polite" className="min-w-20 text-center text-sm text-gray-300">Página {safePage} de {pageCount}</span>
              <button type="button" disabled={safePage >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))} aria-label="Página siguiente" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff526a]"><Icon name="right" className="h-4 w-4" /></button>
            </nav>
          </div>
        </>}
      </section>
    </> : selectedClient ? <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => setView('directory')} className={`${buttonSecondary} border-transparent bg-transparent px-0 text-gray-400 hover:bg-transparent hover:text-white`}><Icon name="back" className="h-4 w-4" />Volver al directorio</button>
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/15 bg-amber-300/[0.06] px-2.5 py-1 text-xs font-medium text-amber-100/80"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" />Perfil de demostración</span>
      </div>

      <section className="rounded-2xl border border-white/[0.07] bg-[#111216] p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-rose-300/20 bg-gradient-to-br from-rose-400/15 to-[#18191e] text-xl font-bold text-rose-100">{initials(selectedClient)}</span>
            <div className="min-w-0"><p className="mb-1 font-mono text-xs text-gray-500">CLIENTE · CLI-{selectedClient.id}</p><h1 className="break-words text-2xl font-bold tracking-tight sm:text-[28px]">{fullName(selectedClient)}</h1><p className="mt-2 text-sm text-gray-400">Información local para revisión administrativa</p></div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end"><StatusBadge status={selectedClient.estadoCuenta} kind="account" />{selectedClient.suscripcion ? <StatusBadge status={selectedClient.suscripcion.estado} kind="subscription" /> : <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-gray-400">Sin suscripción</span>}<button type="button" onClick={() => openEdit(selectedClient)} className="ml-0 inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-[#df2f4e] to-[#ff526a] px-3.5 py-2 text-sm font-semibold text-white sm:ml-2"><Icon name="edit" className="h-4 w-4" />Editar cliente</button></div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-white/[0.07] bg-[#111216] p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold"><Icon name="person" className="h-4 w-4 text-rose-300" />Información personal</h2>
          <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <DetailItem label="Nombres" value={selectedClient.nombres} /><DetailItem label="Apellido paterno" value={selectedClient.apellidoPaterno} /><DetailItem label="Apellido materno" value={selectedClient.apellidoMaterno || 'Sin información registrada'} /><DetailItem label="CURP" value={selectedClient.curp} mono /><DetailItem label="Fecha de nacimiento" value={formatDate(selectedClient.fechaNacimiento)} />
          </dl>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-[#111216] p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold"><Icon name="mail" className="h-4 w-4 text-rose-300" />Contacto</h2>
          <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2"><DetailItem label="Correo electrónico" value={selectedClient.correoElectronico} /><DetailItem label="Número celular" value={selectedClient.numeroCelular} /></dl>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-[#111216] p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold"><Icon name="ruler" className="h-4 w-4 text-rose-300" />Información física complementaria</h2>
          <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2"><DetailItem label="Estatura" value={selectedClient.estaturaMetros ? `${selectedClient.estaturaMetros} m` : 'Sin información registrada'} /><DetailItem label="Peso objetivo" value={selectedClient.pesoObjetivoKg ? `${selectedClient.pesoObjetivoKg} kg` : 'Sin información registrada'} /></dl>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-[#111216] p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold"><Icon name="shield" className="h-4 w-4 text-rose-300" />Cuenta</h2>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#0d0e12] p-4"><div><p className="text-sm font-medium text-white">Estado de cuenta</p><p className="mt-1 text-xs text-gray-500">Es independiente del estado de suscripción</p></div><StatusBadge status={selectedClient.estadoCuenta} kind="account" /></div>
        </section>
      </div>

      <section id="profile-subscription" className="scroll-mt-6 rounded-2xl border border-white/[0.07] bg-[#111216] p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="flex items-center gap-2 text-base font-semibold"><Icon name="card" className="h-4 w-4 text-rose-300" />Suscripción y plan</h2><p className="mt-1 text-xs text-gray-500">Información asociada de demostración; pendiente de consulta desde API</p></div>{selectedClient.suscripcion && <StatusBadge status={selectedClient.suscripcion.estado} kind="subscription" />}</div>
        {selectedClient.suscripcion ? <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl border border-white/[0.06] bg-[#0d0e12] p-4 sm:grid-cols-3"><DetailItem label="Plan · demostración" value={selectedClient.suscripcion.plan} /><DetailItem label="Fecha de inicio · demostración" value={formatDate(selectedClient.suscripcion.fechaInicio)} /><DetailItem label="Vencimiento · demostración" value={formatDate(selectedClient.suscripcion.fechaFin)} /></div> : <p className="mt-5 rounded-xl border border-dashed border-white/10 bg-[#0d0e12] px-4 py-5 text-sm text-gray-400">No hay una suscripción asociada en este registro de demostración.</p>}
        {selectedClient.suscripcion && <button type="button" onClick={() => document.getElementById('profile-subscription')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="mt-4 text-sm font-semibold text-rose-300 hover:text-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff526a]">Volver a consultar suscripción de demostración <span aria-hidden="true">↗</span></button>}
      </section>

      <section aria-label="Pagos y asistencias" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {['Pagos', 'Asistencias'].map((title) => <div key={title} className="flex items-start gap-3 rounded-2xl border border-dashed border-white/10 bg-[#111216]/60 p-4 sm:p-5"><span className="mt-0.5 text-amber-200"><Icon name="alert" className="h-4 w-4" /></span><div><h2 className="text-sm font-semibold text-gray-200">{title}</h2><p className="mt-1 text-sm text-gray-500">Integración pendiente. No se muestra historial local inventado.</p></div></div>)}
      </section>
    </> : <div className="rounded-2xl border border-white/[0.07] bg-[#111216] p-8 text-center"><h1 className="text-lg font-semibold">Perfil no disponible</h1><button type="button" onClick={() => setView('directory')} className="mt-3 text-sm text-rose-300">Volver al directorio</button></div>}

    {formMode && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) closeForm(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="client-form-title" className="my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141519] shadow-2xl shadow-black/50" onKeyDown={(event) => { if (event.key === 'Escape') closeForm(); }}>
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/[0.07] px-5 py-5 sm:px-7">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-300">Directorio · demostración</p><h2 id="client-form-title" className="mt-1 text-xl font-bold">{formMode === 'create' ? 'Nuevo cliente' : 'Editar cliente'}</h2><p className="mt-1 text-sm text-gray-500">Los cambios se mantienen solo en esta sesión del navegador.</p></div>
          <button type="button" aria-label="Cerrar formulario" onClick={() => closeForm()} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff526a]"><Icon name="close" className="h-4 w-4" /></button>
        </div>
        <form onSubmit={handleFormSubmit} noValidate className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-6 px-5 py-5 sm:px-7 sm:py-6">
            <fieldset className="space-y-4">
              <legend className="mb-1 text-sm font-semibold text-gray-200">Información personal</legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Nombres" id="nombres" value={formValues.nombres} onChange={(value) => updateFormField('nombres', value)} error={formErrors.nombres} maxLength={100} required autoComplete="given-name" />
                <FormField label="Apellido paterno" id="apellidoPaterno" value={formValues.apellidoPaterno} onChange={(value) => updateFormField('apellidoPaterno', value)} error={formErrors.apellidoPaterno} maxLength={100} required autoComplete="family-name" />
                <FormField label="Apellido materno" id="apellidoMaterno" value={formValues.apellidoMaterno} onChange={(value) => updateFormField('apellidoMaterno', value)} error={formErrors.apellidoMaterno} maxLength={100} />
                <FormField label="CURP" id="curp" value={formValues.curp} onChange={(value) => updateFormField('curp', value.toLocaleUpperCase())} error={formErrors.curp} maxLength={18} placeholder="18 caracteres" required />
                <FormField label="Fecha de nacimiento" id="fechaNacimiento" type="date" value={formValues.fechaNacimiento} onChange={(value) => updateFormField('fechaNacimiento', value)} error={formErrors.fechaNacimiento} required />
              </div>
            </fieldset>

            <fieldset className="space-y-4 border-t border-white/[0.07] pt-5">
              <legend className="mb-1 text-sm font-semibold text-gray-200">Contacto</legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Correo electrónico" id="correoElectronico" type="email" value={formValues.correoElectronico} onChange={(value) => updateFormField('correoElectronico', value)} error={formErrors.correoElectronico} maxLength={150} autoComplete="email" required />
                <FormField label="Número celular" id="numeroCelular" type="tel" value={formValues.numeroCelular} onChange={(value) => updateFormField('numeroCelular', value)} error={formErrors.numeroCelular} maxLength={20} autoComplete="tel" required />
              </div>
            </fieldset>

            <fieldset className="space-y-4 border-t border-white/[0.07] pt-5">
              <legend className="mb-1 text-sm font-semibold text-gray-200">Información física <span className="font-normal text-gray-500">· opcional</span></legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Estatura (metros)" id="estaturaMetros" type="number" value={formValues.estaturaMetros} onChange={(value) => updateFormField('estaturaMetros', value)} error={formErrors.estaturaMetros} placeholder="0.50–3.00" />
                <FormField label="Peso objetivo (kg)" id="pesoObjetivoKg" type="number" value={formValues.pesoObjetivoKg} onChange={(value) => updateFormField('pesoObjetivoKg', value)} error={formErrors.pesoObjetivoKg} placeholder="1–800" />
              </div>
            </fieldset>

            <div className="flex items-start gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[0.045] p-3.5 text-sm text-amber-100/80"><Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" /><p>El modelo requiere un código de acceso único. Su generación y asignación se definirán al integrar el backend; este formulario no genera ni guarda uno.</p></div>
          </div>
          <div className="flex flex-col-reverse gap-2 border-t border-white/[0.07] bg-[#101115] px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
            <button type="button" onClick={() => closeForm()} className={buttonSecondary}>Cancelar</button>
            <button type="submit" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#df2f4e] to-[#ff526a] px-4 py-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7083]"><Icon name="check" className="h-4 w-4" />{formMode === 'create' ? 'Crear cliente de demostración' : 'Guardar cambios locales'}</button>
          </div>
        </form>
      </section>
    </div>}
  </div>;
}

function DetailItem({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return <div className="min-w-0"><dt className="text-xs font-medium text-gray-500">{label}</dt><dd className={`mt-1.5 break-words text-sm font-medium text-gray-200 ${mono ? 'font-mono' : ''}`}>{value}</dd></div>;
}
