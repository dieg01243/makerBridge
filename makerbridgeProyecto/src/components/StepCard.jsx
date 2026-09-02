import './StepCard.css'

function StepCard({ step }) {
  return (
    <div className="step-card">
      <div className="step-number">{String(step.number).padStart(2, '0')}</div>
      <div className="step-icon">{step.icon}</div>
      <h3 className="step-title">{step.title}</h3>
      <p className="step-text">{step.text}</p>
    </div>
  )
}

export default StepCard
