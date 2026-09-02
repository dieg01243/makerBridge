import './RoleCTA.css'

const roles = [
  {
    id: 'proveedor',
    icon: '🖨️',
    title: 'Soy Maker',
    description:
      'Tenés una impresora 3D y querés ofrecer tus servicios. Registrate como proveedor, publicá tus trabajos y recibí pedidos reales.',
    points: ['Registrate como proveedor', 'Publicá tus trabajos', 'Recibí pedidos reales'],
    cta: 'Registrarme como Maker',
    tag: 'Ofrecé servicios',
    className: 'role-maker',
  },
  {
    id: 'cliente',
    icon: '📐',
    title: 'Necesito un Maker',
    description:
      'Tenés una idea o un archivo 3D y necesitás una pieza. Encontrá al proveedor ideal para tu proyecto y recibilo en tu casa.',
    points: ['Subí tu archivo 3D', 'Cotizá al instante', 'Recibí tu pieza'],
    cta: 'Buscar un Maker',
    tag: 'Pedí tu pieza',
    className: 'role-cliente',
  },
]

function RoleCTA() {
  return (
    <section id="acceso" className="role">
      <div className="role-glow" />
      <div className="container">
        <div className="section-head">
          <span className="badge">Empezá hoy</span>
          <h2 className="section-title">¿Qué rol tomás?</h2>
          <p className="section-subtitle">
            MakerBridge conecta a quienes imprimen con quienes necesitan. Elegí tu lado
            y comenzá en minutos.
          </p>
        </div>

        <div className="role-grid">
          {roles.map((role) => (
            <div className={`role-card ${role.className}`} key={role.id}>
              <div className="role-card-head">
                <div className="role-icon">{role.icon}</div>
                <span className="role-tag">{role.tag}</span>
              </div>
              <h3 className="role-title">{role.title}</h3>
              <p className="role-desc">{role.description}</p>
              <ul className="role-points">
                {role.points.map((point) => (
                  <li key={point}>
                    <span className="role-check">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
              <a href="#registro" className="btn role-cta">
                {role.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RoleCTA