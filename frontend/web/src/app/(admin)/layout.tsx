'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { IconoCalendario } from '@/components/icons/IconoCalendario';
import { IconoCalorias } from '@/components/icons/IconoCalorias';
import { IconoConfiguracion } from '@/components/icons/IconoConfiguracion';
import { IconoHome } from '@/components/icons/IconoHome';
import { IconoMancuerna } from '@/components/icons/IconoMancuerna';
import { IconoPerfil } from '@/components/icons/IconoPerfil';
import { IconoTarjetaCredito } from '@/components/icons/IconoTarjetaCredito';
import { useMe } from '@/lib/hooks/use-user-data';

type AdminNavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

type AdminNavGroup = {
  id: string;
  label: string;
  icon: ReactNode;
  items: AdminNavItem[];
};

const primaryNavItems: AdminNavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: <IconoHome className="h-5 w-5" /> },
  { href: '/clientes', label: 'Clientes', icon: <IconoPerfil className="h-5 w-5" /> },
  { href: '/asistencias', label: 'Asistencias', icon: <IconoCalendario className="h-5 w-5" /> },
  { href: '/admin-pagos', label: 'Pagos', icon: <IconoTarjetaCredito className="h-5 w-5" /> },
  { href: '/reportes', label: 'Reportes', icon: <IconoCalorias className="h-5 w-5" /> },
];

const navGroups: AdminNavGroup[] = [
  {
    id: 'actividades',
    label: 'Actividades',
    icon: <IconoCalendario className="h-5 w-5" />,
    items: [
      { href: '/actividades/clases', label: 'Clases', icon: <IconoCalendario className="h-4 w-4" /> },
      { href: '/actividades/eventos', label: 'Eventos', icon: <IconoCalendario className="h-4 w-4" /> },
    ],
  },
  {
    id: 'inventario',
    label: 'Inventario',
    icon: <IconoMancuerna className="h-5 w-5" />,
    items: [
      { href: '/inventario/maquinas', label: 'Máquinas', icon: <IconoMancuerna className="h-4 w-4" /> },
      { href: '/inventario/material', label: 'Material', icon: <IconoMancuerna className="h-4 w-4" /> },
    ],
  },
  {
    id: 'administracion',
    label: 'Administración',
    icon: <IconoConfiguracion className="h-5 w-5" />,
    items: [
      { href: '/administracion/control', label: 'Control', icon: <IconoConfiguracion className="h-4 w-4" /> },
      { href: '/administracion/personal', label: 'Personal', icon: <IconoPerfil className="h-4 w-4" /> },
    ],
  },
];

function isPathActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({ item, pathname, nested = false }: { item: AdminNavItem; pathname: string; nested?: boolean }) {
  const active = isPathActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={`group flex items-center gap-3 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186] ${
        nested ? 'ml-3 px-3 py-2.5' : 'px-3 py-3'
      } ${
        active
          ? 'bg-[#ff3355]/10 text-[#ff7186]'
          : 'text-[#9b9da8] hover:bg-white/[0.05] hover:text-white'
      }`}
    >
      <span className={`flex shrink-0 items-center justify-center ${nested ? 'h-4 w-4' : 'h-5 w-5'} ${active ? 'text-[#ff7186]' : 'text-[#717684] group-hover:text-white'}`}>
        {item.icon}
      </span>
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {active && <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff7186]" />}
    </Link>
  );
}

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-4 w-4 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function AdminNavigation({
  pathname,
  expandedGroups,
  onToggleGroup,
}: {
  pathname: string;
  expandedGroups: Record<string, boolean>;
  onToggleGroup: (id: string) => void;
}) {
  return (
    <nav aria-label="Navegación administrativa" className="space-y-1">
      {primaryNavItems.map((item) => (
        <NavLink key={item.href} item={item} pathname={pathname} />
      ))}

      <div className="pt-4">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#626572]">
          Secciones
        </p>
        <div className="space-y-1">
          {navGroups.map((group) => {
            const groupActive = group.items.some((item) => isPathActive(pathname, item.href));
            const expanded = expandedGroups[group.id] ?? groupActive;

            return (
              <div key={group.id}>
                <button
                  type="button"
                  aria-controls={`${group.id}-navigation`}
                  aria-expanded={expanded}
                  onClick={() => onToggleGroup(group.id)}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186] ${
                    groupActive
                      ? 'bg-[#ff3355]/[0.07] text-[#ff7186]'
                      : 'text-[#9b9da8] hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center ${groupActive ? 'text-[#ff7186]' : 'text-[#717684] group-hover:text-white'}`}>
                    {group.icon}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{group.label}</span>
                  <Chevron expanded={expanded} />
                </button>

                {expanded && (
                  <div id={`${group.id}-navigation`} className="mt-1 space-y-1 border-l border-white/[0.08] pl-2">
                    {group.items.map((item) => (
                      <NavLink key={item.href} item={item} pathname={pathname} nested />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const {data: me, isLoading} = useMe()


  const toggleGroup = (id: string) => {
    setExpandedGroups((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-white selection:bg-[#ff2a51]/30">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-white/[0.08] bg-[#0d0e12] px-5 py-7 lg:flex">
        <Link
          href="/dashboard"
          className="mb-10 flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7186]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ff4964]/20 bg-[#ff4964]/10 text-[#ff4964]">
            <IconoHome className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-extrabold tracking-[0.18em]">IRONFIT</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-[#717684]">
              Administración
            </span>
          </span>
        </Link>

        <AdminNavigation
          pathname={pathname}
          expandedGroups={expandedGroups}
          onToggleGroup={toggleGroup}
        />

        <div className="mt-auto rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
          <p className="text-xs font-semibold text-[#d5d6dc]">{me?.roles.toString().slice(5)}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-white">
            {me?.nombres} {me?.apellidoPaterno}
          </p>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-72">
        <header className="border-b border-white/[0.08] bg-[#0d0e12]/95 px-4 py-5 backdrop-blur-md sm:px-6 lg:px-14">
          <div className="flex w-full min-w-0 items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff4964]">IRONFIT</p>
              <h1 className="mt-1 truncate text-xl font-bold tracking-tight text-white">Panel administrativo</h1>
            </div>
            <button
              type="button"
              className="shrink-0 cursor-pointer rounded-full border border-red-500/40 bg-white/[0.03] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9b9da8] transition-colors hover:bg-red-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60"
              >
                Cerrar sesión
            </button>
          </div>

          <div className="mx-auto mt-5 w-full max-w-7xl lg:hidden">
            <AdminNavigation
              pathname={pathname}
              expandedGroups={expandedGroups}
              onToggleGroup={toggleGroup}
            />
          </div>
        </header>

        <main className="min-w-0 w-full flex-1">{children}</main>
      </div>
    </div>
  );
}

