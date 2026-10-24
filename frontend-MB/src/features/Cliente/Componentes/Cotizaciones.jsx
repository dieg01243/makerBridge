// import { ClockIcon, CheckIcon, ChatIcon } from '../service/'
import { formatPrecio, tiempoRelativo } from '../service/format'


const TIPOS = {
  PRO: { label: 'Maker Pro', className: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  VERIFICADO: { label: 'Maker Verificado', className: 'text-brand-700 bg-brand-50 border-brand-200' },
}

export default function CotizacionCard({ cotizacion, destacada, onPagar, onMensaje }) {
  const { maker } = cotizacion
  const tipo = TIPOS[maker.tipo] ?? TIPOS.VERIFICADO

  return (
    <article
      className={`rounded-xl border-2 border-dashed bg-white hover:border-brand-500 transition-all p-5 shadow-sm ${
        destacada ? 'border-brand-200' : 'border-surface-border'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl text-white font-bold flex items-center justify-center text-lg shadow-sm shrink-0 ${maker.avatarClass}`}>
              {maker.iniciales}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-ink-primary">{maker.nombre}</h4>
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border ${tipo.className}`}>
                  {tipo.label}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-secondary mt-0.5">
                <span className="flex items-center text-amber-500 font-bold">★ {maker.rating.toFixed(1)}</span>
                <span>({maker.fabricaciones} fabricaciones)</span>
                <span>•</span>
                <span>{maker.ubicacion}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-ink-secondary pt-1">
            <span className="inline-flex items-center gap-1 font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
              {/* <ClockIcon className="w-3.5 h-3.5" /> */} {cotizacion.plazoDias} días hábiles
            </span>
            <span>•</span>
            <span>Enviada {tiempoRelativo(cotizacion.fecha)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:items-end justify-center text-left sm:text-right sm:border-l sm:border-surface-border sm:pl-5 space-y-2.5 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-ink-secondary tracking-wider block">Precio Total</span>
            <div className="flex items-baseline gap-1 sm:justify-end">
              <span className="text-2xl font-extrabold text-ink-primary tracking-tight">$ {formatPrecio(cotizacion.precio)}</span>
              <span className="text-xs font-semibold text-ink-secondary">{cotizacion.moneda}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onPagar?.(cotizacion)}
              className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold text-white rounded-xl transition-all inline-flex items-center justify-center gap-1.5 whitespace-nowrap ${
                destacada
                  ? 'bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/20'
                  : 'bg-slate-800 hover:bg-slate-900 shadow-sm'
              }`}
            >
              {/* <CheckIcon className="w-3.5 h-3.5" /> */}
              Pagar y Fabricar
            </button>
            <button
              type="button"
              title="Enviar Mensaje al Maker"
              onClick={() => onMensaje?.(cotizacion)}
              className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-bold text-ink-primary bg-surface-muted border border-surface-border rounded-xl hover:bg-neutral-200 transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              {/* <ChatIcon className="w-3.5 h-3.5" /> */}
              Mensaje
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}