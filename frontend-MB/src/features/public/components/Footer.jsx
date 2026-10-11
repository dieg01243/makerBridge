const socials = [
  {
    label: 'X (Twitter)',
    hover: 'hover:bg-slate-900',
    svgClass: 'w-4 h-4 fill-current',
    content: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
  {
    label: 'Instagram',
    hover: 'hover:bg-pink-600',
    svgClass: 'w-4 h-4 fill-none stroke-current',
    content: (
      <>
        <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
  {
    label: 'YouTube',
    hover: 'hover:bg-red-600',
    svgClass: 'w-4 h-4 fill-none stroke-current',
    content: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon fill="currentColor" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </>
    ),
  },
  {
    label: 'LinkedIn',
    hover: 'hover:bg-blue-700',
    svgClass: 'w-4 h-4 fill-none stroke-current',
    content: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect height="12" width="4" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
]

const columns = [
  { title: 'Explorar', links: ['Cómo funciona', 'Servicios', 'Proveedores', 'Sobre nosotros'] },
  {
    title: 'Servicios',
    links: ['Impresión FDM y Resina', 'Modelado CAD Paramétrico', 'Diseño Industrial & Repuestos', 'Producción en serie pequeña'],
  },
  {
    title: 'Comunidad',
    links: ['Sumarse como Maker', 'Guías de Calibración', 'Calculadora de Filamento', 'Blog & Casos de Éxito'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#f0ebe3] border-t border-stone-300/70 pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-slate-700">
      <div className="max-w-7xl mx-auto">
        {/* Social icons */}
        <div className="flex items-center gap-5 pb-8 border-b border-stone-300">
          {socials.map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.label}
              className={`w-10 h-10 rounded-full bg-stone-200/80 hover:text-white flex items-center justify-center transition-colors ${s.hover}`}
            >
              <svg className={s.svgClass} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                {s.content}
              </svg>
            </a>
          ))}
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">{col.title}</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-[#e06d53] transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Contactanos</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">
                <a href="mailto:makerbridge@gmail.com" className="hover:text-[#e06d53] transition-colors">
                  makerbridge@gmail.com
                </a>
              </p>
              <p className="text-xs text-slate-500">Soporte y atención de lunes a viernes de 9 a 18 hs.</p>
              <p className="text-xs text-slate-500">Buenos Aires, Argentina</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-stone-300 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 MakerBridge Inc. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Términos de Servicio</a>
            <a href="#" className="hover:underline">Políticas de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
