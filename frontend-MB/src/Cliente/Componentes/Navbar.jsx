import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/nueva-solicitud', label: 'Nueva solicitud' },
  { to: '/cotizaciones', label: 'Cotizaciones' },
  { to: '/pedidos', label: 'Mis pedidos' },
  { to: '/mensajes', label: 'Mensajes' },
  { to: '/perfil', label: 'Mi Perfil', destacado: true },
];

const Navbar = ({ user }) => {
  const linkBase =
    'px-3.5 py-2 rounded-lg transition hover:text-brand-dark hover:bg-black/5';

  return (
    <header className="sticky top-0 z-40 bg-brand-crema/90 backdrop-blur-md border-b border-brand-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
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

        {/* Nav principal */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-semibold text-brand-dark-muted">
          {NAV_LINKS.map(({ to, label, destacado }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${linkBase} ${
                  destacado || isActive
                    ? 'text-brand-terracota bg-brand-terracota/10 font-bold'
                    : ''
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Usuario + Notificaciones */}
        <div className="flex items-center space-x-4">
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
                <svg className="w-3.5 h-3.5 text-brand-dark-muted" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </span>
              <span className="text-[11px] font-medium text-brand-salvia flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-salvia" />
                Cliente verificado
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
