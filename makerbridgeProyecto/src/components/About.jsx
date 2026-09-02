import './About.css'

const values = [
  {
    icon: '🎨',
    title: 'Creatividad sin límites',
    text: 'Del concepto al objeto real. Acompañamos cada idea con soluciones de diseño.',
  },
  {
    icon: '🔬',
    title: 'Precisión técnica',
    text: 'Impresoras calibradas y materiales de calidad para resultados profesionales.',
  },
  {
    icon: '🤝',
    title: 'Trabajo en equipo',
    text: 'Escuchamos tu idea y trabajamos codo a codo hasta que quede perfecta.',
  },
]

function About() {
  return (
    <section id="nosotros" className="about">
      <div className="container">
        <div className="section-head">
          <span className="badge">Nosotros</span>
          <h2 className="section-title">Sobre MakerBridge</h2>
          <p className="section-subtitle">
            Somos un estudio de fabricación digital apasionado por convertir ideas en
            piezas reales mediante tecnología de impresión 3D accesible para todos.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-story">
            <p>
              Nacimos con una misión simple: <strong>acercar la impresión 3D a todos</strong>.
              Lo que antes era solo para grandes fábricas, hoy está a un clic de distancia.
            </p>
            <p>
              Ya sea que necesites un prototipo, un regalo único, una pieza de repuesto o
              un objeto decorativo, en MakerBridge lo hacemos realidad con precisión,
              rapidez y un trato cercano.
            </p>
          </div>

          <div className="value-list">
            {values.map((v) => (
              <div className="value-item" key={v.title}>
                <div className="value-icon">{v.icon}</div>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
