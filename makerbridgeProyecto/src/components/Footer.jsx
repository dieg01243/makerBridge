import './Footer.css'
import logo from '../assets/logo.png'

const footerLinks = [
  {
    title: 'Navegación',
    items: [
      { label: 'Inicio', href: '#home' },
      { label: 'Trabajos', href: '#trabajos' },
      { label: 'Cómo funciona', href: '#como-funciona' },
      { label: 'Nosotros', href: '#nosotros' },
    ],
  },
  {
    title: 'Contacto',
    items: [
      { label: 'makerbridge@gmail.com', href: 'mailto:makerbridge@gmail.com' },
      { label: '+54 11 1234-5678', href: 'tel:+541112345678' },
      { label: 'Buenos Aires, Argentina', href: '#contacto' },
    ],
  },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo-row">
            <img src={logo} alt="MakerBridge" className="footer-logo" />
            <span className="footer-name">MakerBridge</span>
          </div>
          <p className="footer-tagline">
            Convertimos ideas en piezas reales con impresión 3D de alta precisión.
          </p>
          <div className="footer-social">
            <a href="#instagram" aria-label="Instagram">IG</a>
            <a href="#facebook" aria-label="Facebook">FB</a>
            <a href="#linkedin" aria-label="LinkedIn">IN</a>
            <a href="#whatsapp" aria-label="WhatsApp">WA</a>
          </div>
        </div>

        <div className="footer-cols">
          {footerLinks.map((col) => (
            <div className="footer-col" key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} MakerBridge. Todos los derechos reservados.</span>
        <div className="footer-bottom-links">
          <a href="#privacidad">Privacidad</a>
          <a href="#terminos">Términos</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
