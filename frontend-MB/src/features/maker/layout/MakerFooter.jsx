import Icon from '../components/Icon'

const columns = [
  { title: 'Explorar', links: ['Bolsa de Pedidos', 'Catálogo de Diseños', 'Talleres Certificados', 'Cotizador Online'] },
  { title: 'Servicios', links: ['Impresión FDM / SLA', 'Modelado Paramétrico', 'Producción en Serie', 'Control de Calidad'] },
]

const socials = ['share', 'alternate_email', 'forum']
const legal = ['Términos del Servicio', 'Privacidad', 'Soporte Técnico']

export default function MakerFooter() {
  return (
    <footer className="w-full bg-[#f4efe6] border-t border-[#ebdccb] pt-14 pb-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-sm">
                <Icon name="view_in_ar" className="text-[22px]" />
              </div>
              <span className="font-extrabold text-[20px] tracking-tight text-[#1c1917]">MakerBridge</span>
            </div>
            <p className="text-[14px] text-[#78716c] max-w-sm leading-relaxed">
              El ecosistema abierto que conecta clientes, diseñadores y talleres de fabricación 3D en toda la Argentina con trazabilidad, calidad y pagos seguros.
            </p>
            <div className="flex items-center gap-2 text-[13px] text-[#78716c]">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="font-semibold text-[#1c1917]">Red operativa 99.9%</span>
              <span>•</span>
              <span>SLA Fabricación Óptimo</span>
            </div>
          </div>

          {/* Columnas de links */}
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="text-[12px] font-mono font-bold text-[#1c1917] uppercase tracking-wider">{col.title}</span>
              {col.links.map((link) => (
                <a key={link} href="#" className="text-[14px] text-[#78716c] hover:text-brand-primary transition-colors">
                  {link}
                </a>
              ))}
            </div>
          ))}

          {/* Contacto */}
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-mono font-bold text-[#1c1917] uppercase tracking-wider">Contacto</span>
            <span className="text-[14px] text-[#78716c]">makerbridge@gmail.com</span>
            <span className="text-[14px] text-[#78716c]">Buenos Aires, Argentina</span>
            <div className="flex items-center gap-3 pt-2 text-[#78716c]">
              {socials.map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-8 h-8 rounded-full bg-[#fbf7f0] border border-[#ebdccb] flex items-center justify-center hover:text-brand-primary hover:border-brand-primary transition-colors"
                >
                  <Icon name={icon} className="text-[16px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#ebdccb] flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[#78716c]">
          <span>© 2025 MakerBridge 3D HUB. Todos los derechos reservados.</span>
          <div className="flex items-center gap-6">
            {legal.map((l) => (
              <a key={l} href="#" className="hover:text-[#1c1917] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
