import { useMemo, useState } from 'react'
import Cotizaciones from '../Componentes/Cotizaciones'

const ORDENES = {
  fecha: { label: 'Fecha de cotización', fn: (a, b) => new Date(b.fecha) - new Date(a.fecha) },
  precio: { label: 'Menor precio', fn: (a, b) => a.precio - b.precio },
  plazo: { label: 'Menor plazo', fn: (a, b) => a.plazoDias - b.plazoDias },
  rating: { label: 'Mejor calificación', fn: (a, b) => b.maker.rating - a.maker.rating },
}

export default function ListaCotizaciones({ cotizaciones, onPagar, onMensaje }) {
  const [orden] = useState('fecha')

  const ordenadas = useMemo(() => [...cotizaciones].sort(ORDENES[orden].fn), [cotizaciones, orden])
  const mejorPrecioId = useMemo(
    () => cotizaciones.reduce((min, c) => (!min || c.precio < min.precio ? c : min), null)?.id,
    [cotizaciones],
  )

  return (
    <section className="lg:col-span-6 space-y-5 pt-10">
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-surface-border shadow-sm">
        <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-surface-border">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-ink-primary">COTIZACIONES</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-brand-500 text-white">{cotizaciones.length}</span>
            </div>
            <p className="text-xs text-ink-secondary mt-0.5">Propuestas técnicas enviadas por makers certificados</p>
          </div>

          <label className="text-xs font-medium text-ink-secondary flex items-center gap-2">
            <span className="hidden sm:inline">Ordenar por:</span>
            Fecha de cotización
          </label>
        </div>

        {ordenadas.length === 0 ? (
          <p className="text-sm text-ink-secondary text-center py-10">
            Todavía no recibiste cotizaciones. Te avisaremos cuando un maker envíe su propuesta.
          </p>
        ) : (
          <div className="space-y-5">
            {ordenadas.map((c) => (
              <Cotizaciones
                key={c.id}
                cotizacion={c}
                destacada={c.id === mejorPrecioId}
                onPagar={onPagar}
                onMensaje={onMensaje}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}