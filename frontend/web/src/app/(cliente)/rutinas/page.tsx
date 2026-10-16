'use client';

import React, { useState, useMemo } from 'react';

// 1. Tipos de datos
export type DaysPerWeek = 3 | 4 | 5 | 6;
export type RoutineGoal = 'hipertrofia_general' | 'enfoque_tren_inferior' | 'avanzado_estetica' | 'fuerza_base';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
}

export interface WorkoutDay {
  dayNumber: number;
  title: string;
  estimatedMinutes: number;
  exercises: Exercise[];
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  subtitle: string;
  daysPerWeek: DaysPerWeek;
  goal: RoutineGoal;
  level: string;
  schedule: WorkoutDay[];
}

// 2. Catálogo de Rutinas (Soluciona el ReferenceError)
export const ROUTINES_CATALOG: WorkoutRoutine[] = [
  {
    id: 'rut-push-pull-legs-4',
    name: 'Push / Pull / Legs + Core',
    subtitle: 'Desarrollo muscular balanceado y fuerza',
    daysPerWeek: 4,
    goal: 'hipertrofia_general',
    level: 'Intermedio',
    schedule: [
      {
        dayNumber: 1,
        title: 'Día 1: Empuje (Pecho/Hombro/Tríceps)',
        estimatedMinutes: 55,
        exercises: [
          { id: 'ex-1', name: 'Press Banca con Barra', sets: 4, reps: '8-10' },
          { id: 'ex-2', name: 'Press Militar con Mancuernas', sets: 3, reps: '10-12' },
          { id: 'ex-3', name: 'Fondos en Paralelas', sets: 3, reps: 'Al fallo' },
        ],
      },
      {
        dayNumber: 2,
        title: 'Día 2: Tracción (Espalda/Bíceps)',
        estimatedMinutes: 50,
        exercises: [
          { id: 'ex-4', name: 'Jalón al Pecho', sets: 4, reps: '10-12' },
          { id: 'ex-5', name: 'Remo Gironda', sets: 3, reps: '12' },
          { id: 'ex-6', name: 'Curl de Bíceps con Barra Z', sets: 3, reps: '10' },
        ],
      },
    ],
  },
  {
    id: 'rut-lower-focus-5',
    name: 'Glúteos & Pierna Focus',
    subtitle: 'Especialización de tren inferior y acondicionamiento',
    daysPerWeek: 5,
    goal: 'enfoque_tren_inferior',
    level: 'Avanzado',
    schedule: [
      {
        dayNumber: 1,
        title: 'Día 1: Cuádriceps & Aductores',
        estimatedMinutes: 60,
        exercises: [
          { id: 'ex-7', name: 'Sentadilla Hack', sets: 4, reps: '10-12' },
          { id: 'ex-8', name: 'Prensa Inclinada 45°', sets: 4, reps: '12-15' },
          { id: 'ex-9', name: 'Extensiones de Cuádriceps', sets: 3, reps: '15 + Drop set' },
        ],
      },
      {
        dayNumber: 2,
        title: 'Día 2: Glúteo & Isquios',
        estimatedMinutes: 55,
        exercises: [
          { id: 'ex-10', name: 'Hip Thrust con Barra', sets: 4, reps: '8-10' },
          { id: 'ex-11', name: 'Peso Muerto Rumano', sets: 4, reps: '10-12' },
          { id: 'ex-12', name: 'Curl Femoral Tumbado', sets: 3, reps: '12' },
        ],
      },
    ],
  },
];

export default function RoutinesView() {
  const [activeRoutineId, setActiveRoutineId] = useState<string>('rut-lower-focus-5');
  const [selectedDays, setSelectedDays] = useState<DaysPerWeek | 'all'>('all');
  
  // Selección inicial segura para evitar caídas
  const [inspectedRoutine, setInspectedRoutine] = useState<WorkoutRoutine>(
    ROUTINES_CATALOG[1] || ROUTINES_CATALOG[0]
  );
  const [selectedDayTab, setSelectedDayTab] = useState<number>(1);

  const filteredRoutines = useMemo(() => {
    return ROUTINES_CATALOG.filter((routine) => {
      const matchDays = selectedDays === 'all' || routine.daysPerWeek === selectedDays;
      return matchDays;
    });
  }, [selectedDays]);

  const activeRoutine = useMemo(
    () => ROUTINES_CATALOG.find((r) => r.id === activeRoutineId) || ROUTINES_CATALOG[0],
    [activeRoutineId]
  );

  const currentWorkoutDay = useMemo(() => {
    if (!inspectedRoutine?.schedule?.length) return null;
    return (
      inspectedRoutine.schedule.find((d) => d.dayNumber === selectedDayTab) ||
      inspectedRoutine.schedule[0]
    );
  }, [inspectedRoutine, selectedDayTab]);

  const handleSelectRoutineToInspect = (routine: WorkoutRoutine) => {
    setInspectedRoutine(routine);
    setSelectedDayTab(1);
  };

  return (
    <div className="w-full space-y-5">
      
      {/* 1. Header Rutina Activa */}
      <section className="bg-[#14151b] border border-white/5 p-4 rounded-2xl relative overflow-hidden">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          En curso
        </span>
        <h1 className="text-lg font-bold text-white tracking-tight">
          {activeRoutine.name}
        </h1>
        <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">
          {activeRoutine.subtitle}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
          <div className="text-xs text-gray-400">
            <span className="text-sm font-bold text-white">{activeRoutine.daysPerWeek}</span> días/sem
          </div>
          <button
            onClick={() => handleSelectRoutineToInspect(activeRoutine)}
            className="px-3.5 py-1.5 bg-[#ff2a51] hover:bg-[#e02043] text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-[#ff2a51]/20"
          >
            Ver rutina actual
          </button>
        </div>
      </section>

      {/* 2. Filtros de días */}
      <section className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {(['all', 3, 4, 5, 6] as const).map((dayOption) => {
          const isSelected = selectedDays === dayOption;
          return (
            <button
              key={dayOption}
              onClick={() => setSelectedDays(dayOption)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#ff2a51] text-white font-semibold shadow-md shadow-[#ff2a51]/20'
                  : 'bg-[#14151b] border border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {dayOption === 'all' ? 'Todas' : `${dayOption} Días`}
            </button>
          );
        })}
      </section>

      {/* 3. Lista de rutinas sugeridas */}
      <section className="space-y-2.5">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Explorar Rutinas ({filteredRoutines.length})
        </h2>

        {filteredRoutines.map((routine) => {
          const isInspected = inspectedRoutine.id === routine.id;
          const isAssigned = activeRoutineId === routine.id;

          return (
            <div
              key={routine.id}
              onClick={() => handleSelectRoutineToInspect(routine)}
              className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                isInspected
                  ? 'bg-[#181922] border-[#ff2a51]/60'
                  : 'bg-[#14151b] border-white/5 hover:border-white/20'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#090a0f] border border-white/5 flex items-center justify-center shrink-0 text-lg">
                🏋️
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-white truncate">
                    {routine.name}
                  </h3>
                  {isAssigned && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Activa
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {routine.daysPerWeek} días/sem • {routine.level}
                </p>
              </div>

              <span className="text-gray-500 text-xs">→</span>
            </div>
          );
        })}
      </section>

      {/* 4. Detalle de la rutina seleccionada */}
      {currentWorkoutDay && (
        <section className="bg-[#14151b] rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">{inspectedRoutine.name}</h2>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {currentWorkoutDay.exercises.length} ejercicios • {currentWorkoutDay.estimatedMinutes} min
              </p>
            </div>
            <button
              onClick={() => setActiveRoutineId(inspectedRoutine.id)}
              disabled={activeRoutineId === inspectedRoutine.id}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                activeRoutineId === inspectedRoutine.id
                  ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                  : 'bg-[#ff2a51] hover:bg-[#e02043] text-white'
              }`}
            >
              {activeRoutineId === inspectedRoutine.id ? 'Asignada' : 'Elegir'}
            </button>
          </div>

          {/* Selector de días de la rutina */}
          <div className="px-4 pt-2 border-b border-white/5 flex gap-3 overflow-x-auto scrollbar-none">
            {inspectedRoutine.schedule.map((day) => {
              const isActiveTab = currentWorkoutDay.dayNumber === day.dayNumber;
              return (
                <button
                  key={day.dayNumber}
                  onClick={() => setSelectedDayTab(day.dayNumber)}
                  className={`pb-2.5 pt-1 px-1 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                    isActiveTab
                      ? 'border-[#ff2a51] text-white font-bold'
                      : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  Día {day.dayNumber}
                </button>
              );
            })}
          </div>

          {/* Ejercicios del día */}
          <div className="p-3 space-y-2">
            {currentWorkoutDay.exercises.map((exercise, index) => (
              <div
                key={exercise.id}
                className="p-2.5 bg-[#090a0f] rounded-xl border border-white/5 flex items-center gap-3"
              >
                <span className="text-gray-500 font-bold text-xs w-4 text-center">
                  {index + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-white truncate">
                    {exercise.name}
                  </h4>
                  <p className="text-[10px] text-gray-400">
                    {exercise.sets} series × {exercise.reps}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}