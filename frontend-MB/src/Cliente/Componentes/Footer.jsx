const EXPLORAR = ['Como funciona', 'Servicios', 'Proveedores', 'Sobre nosotros'];

const SOCIALS = {
  x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  linkedin:
    'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
};

const Footer = () => (
  <footer id="contacto-soporte" className="mt-16 bg-brand-crema-dark border-t border-brand-border-subtle">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Explorar */}
        <div className="md:col-span-5 space-y-4">
          <h4 className="text-xl sm:text-2xl font-bold text-brand-dark tracking-tight">Explorar</h4>
          <ul className="space-y-2.5 text-base sm:text-lg font-medium text-brand-dark/90">
            {EXPLORAR.map((item) => (
              <li key={item}>
                <a className="hover:text-brand-terracota transition" href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto + Redes */}
        <div className="md:col-span-7 space-y-6 md:pl-8">
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-brand-dark mb-2">Contactanos</h4>
            <a
              href="mailto:makerBridge@gmail.com"
              className="text-lg sm:text-xl font-bold text-brand-dark hover:text-brand-blue transition"
            >
              makerBridge@gmail.com
            </a>
          </div>

          <div className="pt-2">
            <span className="block text-xs uppercase tracking-wider font-bold text-brand-dark-muted mb-3">
              Seguinos en redes
            </span>
            <div className="flex items-center gap-4 text-brand-dark">
              {/* X */}
              <a
                aria-label="X Twitter"
                href="#"
                className="w-9 h-9 rounded-lg bg-white/70 hover:bg-white flex items-center justify-center transition shadow-sm hover:text-brand-blue"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d={SOCIALS.x} />
                </svg>
              </a>
              {/* Instagram */}
              <a
                aria-label="Instagram"
                href="#"
                className="w-9 h-9 rounded-lg bg-white/70 hover:bg-white flex items-center justify-center transition shadow-sm hover:text-pink-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect height="20" rx="5" ry="5" strokeWidth="2" width="20" x="2" y="2" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" strokeWidth="2" />
                  <line strokeWidth="2" x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                aria-label="YouTube"
                href="#"
                className="w-9 h-9 rounded-lg bg-white/70 hover:bg-white flex items-center justify-center transition shadow-sm hover:text-red-600"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d={SOCIALS.youtube} />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                aria-label="LinkedIn"
                href="#"
                className="w-10 h-10 rounded-xl bg-brand-dark hover:bg-blue-700 text-white flex items-center justify-center transition shadow-md"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d={SOCIALS.linkedin} />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-brand-border-subtle/80 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-dark-muted gap-4">
        <p>© 2025 MakerBridge 3D HUB. Todos los derechos reservados.</p>
        <div className="flex space-x-6">
          <a className="hover:text-brand-dark transition" href="#">Términos del Servicio</a>
          <a className="hover:text-brand-dark transition" href="#">Políticas de Privacidad</a>
          <a className="hover:text-brand-dark transition" href="#">Seguridad Maker</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;