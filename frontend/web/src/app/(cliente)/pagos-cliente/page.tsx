const invoices = [
  {
    date: '15 oct 2026',
    concept: 'Membresía Fuerza — mensual',
    method: 'Visa •••• 4242',
    amount: '$899.00',
    status: 'Demostración',
  },
  {
    date: '15 sep 2026',
    concept: 'Membresía Fuerza — mensual',
    method: 'Visa •••• 4242',
    amount: '$899.00',
    status: 'Demostración',
  },
  {
    date: '15 ago 2026',
    concept: 'Membresía Fuerza — mensual',
    method: 'Transferencia',
    amount: '$899.00',
    status: 'Demostración',
  },
];

const benefits = [
  'Acceso ilimitado a sala de pesas',
  'Zona de cardio y peso libre',
  'Evaluación física de bienvenida',
  'Invita a un acompañante una vez al mes',
];

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff7186]">{eyebrow}</p>
      <h2 className="mt-1 break-words text-base font-bold text-white">{children}</h2>
    </div>
  );
}

function DemoTag() {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/[0.08] px-2.5 py-1 text-[10px] font-semibold text-amber-200">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber-300" />
      Datos de demostración
    </span>
  );
}

const cardClassName = 'min-w-0 rounded-2xl border border-white/[0.07] bg-[#121319] p-4';

export default function PagosClientePage() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-5 py-4 pb-8">
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[340px] bg-[#ff2a55]/15 blur-[140px] rounded-full -z-0" />
      <header className="flex min-w-0 flex-col items-start gap-2 border-b border-white/[0.08] pb-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#ff4964] shadow-[0_0_12px_#ff4964]" />
            <span>IRONFIT · Área de cliente</span>
          </div>
          <h1 className="break-words text-xl font-bold tracking-tight text-white">Pagos y Facturación</h1>
          <p className="mt-1.5 max-w-[34ch] text-xs leading-relaxed text-gray-400">
            Consulta tu membresía y revisa la información de pago y facturación.
          </p>
        </div>
        <DemoTag />
      </header>

      <section aria-label="Resumen de membresía" className="grid min-w-0 grid-cols-1 gap-2.5 min-[380px]:grid-cols-2">
        <article className={cardClassName}>
          <p className="text-xs text-gray-400">Membresía</p>
          <p className="mt-2 text-lg font-bold text-white">Fuerza <span className="text-[#ff4964]">+</span></p>
          <p className="mt-1 text-[11px] text-gray-400">Plan de demostración</p>
        </article>
        <article className={cardClassName}>
          <p className="text-xs text-gray-400">Precio y periodo</p>
          <p className="mt-2 break-words text-lg font-bold text-white">$899 <span className="text-xs font-medium text-gray-300">MXN / mes</span></p>
          <p className="mt-1 text-[11px] text-gray-400">Importe ficticio</p>
        </article>
        <article className={cardClassName}>
          <p className="text-xs text-gray-400">Vigencia de ejemplo</p>
          <p className="mt-2 break-words text-lg font-bold text-white">15 oct — 14 nov</p>
          <p className="mt-1 text-[11px] text-gray-400">2026 · fechas ficticias</p>
        </article>
        <article className={cardClassName}>
          <p className="text-xs text-gray-400">Visitas del periodo</p>
          <p className="mt-2 text-lg font-bold text-white">12 <span className="text-xs font-medium text-gray-300">visitas</span></p>
          <p className="mt-1 text-[11px] text-gray-400">Conteo de demostración</p>
        </article>
      </section>

      <section aria-labelledby="membership-heading" className={cardClassName}>
        <SectionTitle eyebrow="Tu plan">Membresía Fuerza</SectionTitle>
        <div className="flex min-w-0 flex-col gap-4">
          <div className="min-w-0 rounded-xl border border-[#ff4964]/20 bg-gradient-to-br from-[#ff3355]/10 to-transparent p-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#ff8495]">IRONFIT</p>
                <h3 id="membership-heading" className="mt-2 break-words text-2xl font-extrabold text-white">Fuerza <span className="text-[#ff4964]">+</span></h3>
              </div>
              <div className="shrink-0 rounded-lg bg-[#ff4964]/10 p-2 text-[#ff7186]" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 8v8m12-8v8M3 10v4m18-4v4M6 12h12" />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-gray-300">
              Plan mensual de ejemplo para mostrar la experiencia de consulta de membresía.
            </p>
          </div>
          <div className="min-w-0">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-300">Beneficios incluidos</p>
            <ul className="grid min-w-0 grid-cols-1 gap-2.5">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex min-w-0 items-start gap-2.5 text-sm leading-snug text-gray-200">
                  <span aria-hidden="true" className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#ff4964]/15 text-[10px] text-[#ff8495]">✓</span>
                  <span className="min-w-0 break-words">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="flex min-w-0 flex-col gap-5">
        <section aria-labelledby="payment-methods-heading" className={cardClassName}>
          <div className="flex min-w-0 items-start justify-between gap-2">
            <div className="min-w-0"><SectionTitle eyebrow="Preferencias">Métodos de pago</SectionTitle></div>
            <span className="shrink-0 rounded-full bg-white/[0.06] px-2 py-1 text-[10px] text-gray-300">Muestra</span>
          </div>
          <h2 id="payment-methods-heading" className="sr-only">Métodos de pago</h2>
          <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#191a21] p-3">
            <div aria-hidden="true" className="flex h-9 w-11 shrink-0 items-center justify-center rounded-lg bg-[#20222b] text-xs font-black italic text-gray-100">VISA</div>
            <div className="min-w-0 flex-1">
              <p className="break-words text-xs font-semibold text-white">Visa terminación 4242</p>
              <p className="mt-1 break-words text-[10px] leading-snug text-gray-400">Método ficticio · sin tarjeta registrada</p>
            </div>
            <span className="shrink-0 rounded-full border border-white/10 px-1.5 py-1 text-[9px] text-gray-300">Ejemplo</span>
          </div>
          <button
            type="button"
            title="Demostración: no se agregará ni guardará ningún método"
            aria-describedby="payment-demo-note"
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 px-3 py-3 text-center text-xs font-semibold leading-snug text-gray-200 transition hover:border-[#ff4964]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]"
          >
            <span aria-hidden="true" className="shrink-0 text-lg leading-none text-[#ff7186]">+</span>
            Agregar método de pago <span className="text-gray-400">(demo)</span>
          </button>
          <p id="payment-demo-note" className="mt-2 text-center text-[10px] leading-relaxed text-gray-400">
            Esta demostración no agrega tarjetas ni procesa pagos.
          </p>
        </section>

        <section aria-labelledby="billing-heading" className={cardClassName}>
          <div className="flex min-w-0 items-start justify-between gap-2">
            <div className="min-w-0"><SectionTitle eyebrow="Movimientos">Historial de facturación</SectionTitle></div>
            <span className="shrink-0 rounded-full bg-white/[0.06] px-2 py-1 text-[9px] text-gray-300">Datos ficticios</span>
          </div>
          <h2 id="billing-heading" className="sr-only">Historial de facturación</h2>

          <ul className="space-y-2.5" aria-label="Facturas de demostración">
            {invoices.map((invoice) => (
              <li key={invoice.date} className="min-w-0 rounded-xl border border-white/[0.07] bg-[#191a21] p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-400">{invoice.date}</p>
                    <p className="mt-1 break-words text-xs font-semibold leading-snug text-white">{invoice.concept}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-2 py-1 text-[9px] font-medium text-amber-200">{invoice.status}</span>
                </div>
                <div className="mt-3 flex min-w-0 items-end justify-between gap-2 border-t border-white/[0.06] pt-2.5">
                  <div className="min-w-0"><p className="text-[9px] uppercase tracking-wide text-gray-500">Método</p><p className="mt-0.5 break-words text-[11px] text-gray-300">{invoice.method}</p></div>
                  <div className="shrink-0 text-right"><p className="text-[9px] uppercase tracking-wide text-gray-500">Importe</p><p className="mt-0.5 text-sm font-semibold text-white">{invoice.amount}</p></div>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-3 text-[10px] leading-relaxed text-gray-400">Estos datos son ejemplos de interfaz; no representan cobros ni comprobantes emitidos.</p>
        </section>
      </div>

      <section aria-labelledby="tax-heading" className={cardClassName}>
        <div className="flex min-w-0 flex-col items-start gap-3">
          <div className="min-w-0">
            <SectionTitle eyebrow="Comprobantes fiscales">Datos fiscales · CFDI 4.0</SectionTitle>
            <p className="-mt-2 max-w-2xl text-xs leading-relaxed text-gray-400">
              Vista de referencia. En esta demostración los datos no se capturan, validan ni guardan.
            </p>
          </div>
          <span className="w-fit shrink-0 rounded-lg border border-white/[0.08] bg-[#191a21] px-2.5 py-2 text-[9px] font-semibold leading-tight text-gray-300">SIN CONFIGURAR · DEMO</span>
        </div>
        <h2 id="tax-heading" className="sr-only">Datos fiscales</h2>
        <dl className="mt-3 grid min-w-0 grid-cols-1 gap-2.5">
          <div className="min-w-0 rounded-xl border border-white/[0.07] bg-[#191a21] p-3"><dt className="text-[10px] text-gray-400">RFC</dt><dd className="mt-1.5 break-words text-xs text-gray-200">No capturado</dd></div>
          <div className="min-w-0 rounded-xl border border-white/[0.07] bg-[#191a21] p-3"><dt className="text-[10px] text-gray-400">Razón social</dt><dd className="mt-1.5 break-words text-xs text-gray-200">No capturada</dd></div>
          <div className="min-w-0 rounded-xl border border-white/[0.07] bg-[#191a21] p-3"><dt className="text-[10px] text-gray-400">Régimen fiscal</dt><dd className="mt-1.5 break-words text-xs text-gray-200">Sin seleccionar</dd></div>
          <div className="min-w-0 rounded-xl border border-white/[0.07] bg-[#191a21] p-3"><dt className="text-[10px] text-gray-400">Uso de CFDI</dt><dd className="mt-1.5 break-words text-xs text-gray-200">Sin seleccionar</dd></div>
        </dl>
        <div className="mt-3 flex min-w-0 flex-col gap-3 rounded-xl border border-[#ff4964]/15 bg-[#ff4964]/[0.04] p-3">
          <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff4964]/10 text-sm text-[#ff8495]">i</span>
          <p className="min-w-0 flex-1 text-xs leading-relaxed text-gray-300">La plataforma no tiene configuración fiscal conectada. Aquí no se emiten ni descargan facturas.</p>
          <button
            type="button"
            title="Demostración: no se capturarán ni guardarán datos fiscales"
            className="min-h-11 w-full shrink-0 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-gray-200 transition hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]"
          >
            Configurar datos fiscales <span className="text-gray-400">(demo)</span>
          </button>
        </div>
      </section>

      <p className="text-center text-[10px] text-gray-400">IRONFIT · Pantalla de demostración académica · Información ficticia</p>
    </div>
  );
}
