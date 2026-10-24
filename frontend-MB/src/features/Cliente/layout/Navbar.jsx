import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '', label: 'Mis solicitudes' },
  { to: 'nueva-solicitud', label: 'Nueva solicitud' },
  { to: 'mensajes', label: 'Mensajes' },
]

const DEFAULT_USER = { iniciales: 'CL', nombre: 'Cliente', verificado: false }

function NotificationButton({ mobile = false, onClick }) {
  return (
    <button
      type="button"
      aria-label="Notificaciones"
      onClick={onClick}
      className={
        mobile
          ? 'flex w-full items-center gap-3 rounded-lg px-3.5 py-2 text-left font-bold transition hover:bg-black/5 hover:text-brand-accentBlue'
          : 'relative rounded-full p-2 text-brand-graySub transition hover:bg-black/5 hover:text-brand-dark'
      }
    >
      <span className="relative">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        <span
          className={`absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 ${
            mobile ? 'border-page-bg' : 'border-page-bg'
          } bg-brand-accentBlue`}
        />
      </span>
      {mobile && 'Notificaciones'}
    </button>
  )
}

function ProfileLink({ user, mobile = false, onClick }) {
  return (
    <Link
      to="mi-perfil"
      title="Mi perfil"
      onClick={onClick}
      className={
        mobile
          ? 'flex items-center gap-3 rounded-lg px-3.5 py-2 transition hover:bg-black/5'
          : 'flex items-center gap-3'
      }
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-brand-accentBlueLight text-sm font-bold text-brand-dark shadow-sm ring-1 ring-black/5">
        {user.iniciales}
      </span>
      <span className={`flex-col text-left ${mobile ? 'flex' : 'hidden sm:flex'}`}>
        <span className={`font-bold text-brand-dark ${mobile ? '' : 'text-xs leading-tight'}`}>
          {user.nombre}
        </span>
        {user.verificado && (
          <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Cliente verificado
          </span>
        )}
        {mobile && <span className="text-xs">Mi perfil</span>}
      </span>
    </Link>
  )
}

export default function Navbar({ user = DEFAULT_USER }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="sticky top-0 z-50 border-b-2 border-brand-accentBlue bg-page-bg/90 shadow-md backdrop-blur-sm">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/cliente" title="MakerBridge 3D HUB">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#568EA6] shadow-sm transition group-hover:scale-105">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScevamARhrClGcdHPxTxxEyl06NqftNyo5HEWvfl7tJg&s=10"
              alt="Logo del sitio"
            />
          </div>
        </NavLink>

        <nav
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } absolute inset-x-0 top-full flex-col gap-1 border-b-2 border-brand-accentBlue bg-page-bg px-4 py-3 text-sm text-brand-graySub sm:px-6 xl:static xl:ml-10 xl:mr-auto xl:flex xl:flex-row xl:items-center xl:gap-2 xl:border-b-0 xl:bg-transparent xl:p-0`}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className="rounded-lg px-3.5 py-2 font-bold transition hover:text-brand-accentBlue"
            >
              {label}
            </NavLink>
          ))}

          <div className="mt-2 border-t border-brand-accentBlue/20 pt-2 xl:hidden">
            <NotificationButton mobile onClick={closeMenu} />
            <ProfileLink user={user} mobile onClick={closeMenu} />
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-brand-graySub transition hover:bg-black/5 hover:text-brand-dark xl:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              ) : (
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              )}
            </svg>
          </button>

          <div className="hidden items-center space-x-4 xl:flex">
            <NotificationButton />
            <ProfileLink user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}
