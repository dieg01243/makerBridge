import { useState } from 'react'
import logo from '../assets/logo.png'
import './Navbar.css'

const links = [
  { label: 'Explorar', href: '#trabajos' },
  { label: 'Servicios', href: '#trabajos' },
  { label: 'Proveedores', href: '#acceso' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Nosotros', href: '#nosotros' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#home" className="navbar-brand" onClick={() => setOpen(false)}>
          <img src={logo} alt="MakerBridge" className="navbar-logo" />
          <span className="navbar-name">MakerBridge</span>
        </a>

        <button
          className={`nav-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menú"
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-menu ${open ? 'open' : ''}`}>
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="btn btn-primary nav-cta"
            href="mailto:makerbridge@gmail.com"
            onClick={() => setOpen(false)}
          >
            Contáctanos
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar