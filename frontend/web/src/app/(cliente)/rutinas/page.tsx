'use client';

import React, { useState, useMemo } from 'react';

// --- 1. MODELO DE DATOS Y TIPOS ---
export type DaysPerWeek = 3 | 4 | 5 | 6;
export type LegPreference = 'completa' | 'dividida';

export interface Exercise {
  id: string;
  name: string;
  setsReps: string;
}

export interface WorkoutDay {
  dayNumber: number;
  title: string;
  focus: string;
  exercises: Exercise[];
}

export interface GroupActivity {
  id: string;
  name: string;
  description: string;
  days: string;
  schedules: string[];
  intensity?: string;
}

// --- 2. BLOQUES MODULARES DE EJERCICIOS ---
const BLOCK_PUSH: Exercise[] = [
  { id: 'pu-1', name: 'Press horizontal con barra/mancuerna', setsReps: '4x12' },
  { id: 'pu-2', name: 'Press inclinado con barra/mancuerna', setsReps: '4x12' },
  { id: 'pu-3', name: 'Peck Deck', setsReps: '4x12' },
  { id: 'pu-4', name: 'Fondos', setsReps: '4x12' },
  { id: 'pu-5', name: 'Extensión de cuerda en polea/barra', setsReps: '4x12' },
  { id: 'pu-6', name: 'Extensión con copa D en polea', setsReps: '4x12' },
  { id: 'pu-7', name: 'Elevaciones laterales', setsReps: '4x12' },
  { id: 'pu-8', name: 'Elevaciones frontales', setsReps: '4x12' },
  { id: 'pu-9', name: 'Press Militar', setsReps: '4x12' },
  { id: 'pu-10', name: 'Deltoides Posterior', setsReps: '4x12' },
];

const BLOCK_PULL: Exercise[] = [
  { id: 'pl-1', name: 'Jalón al pecho', setsReps: '4x12' },
  { id: 'pl-2', name: 'Pull over en polea', setsReps: '4x12' },
  { id: 'pl-3', name: 'Remo sentado en máquina/mancuerna', setsReps: '4x12' },
  { id: 'pl-4', name: 'Pull ups peso libre/máquina', setsReps: '4x12' },
  { id: 'pl-5', name: 'Curl martillo con mancuerna/máquina', setsReps: '4x12' },
  { id: 'pl-6', name: 'Curl inclinado en banco', setsReps: '4x12' },
  { id: 'pl-7', name: 'Curl predicador', setsReps: '4x12' },
];

const BLOCK_LEG_FULL: Exercise[] = [
  { id: 'lf-1', name: 'Sentadilla Hack / Pendular', setsReps: '4x12' },
  { id: 'lf-2', name: 'Femoral sentado', setsReps: '4x12' },
  { id: 'lf-3', name: 'Femoral parado', setsReps: '2x10' },
  { id: 'lf-4', name: 'Extensión de cuádriceps', setsReps: '4x12' },
  { id: 'lf-5', name: 'Hip thrust', setsReps: '4x12' },
  { id: 'lf-6', name: 'Elevación de talón', setsReps: '4x12' },
  { id: 'lf-7', name: 'Peso Muerto', setsReps: '3x10' },
  { id: 'lf-8', name: 'Abductores en máquina', setsReps: '4x12' },
];

const BLOCK_LEG_SPLIT_DAY_1: Exercise[] = [
  { id: 'ls1-1', name: 'Patrón de sentadilla: Hack/Pendular/libre', setsReps: '4x10' },
  { id: 'ls1-2', name: 'Prensa', setsReps: '4x8' },
  { id: 'ls1-3', name: 'Extensión de cuádriceps', setsReps: '4x10' },
  { id: 'ls1-4', name: 'Sentadilla Búlgara', setsReps: '4x10' },
  { id: 'ls1-5', name: 'Abductores', setsReps: '4x12' },
  { id: 'ls1-6', name: 'Elevación de Talón', setsReps: '4x12' },
];

const BLOCK_LEG_SPLIT_DAY_2: Exercise[] = [
  { id: 'ls2-1', name: 'Femoral acostado', setsReps: '2x8' },
  { id: 'ls2-2', name: 'Femoral sentado', setsReps: '4x8' },
  { id: 'ls2-3', name: 'Peso Muerto', setsReps: '4x12' },
  { id: 'ls2-4', name: 'Máquina de Glúteo', setsReps: '3x12' },
  { id: 'ls2-5', name: 'Hip thrust', setsReps: '4x12' },
  { id: 'ls2-6', name: 'Sentadilla V', setsReps: '3x10' },
  { id: 'ls2-7', name: 'Elevación de talón parado', setsReps: '4x12' },
  { id: 'ls2-8', name: 'Elevación de talón sentado', setsReps: '4x12' },
];

const BLOCK_CORE_SHORT: Exercise[] = [
  { id: 'cs-1', name: 'Crunches en máquina', setsReps: '4x12' },
  { id: 'cs-2', name: 'Elevación de piernas', setsReps: '4x12' },
];

const BLOCK_CORE_FULL: Exercise[] = [
  { id: 'cf-1', name: 'Crunches en máquina', setsReps: '4x12' },
  { id: 'cf-2', name: 'Elevación de piernas', setsReps: '4x12' },
  { id: 'cf-3', name: 'Plancha', setsReps: '4x60 seg' },
  { id: 'cf-4', name: 'Oblicuos con peso', setsReps: '4x12' },
  { id: 'cf-5', name: 'Cardio (caminadora/bicicleta/escaleras)', setsReps: '30 min' },
];

const BLOCK_FULL_BODY: Exercise[] = [
  { id: 'fb-1', name: 'Press inclinado con barra', setsReps: '3x12' },
  { id: 'fb-2', name: 'Peck deck', setsReps: '3x12' },
  { id: 'fb-3', name: 'Extensión copa V', setsReps: '3x12' },
  { id: 'fb-4', name: 'Extensión con cuerda', setsReps: '3x12' },
  { id: 'fb-5', name: 'Elevaciones laterales', setsReps: '3x12' },
  { id: 'fb-6', name: 'Deltoides posterior', setsReps: '3x12' },
  { id: 'fb-7', name: 'Remo sentado', setsReps: '3x12' },
  { id: 'fb-8', name: 'Remo vertical', setsReps: '3x12' },
  { id: 'fb-9', name: 'Curl inclinado con mancuerna', setsReps: '3x12' },
  { id: 'fb-10', name: 'Curl predicador', setsReps: '3x12' },
  { id: 'fb-11', name: 'Prensa', setsReps: '3x12' },
  { id: 'fb-12', name: 'Peso muerto', setsReps: '3x12' },
  { id: 'fb-13', name: 'Sentadilla pendular', setsReps: '3x12' },
  { id: 'fb-14', name: 'Femoral acostado', setsReps: '3x12' },
  { id: 'fb-15', name: 'Abductor', setsReps: '3x12' },
  { id: 'fb-16', name: 'Elevación de talón', setsReps: '3x12' },
  { id: 'fb-17', name: 'Abdominal Crunch en máquina', setsReps: '3x12' },
];

// --- 2.5 ACTIVIDADES Y CLASES GRUPALES ---
const GROUP_ACTIVITIES: GroupActivity[] = [
  {
    id: 'act-1',
    name: 'Yoga',
    description: 'Sesiones enfocadas en flexibilidad, control de respiración y movilidad articular.',
    days: 'Lunes, Miércoles y Viernes',
    schedules: ['7:00 AM - 7:50 AM'],
    intensity: 'Recomendado 2x/semana',
  },
  {
    id: 'act-2',
    name: 'Zumba',
    description: 'Entrenamiento cardiovascular rítmico de baile para quema calórica y coordinación.',
    days: 'Lunes, Miércoles y Viernes',
    schedules: ['11:00 AM - 11:50 AM'],
    intensity: 'Recomendado 2x/semana',
  },
  {
    id: 'act-3',
    name: 'Balance',
    description: 'Clase integral que combina técnicas de Yoga, Pilates y ejercicios Hipopresivos.',
    days: 'Martes, Jueves y Sábado',
    schedules: ['8:00 AM - 8:50 AM', '7:00 PM - 7:50 PM'],
    intensity: 'Recomendado 2x/semana',
  },
  {
    id: 'act-4',
    name: 'Iron Fit Core',
    description: 'Actividad de fortalecimiento de la zona abdominal con ejercicios de poca intensidad.',
    days: 'Domingos',
    schedules: ['8:00 AM - 8:50 AM', '10:00 AM - 10:50 AM'],
    intensity: 'Baja intensidad',
  },
];

// --- 3. DÍAS SEGÚN FRECUENCIA Y PREFERENCIA ---
function buildRoutineSchedule(days: DaysPerWeek, legPref: LegPreference): WorkoutDay[] {
  if (days === 3) {
    return [
      { dayNumber: 1, title: 'Día 1: Push', focus: 'Pecho, Hombro & Tríceps', exercises: BLOCK_PUSH },
      { dayNumber: 2, title: 'Día 2: Pull', focus: 'Espalda & Bíceps', exercises: BLOCK_PULL },
      { dayNumber: 3, title: 'Día 3: Leg + Core', focus: 'Pierna Completa & Abdomen', exercises: [...BLOCK_LEG_FULL, ...BLOCK_CORE_SHORT] },
    ];
  }

  if (days === 4) {
    return [
      { dayNumber: 1, title: 'Día 1: Push', focus: 'Pecho, Hombro & Tríceps', exercises: BLOCK_PUSH },
      { dayNumber: 2, title: 'Día 2: Pull', focus: 'Espalda & Bíceps', exercises: BLOCK_PULL },
      { dayNumber: 3, title: 'Día 3: Leg', focus: 'Pierna Completa', exercises: BLOCK_LEG_FULL },
      { dayNumber: 4, title: 'Día 4: Core & Cardio', focus: 'Abdomen Completo & Cardio', exercises: BLOCK_CORE_FULL },
    ];
  }

  if (days === 5) {
    const leg1 = legPref === 'dividida' ? BLOCK_LEG_SPLIT_DAY_1 : BLOCK_LEG_FULL;
    const leg2 = legPref === 'dividida' ? BLOCK_LEG_SPLIT_DAY_2 : BLOCK_LEG_FULL;
    return [
      { dayNumber: 1, title: 'Día 1: Push', focus: 'Pecho, Hombro & Tríceps', exercises: BLOCK_PUSH },
      { dayNumber: 2, title: 'Día 2: Pull', focus: 'Espalda & Bíceps', exercises: BLOCK_PULL },
      { dayNumber: 3, title: 'Día 3: Leg (Sesión 1)', focus: legPref === 'dividida' ? 'Cuádriceps & Gemelo' : 'Pierna Completa', exercises: leg1 },
      { dayNumber: 4, title: 'Día 4: Full Body', focus: 'Tren Superior Completo', exercises: BLOCK_FULL_BODY },
      { dayNumber: 5, title: 'Día 5: Leg (Sesión 2)', focus: legPref === 'dividida' ? 'Femoral & Glúteo' : 'Pierna Completa', exercises: leg2 },
    ];
  }

  // 6 Días (Push Pull Leg x 2)
  const leg1 = legPref === 'dividida' ? BLOCK_LEG_SPLIT_DAY_1 : BLOCK_LEG_FULL;
  const leg2 = legPref === 'dividida' ? BLOCK_LEG_SPLIT_DAY_2 : BLOCK_LEG_FULL;
  return [
    { dayNumber: 1, title: 'Día 1: Push', focus: 'Pecho, Hombro & Tríceps', exercises: BLOCK_PUSH },
    { dayNumber: 2, title: 'Día 2: Pull', focus: 'Espalda & Bíceps', exercises: BLOCK_PULL },
    { dayNumber: 3, title: 'Día 3: Leg (A)', focus: legPref === 'dividida' ? 'Cuádriceps & Gemelo' : 'Pierna Completa', exercises: leg1 },
    { dayNumber: 4, title: 'Día 4: Push', focus: 'Pecho, Hombro & Tríceps', exercises: BLOCK_PUSH },
    { dayNumber: 5, title: 'Día 5: Pull', focus: 'Espalda & Bíceps', exercises: BLOCK_PULL },
    { dayNumber: 6, title: 'Día 6: Leg (B)', focus: legPref === 'dividida' ? 'Femoral & Glúteo' : 'Pierna Completa', exercises: leg2 },
  ];
}

// --- 4. COMPONENTE PRINCIPAL ---
export default function RoutinesPage() {
  const [selectedDays, setSelectedDays] = useState<DaysPerWeek>(4);
  const [legPreference, setLegPreference] = useState<LegPreference>('completa');
  const [activeTab, setActiveTab] = useState<number>(1);

  // Ensamblado reactivo según estado
  const currentSchedule = useMemo(() => {
    return buildRoutineSchedule(selectedDays, legPreference);
  }, [selectedDays, legPreference]);

  const activeDay = useMemo(() => {
    return currentSchedule.find((d) => d.dayNumber === activeTab) || currentSchedule[0];
  }, [currentSchedule, activeTab]);

  const handleDayFilterChange = (days: DaysPerWeek) => {
    setSelectedDays(days);
    setActiveTab(1);
  };

  return (
    <div className="w-full space-y-4">
      <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[340px] bg-[#ff2a55]/15 blur-[140px] rounded-full -z-0" />
      {/* 1. Header de Frecuencia */}
      <section className="bg-[#14151b] border border-white/5 p-4 rounded-2xl">
        <h1 className="text-base font-bold text-white mb-1">Configura tu Rutina</h1>
        <p className="text-xs text-gray-400 mb-3">
          Selecciona tus días de entrenamiento semanal
        </p>

        {/* Botones de Días */}
        <div className="grid grid-cols-4 gap-2">
          {([3, 4, 5, 6] as const).map((days) => (
            <button
              key={days}
              onClick={() => handleDayFilterChange(days)}
              className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                selectedDays === days
                  ? 'bg-[#ff2a51] text-white border-[#ff2a51] shadow-lg shadow-[#ff2a51]/20'
                  : 'bg-[#090a0f] text-gray-400 border-white/5 hover:border-white/20'
              }`}
            >
              {days} Días
            </button>
          ))}
        </div>

        {/* Toggle de pierna completa vs dividida (solo para 5 y 6 días) */}
        {(selectedDays === 5 || selectedDays === 6) && (
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <span className="text-gray-400 font-medium">Modo de Pierna:</span>
            <div className="flex bg-[#090a0f] p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setLegPreference('completa')}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  legPreference === 'completa' ? 'bg-[#ff2a51] text-white' : 'text-gray-400'
                }`}
              >
                Completa
              </button>
              <button
                onClick={() => setLegPreference('dividida')}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  legPreference === 'dividida' ? 'bg-[#ff2a51] text-white' : 'text-gray-400'
                }`}
              >
                Dividida (2 Días)
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 2. Pestañas de Sesión del Día */}
      <section className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {currentSchedule.map((day) => {
          const isActive = day.dayNumber === activeDay.dayNumber;
          return (
            <button
              key={day.dayNumber}
              onClick={() => setActiveTab(day.dayNumber)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#1e2029] text-white border-[#ff2a51]'
                  : 'bg-[#14151b] text-gray-500 border-white/5 hover:text-gray-300'
              }`}
            >
              {day.title.split(':')[0]}
            </button>
          );
        })}
      </section>

      {/* 3. Detalle de la Sesión y Lista de Ejercicios */}
      <section className="bg-[#14151b] border border-white/5 rounded-2xl p-4">
        <div className="mb-4">
          <span className="text-[10px] uppercase font-bold text-[#ff2a51] tracking-wider">
            {activeDay.title}
          </span>
          <h2 className="text-sm font-bold text-white mt-0.5">{activeDay.focus}</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {activeDay.exercises.length} ejercicios planificados
          </p>
        </div>

        {/* Lista de ejercicios */}
        <div className="space-y-2">
          {activeDay.exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className="p-3 bg-[#090a0f] rounded-xl border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <span className="text-gray-600 font-bold text-xs w-4 text-center shrink-0">
                  {index + 1}
                </span>
                <span className="text-xs font-medium text-white truncate">
                  {exercise.name}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#ff2a51] bg-[#ff2a51]/10 px-2 py-0.5 rounded-md shrink-0">
                {exercise.setsReps}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Actividades y Clases Grupales Complementarias */}
      <section className="bg-[#14151b] border border-white/5 rounded-2xl p-4">
        <div className="mb-4">
          <span className="text-[10px] uppercase font-bold text-[#ff2a51] tracking-wider">
            CLASES GRUPALES
          </span>
          <h2 className="text-sm font-bold text-white mt-0.5">
            Actividades Complementarias
          </h2>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Ideales para repartir 2 veces por semana junto a tu entrenamiento
          </p>
        </div>

        <div className="space-y-2.5">
          {GROUP_ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className="p-3.5 bg-[#090a0f] rounded-xl border border-white/5 flex flex-col gap-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-2">
                    {activity.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
                {activity.intensity && (
                  <span className="text-[10px] font-semibold text-gray-300 bg-[#1e2029] border border-white/5 px-2 py-0.5 rounded-md shrink-0">
                    {activity.intensity}
                  </span>
                )}
              </div>

              <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-medium text-gray-300">
                  <strong className="text-[#ff2a51] font-semibold">Días:</strong> {activity.days}
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {activity.schedules.map((time, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold text-[#ff2a51] bg-[#ff2a51]/10 px-2 py-0.5 rounded-md"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}