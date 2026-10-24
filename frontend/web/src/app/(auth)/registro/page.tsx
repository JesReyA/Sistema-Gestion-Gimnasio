'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { IconoMancuerna } from '@/components/icons/IconoMancuerna';

type RegistrationValues = {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  password: string;
  confirmPassword: string;
};

type RegistrationErrors = Partial<Record<keyof RegistrationValues, string>>;

const initialValues: RegistrationValues = {
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  correo: '',
  password: '',
  confirmPassword: '',
};

function validate(values: RegistrationValues): RegistrationErrors {
  const errors: RegistrationErrors = {};

  if (!values.nombre.trim()) errors.nombre = 'Escribe tu nombre.';
  if (!values.apellidoPaterno.trim()) errors.apellidoPaterno = 'Escribe tu apellido paterno.';

  if (!values.correo.trim()) {
    errors.correo = 'Escribe tu correo electrónico.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo.trim())) {
    errors.correo = 'Escribe un correo electrónico válido.';
  }

  if (!values.password) {
    errors.password = 'Escribe una contraseña.';
  } else if (values.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirma tu contraseña.';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Las contraseñas no coinciden.';
  }

  return errors;
}

const inputClassName =
  'min-h-12 w-full rounded-xl border border-white/10 bg-[#15161a] px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors focus:border-[#ff3355]/70 focus:outline-none focus:ring-2 focus:ring-[#ff3355]/20';

export default function RegistroPage() {
  const [values, setValues] = useState<RegistrationValues>(initialValues);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  function handleChange(field: keyof RegistrationValues, value: string) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);

    if (hasSubmitted) {
      setErrors(validate(nextValues));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);
    setErrors(validate(values));
  }

  function fieldError(field: keyof RegistrationValues) {
    return errors[field] ? `${field}-error` : undefined;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#090a0c] px-4 py-8 text-white selection:bg-[#ff3b5c]/30 sm:px-6">
      <div className="w-full max-w-[600px]">
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-5 flex flex-col items-center">
            <div className="absolute -inset-2 rounded-full bg-[#e63946]/20 blur-xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/5 bg-[#141518] shadow-lg">
              <IconoMancuerna className="h-7 w-7 text-[#ff3355]" />
            </div>
            <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
              IRON FIT
            </span>
          </div>

          <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Crea tu cuenta
          </h1>
          <p className="text-sm text-gray-400">
            Completa tus datos para comenzar tu entrenamiento.
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-300">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="given-name"
                value={values.nombre}
                onChange={(event) => handleChange('nombre', event.target.value)}
                className={inputClassName}
                placeholder="Tu nombre"
                aria-invalid={Boolean(errors.nombre)}
                aria-describedby={fieldError('nombre')}
              />
              {errors.nombre && (
                <p id="nombre-error" role="alert" className="text-sm text-rose-400">
                  {errors.nombre}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="apellidoPaterno" className="block text-sm font-medium text-gray-300">
                Apellido paterno
              </label>
              <input
                id="apellidoPaterno"
                name="apellidoPaterno"
                type="text"
                autoComplete="family-name"
                value={values.apellidoPaterno}
                onChange={(event) => handleChange('apellidoPaterno', event.target.value)}
                className={inputClassName}
                placeholder="Tu apellido paterno"
                maxLength={100}
                aria-invalid={Boolean(errors.apellidoPaterno)}
                aria-describedby={fieldError('apellidoPaterno')}
              />
              {errors.apellidoPaterno && (
                <p id="apellidoPaterno-error" role="alert" className="text-sm text-rose-400">
                  {errors.apellidoPaterno}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-gray-300">
                Apellido materno
              </label>
              <input
                id="apellidoMaterno"
                name="apellidoMaterno"
                type="text"
                value={values.apellidoMaterno}
                onChange={(event) => handleChange('apellidoMaterno', event.target.value)}
                className={inputClassName}
                placeholder="Tu apellido materno"
                maxLength={100}
                aria-invalid={Boolean(errors.apellidoMaterno)}
                aria-describedby={fieldError('apellidoMaterno')}
              />
              {errors.apellidoMaterno && (
                <p id="apellidoMaterno-error" role="alert" className="text-sm text-rose-400">
                  {errors.apellidoMaterno}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="correo" className="block text-sm font-medium text-gray-300">
              Correo electrónico
            </label>
            <input
              id="correo"
              name="correo"
              type="email"
              autoComplete="email"
              value={values.correo}
              onChange={(event) => handleChange('correo', event.target.value)}
              className={inputClassName}
              placeholder="tu@correo.com"
              aria-invalid={Boolean(errors.correo)}
              aria-describedby={fieldError('correo')}
            />
            {errors.correo && (
              <p id="correo-error" role="alert" className="text-sm text-rose-400">
                {errors.correo}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={values.password}
                onChange={(event) => handleChange('password', event.target.value)}
                className={inputClassName}
                placeholder="Mínimo 8 caracteres"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={fieldError('password')}
              />
              {errors.password && (
                <p id="password-error" role="alert" className="text-sm text-rose-400">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={values.confirmPassword}
                onChange={(event) => handleChange('confirmPassword', event.target.value)}
                className={inputClassName}
                placeholder="Repite tu contraseña"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={fieldError('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p id="confirmPassword-error" role="alert" className="text-sm text-rose-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#e62e4c] to-[#ff4763] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#e62e4c]/20 transition-all hover:from-[#d62441] hover:to-[#eb3b57] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4763] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090a0c]"
          >
            Crear cuenta
          </button>
        </form>

        <div className="relative my-7 flex items-center justify-center">
          <div className="w-full border-t border-gray-800" />
          <span className="absolute bg-[#090a0c] px-3 text-xs text-gray-500">
            O regístrate con
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#141519] px-3 text-sm font-medium text-gray-200 transition-colors hover:bg-[#1b1d22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4763]"
          >
            <svg aria-hidden="true" className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.05 5.05 0 0 1-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z" />
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.15a11 11 0 0 0 0 9.88l3.69-2.84Z" />
              <path fill="#EA4335" d="M12 5.37c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.85 6.06l3.69 2.84C6.71 7.3 9.14 5.37 12 5.37Z" />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#141519] px-3 text-sm font-medium text-gray-200 transition-colors hover:bg-[#1b1d22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4763]"
          >
            <svg aria-hidden="true" className="h-5 w-5 shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.42c.62-.75 1.04-1.8.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.71-.93 2.73 1 .08 2.02-.48 2.64-1.23Z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>

        <p className="mt-7 text-center text-sm text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="font-medium text-[#ff3355] hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
