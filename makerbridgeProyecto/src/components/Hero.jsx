import './Hero.css'
import logo from '../assets/logo.png'

const stats = [
  { value: '120+', label: 'Proyectos entregados' },
  { value: '60+', label: 'Clientes satisfechos' },
  { value: '5+', label: 'Años de experiencia' },
]

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-glow hero-glow-a" />
      <div className="hero-glow hero-glow-b" />
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="badge">
            <span className="badge-dot"></span>
            Impresión 3D
          </span>
          <h1 className="hero-title">
            <span className="gradient">MakerBridge</span> conecta con clientes y
            proveedores en un solo lugar
          </h1>
          <p className="hero-text">
            Subí tu archivo 3D o encontrá a quien lo haga realidad. Prototipos y piezas
            de alta precisión, con un solo paso.
          </p>
          <div className="hero-actions">
            <a href="#acceso" className="btn btn-primary">
              Explorar
            </a>
            <a href="#trabajos" className="btn btn-ghost">
              Ver trabajos
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card card-main">
            <div className="logo-scene">
              <img src={logo} alt="MakerBridge" className="hero-logo" />
            </div>
            <div className="card-meta">
              <div>
                <strong>¿Cómo funciona?</strong>
                <span>Con tu archivo 3D</span>
              </div>
              <span className="done-tag">✓ Simple</span>
            </div>
          </div>

        </div>
      </div>

      <div className="container hero-stats">
        {stats.map((s) => (
          <div className="hero-stat" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero