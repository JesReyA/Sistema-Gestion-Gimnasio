'use client';

import { useState } from 'react';

type Meal = {
  id: string;
  name: string;
  time: string;
  detail: string;
  calories: number;
};

const meals: Meal[] = [
  { id: 'breakfast', name: 'Desayuno', time: '8:00', detail: 'Avena, fruta y yogur', calories: 420 },
  { id: 'lunch', name: 'Comida', time: '14:00', detail: 'Pollo, arroz y verduras', calories: 610 },
  { id: 'dinner', name: 'Cena', time: '20:00', detail: 'Tostadas de aguacate y huevo', calories: 480 },
  { id: 'snack', name: 'Colaciones', time: 'Entre comidas', detail: 'Fruta y un puñado de nueces', calories: 220 },
];

const nutrients = [
  { name: 'Proteína', amount: 92, target: 130, unit: 'g' },
  { name: 'Carbohidratos', amount: 148, target: 220, unit: 'g' },
  { name: 'Grasas', amount: 42, target: 65, unit: 'g' },
];

const weightSamples = [38, 48, 43, 61, 57, 72, 67, 82];

function SectionHeading({ title, detail, id }: { title: string; detail?: string; id?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-2">
      <h2 id={id} className="text-sm font-semibold text-white">{title}</h2>
      {detail && <p className="text-[10px] text-[#858894]">{detail}</p>}
    </div>
  );
}

function ProgressBar({ value, target, color = 'bg-[#ff3355]' }: { value: number; target: number; color?: string }) {
  const width = Math.min(100, Math.round((value / target) * 100));
  return (
    <div
      className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]"
      role="progressbar"
      aria-label="Progreso"
      aria-valuemin={0}
      aria-valuemax={target}
      aria-valuenow={value}
    >
      <div className={`h-full rounded-full ${color}`} style={{ width: `${width}%` }} />
    </div>
  );
}

export default function NutricionPage() {
  const [completedMeals, setCompletedMeals] = useState<string[]>(['breakfast']);
  const consumedCalories = meals.reduce(
    (total, meal) => total + (completedMeals.includes(meal.id) ? meal.calories : 0),
    0,
  );
  const today = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  function toggleMeal(id: string) {
    setCompletedMeals((current) =>
      current.includes(id) ? current.filter((mealId) => mealId !== id) : [...current, id],
    );
  }

  return (
    <div className="space-y-5 py-3 pb-5">
      <header className="space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff4964]">Mi bienestar</p>
        <div className="flex items-end justify-between gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">Nutrición</h1>
          <time dateTime={new Date().toISOString().slice(0, 10)} className="pb-1 text-[10px] capitalize text-[#858894]">{today}</time>
        </div>
        <p className="max-w-[32ch] text-xs leading-relaxed text-[#a2a4ad]">
          Lleva un registro sencillo de tus comidas y hábitos del día.
        </p>
      </header>

      <section aria-labelledby="daily-summary" className="rounded-2xl border border-white/[0.06] bg-[#111218] p-4">
        <SectionHeading id="daily-summary" title="Resumen de hoy" detail="Datos de demostración" />
        <div className="mb-4 flex items-end justify-between">
          <div><p className="text-2xl font-bold text-white">{consumedCalories.toLocaleString('es-MX')} <span className="text-xs font-medium text-[#9b9da7]">kcal</span></p><p className="mt-0.5 text-[10px] text-[#858894]">consumidas · objetivo 1,800 kcal</p></div>
          <span className="text-xs font-semibold text-[#ff7186]">{Math.min(100, Math.round((consumedCalories / 1800) * 100))}%</span>
        </div>
        <ProgressBar value={consumedCalories} target={1800} />
        <div className="mt-4 grid grid-cols-3 gap-3">
          {nutrients.map((nutrient, index) => (
            <div key={nutrient.name}>
              <div className="mb-1.5 flex flex-col">
                <span className="text-[10px] text-[#a2a4ad]">{nutrient.name}</span>
                <span className="text-xs font-semibold text-white">{nutrient.amount}<span className="ml-0.5 text-[9px] font-normal text-[#858894]">/{nutrient.target}{nutrient.unit}</span></span>
              </div>
              <ProgressBar value={nutrient.amount} target={nutrient.target} color={['bg-[#ff7186]', 'bg-[#d18b55]', 'bg-[#8b8bea]'][index]} />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="meals-heading">
        <SectionHeading id="meals-heading" title="Comidas del día" detail={`${completedMeals.length} de ${meals.length} registradas`} />
        <ul className="space-y-2">
          {meals.map((meal) => {
            const completed = completedMeals.includes(meal.id);
            return (
              <li key={meal.id} className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${completed ? 'border-[#ff4964]/20 bg-[#ff3355]/[0.045]' : 'border-white/[0.06] bg-[#101116]'}`}>
                <button
                  type="button"
                  onClick={() => toggleMeal(meal.id)}
                  aria-pressed={completed}
                  aria-label={`${completed ? 'Desmarcar' : 'Marcar'} ${meal.name} como registrada`}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4964] ${completed ? 'border-[#ff4964] bg-[#ff4964] text-white' : 'border-white/20 text-transparent hover:border-[#ff4964]'}`}
                >✓</button>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-xs font-semibold ${completed ? 'text-white' : 'text-[#d7d8de]'}`}>{meal.name}</h3>
                    <span className="shrink-0 text-[10px] text-[#858894]">{meal.time}</span>
                  </div>
                  <p className="mt-0.5 truncate text-[10px] text-[#858894]">{meal.detail}</p>
                </div>
                <span className="shrink-0 text-[10px] font-medium text-[#b4b5bd]">{meal.calories} kcal</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 text-[9px] text-[#777984]">El registro solo se conserva en esta sesión.</p>
      </section>

      <section aria-labelledby="plan-heading" className="rounded-2xl border border-white/[0.06] bg-[#111218] p-4">
        <SectionHeading id="plan-heading" title="Plan alimenticio" detail="Ejemplo editable" />
        <div className="flex items-start justify-between gap-3">
          <div><h3 className="text-sm font-semibold text-white">Equilibrio diario</h3><p className="mt-1 text-[10px] leading-relaxed text-[#a2a4ad]">Propuesta ilustrativa para organizar horarios y variedad. No es una recomendación médica ni nutricional personalizada.</p></div>
          <span className="shrink-0 rounded-full bg-[#ff3355]/10 px-2 py-1 text-[9px] font-medium text-[#ff8495]">4 comidas</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Distribución diaria de comidas">
          {['Desayuno', 'Comida', 'Cena', 'Colaciones'].map((item) => <span key={item} className="rounded-md bg-white/[0.045] px-2 py-1 text-[9px] text-[#b6b7c0]">{item}</span>)}
        </div>
      </section>

      <section aria-labelledby="goal-heading" className="rounded-2xl border border-white/[0.06] bg-[#111218] p-4">
        <SectionHeading id="goal-heading" title="Objetivo y progreso" detail="Datos de demostración" />
        <div className="flex items-end justify-between gap-3">
          <div><p className="text-[10px] text-[#858894]">Peso actual</p><p className="text-lg font-bold text-white">72.4 <span className="text-[10px] font-medium text-[#9b9da7]">kg</span></p></div>
          <div className="text-right"><p className="text-[10px] text-[#858894]">Meta ilustrativa · 68 kg</p><p className="text-xs font-semibold text-[#ff7186]">4.4 kg por avanzar</p></div>
        </div>
        <div className="mt-3"><ProgressBar value={2.6} target={7} /><p className="mt-1.5 text-[9px] text-[#777984]">2.6 kg de progreso ilustrativo hacia la meta</p></div>
        <div className="mt-4 flex items-end justify-between gap-1" role="img" aria-label="Gráfica ilustrativa de tendencia reciente de peso">
          {weightSamples.map((height, index) => <span key={index} className={`h-10 flex-1 rounded-t-sm ${index === weightSamples.length - 1 ? 'bg-[#ff4964]' : 'bg-[#ff4964]/25'}`} style={{ height: `${height}%` }} />)}
        </div>
        <p className="mt-1 text-center text-[9px] text-[#777984]">Tendencia de ejemplo, sin historial real</p>
      </section>
    </div>
  );
}
