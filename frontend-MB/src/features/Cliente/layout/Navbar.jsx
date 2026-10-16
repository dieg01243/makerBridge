import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  // { to: '/', label: 'Inicio' },
  { to: '/solicitudes', label: 'Mis solicitudes' },
  { to: '/nueva-solicitud', label: 'Nueva solicitud' },
  // { to: '/cotizaciones', label: 'Cotizaciones' },
  // { to: '/mensajes', label: 'Mensajes' },
  // { to: '/perfil', label: 'Mi Perfil' },
]

const DEFAULT_USER = { iniciales: 'CL', nombre: 'Cliente', verificado: false }

export default function Navbar({ user = DEFAULT_USER }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const linkBase = 'px-3.5 py-2 rounded-lg transition hover:text-brand-dark hover:bg-black/5'
  const navLinkClass = ({ isActive }) =>
    `${linkBase} ${
      isActive ? 'text-brand-terracota bg-brand-terracota/10 font-bold' : ''
    }`

  return (
    <header className="sticky top-0 z-40 bg-brand-crema/90 backdrop-blur-md border-b border-brand-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <NavLink to="/" className="flex items-center gap-3 group" title="MakerBridge 3D HUB">
            <div className="w-11 h-11 bg-brand-blue rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-sm tracking-wider transition group-hover:scale-105">
              MB
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-brand-dark tracking-tight leading-none">
                MakerBridge
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-blue mt-0.5">
                3D HUB Platform
              </span>
            </div>
          </NavLink>
        </div>

        <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2 text-sm font-semibold text-brand-dark-muted">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={menuOpen}
            className="xl:hidden p-2 text-brand-dark-muted hover:text-brand-dark rounded-lg hover:bg-black/5 transition"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              )}
            </svg>
          </button>

          <button
            type="button"
            aria-label="Notificaciones"
            className="relative p-2 text-brand-dark-muted hover:text-brand-dark rounded-full hover:bg-black/5 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-terracota rounded-full border-2 border-brand-crema" />
          </button>

          <div className="h-7 w-px bg-brand-border-subtle hidden sm:block" />

          <div className="flex items-center space-x-3 pl-1">
            <div className="w-10 h-10 rounded-full bg-brand-salvia text-brand-dark font-bold flex items-center justify-center text-sm border-2 border-white shadow-sm ring-1 ring-black/5">
              {user.iniciales}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-brand-dark leading-tight flex items-center gap-1.5">
                {user.nombre}
              </span>
              {user.verificado && (
                <span className="text-[11px] font-medium text-brand-salvia flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-salvia" />
                  Cliente verificado
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <nav className="xl:hidden border-t border-brand-border-subtle px-4 py-3 flex flex-col gap-1 text-sm font-semibold text-brand-dark-muted">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
