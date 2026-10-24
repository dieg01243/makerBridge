import { Link } from 'react-router-dom'
import {formatFecha, formatHora} from '../service/format.js'


const ESTADOS = {
  ABIERTO: { label: 'Abierto a ofertas', className: 'text-brand-600', dot: 'bg-brand-500' },
  EN_PRODUCCION: { label: 'En producción', className: 'text-amber-600', dot: 'bg-amber-500' },
  FINALIZADO: { label: 'Finalizado', className: 'text-emerald-600', dot: 'bg-emerald-500' },
  CANCELADO: { label: 'Cancelado', className: 'text-red-600', dot: 'bg-red-500' },
}

function Dato({ label, children, sub }) {
  return (
    <div className="p-3 bg-surface-muted rounded-xl border border-surface-border">
      <span className="block text-[11px] uppercase font-bold text-ink-secondary tracking-wider">{label}</span>
      {children}
      {sub && <span className="text-[10px] text-ink-secondary">{sub}</span>}
    </div>
  )
}

export default function DetallePedidos({ pedido, onVerVisor3D }) {
  const estado = ESTADOS[pedido.estado] ?? ESTADOS.ABIERTO
  const vencido = new Date(pedido.fechaLimite) < new Date()
  const { archivo } = pedido

  return (
    <section className="lg:col-span-6 space-y-6">
      <div className="flex items-center">
        <Link
          to=".."
          className="inline-flex items-center gap-2 text-xs font-bold text-ink-secondary hover:text-brand-600 bg-white px-3.5 py-2 rounded-xl border border-surface-border shadow-sm hover:border-brand-200 transition-all"
        >
          {/* <ArrowLeftIcon /> */}
          <span>Volver a Mis Solicitudes</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-7 relative overflow-hidden border border-surface-border wireframe-accent-box">
        <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-brand-100 text-brand-600">
              {/* <DocumentIcon className="w-5 h-5" /> */}
            </span>
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-brand-700">DETALLE DEL PEDIDO</h2>
              <p className="text-xs text-ink-secondary">Identificador único de fabricación: #idPedido: {pedido.id}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold text-ink-primary">{pedido.titulo}</h3>
          <p className="text-sm text-ink-secondary mt-1 leading-relaxed">{pedido.descripcion}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
          <Dato label="Cantidad">
            <span className="text-base font-extrabold text-ink-primary mt-0.5 block">
              {pedido.cantidad} {pedido.cantidad === 1 ? 'unidad' : 'unidades'}
            </span>
          </Dato>

          <Dato label="Material" sub={pedido.material.descripcion}>
            <span className="text-base font-bold text-brand-700 mt-0.5 block">{pedido.material.nombre}</span>
          </Dato>

          <Dato label="Color / Acabado">
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-3.5 h-3.5 rounded-full border border-neutral-400" style={{ backgroundColor: pedido.color.hex }} />
              <span className="text-sm font-bold text-ink-primary">{pedido.color.nombre}</span>
            </div>
          </Dato>

          <Dato label="Fecha Límite" sub="Entrega requerida">
            <span className={`text-sm font-bold mt-0.5 block ${vencido ? 'text-red-600' : 'text-ink-primary'}`}>
              {formatFecha(pedido.fechaLimite)}
            </span>
          </Dato>

          <Dato label="Fecha Creación" sub={formatHora(pedido.fechaCreacion)}>
            <span className="text-sm font-semibold text-ink-primary mt-0.5 block">{formatFecha(pedido.fechaCreacion)}</span>
          </Dato>

          <Dato label="Estado Actual">
            <span className={`inline-flex items-center gap-1 text-xs font-bold mt-1 ${estado.className}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${estado.dot}`} />
              {estado.label}
            </span>
          </Dato>
        </div>

        {archivo && (
          <div className="border-t border-surface-border pt-6">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-ink-secondary mb-3 flex items-center gap-2">
              {/* <PaperclipIcon className="w-4 h-4 text-brand-500" /> */}
              Archivo 3D Adjunto (CAD / STL / IMAGEN )
            </h4>
            <div className="rounded-xl border border-surface-border bg-surface-muted p-4 hover:border-brand-400 transition-all group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-lg bg-brand-100 technical-grid-bg flex items-center justify-center border border-brand-200 text-brand-600 shrink-0">
                    {/* <CubeIcon /> */}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-ink-primary group-hover:text-brand-600 transition-colors">{archivo.nombre}</h5>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-ink-secondary">
                      <span>{archivo.tamanio}</span>
                      {archivo.verificado && (
                        <>
                          <span>•</span>
                          <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                            ✓ Mesh verificado ({archivo.facetas} facetas)
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onVerVisor3D?.(archivo)}
                    className="px-3.5 py-1.5 text-xs font-bold text-brand-700 bg-white border border-surface-border rounded-lg hover:bg-brand-50 hover:border-brand-400 transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    {/* <EyeIcon className="w-3.5 h-3.5" /> */}
                    Visor 3D
                  </button>
                  <a
                    href={archivo.url}
                    download={archivo.nombre}
                    className="px-3.5 py-1.5 text-xs font-bold text-ink-secondary bg-white border border-surface-border rounded-lg hover:text-ink-primary hover:bg-neutral-100 transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    {/* <DownloadIcon className="w-3.5 h-3.5" /> */}
                    Descargar
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 flex items-start gap-3 shadow-sm">
        {/* <ShieldIcon className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" /> */}
        <div className="text-xs text-brand-700 leading-relaxed">
          <span className="font-bold">Pago protegido por MakerBridge:</span> Tu dinero queda en custodia segura y solo se libera al Maker una vez que recibes las piezas impresas y confirmas su conformidad técnica.
        </div>
      </div>
    </section>
  )
}