import StepCard from './StepCard'
import './HowItWorks.css'

const steps = [
  {
    number: 1,
    icon: '💡',
    title: 'Contanos tu idea',
    text: 'Completá el formulario con tu proyecto, subí el archivo 3D o describí qué necesitás. Te asesoramos gratis.',
  },
  {
    number: 2,
    icon: '🛠️',
    title: 'Diseñamos y preparamos',
    text: 'Optimizamos el modelo, elegimos el material y la configuración ideal para cada pieza.',
  },
  {
    number: 3,
    icon: '🖨️',
    title: 'Imprimimos y pulimos',
    text: 'Producimos tu pieza con impresoras de alta precisión y la terminamos para un acabado impecable.',
  },
  {
    number: 4,
    icon: '📦',
    title: 'Entregamos',
    text: 'Empacamos con cuidado y te lo llevamos, o coordinamos el envío a tu casa u oficina.',
  },
]

function HowItWorks() {
  return (
    <section id="como-funciona">
      <div className="container">
        <div className="section-head">
          <span className="badge">Proceso</span>
          <h2 className="section-title">
            ¿Cómo funciona MakerBridge con tu archivo 3D?
          </h2>
          <p className="section-subtitle">
            Empezar es simple. Seguí estos cuatro pasos y en pocos días tenés tu pieza lista.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
