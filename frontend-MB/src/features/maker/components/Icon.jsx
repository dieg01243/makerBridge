// Wrapper de Material Symbols Outlined.
// Requiere el <link> de la fuente en index.html (ver INTEGRACION.md).
export default function Icon({ name, className = '' }) {
  return (
    <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  )
}
