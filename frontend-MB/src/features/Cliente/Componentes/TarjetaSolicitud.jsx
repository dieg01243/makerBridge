import OrderCard from '../../maker/components/OrderCard'
import './TarjetaSolicitud.css'


const aFecha = (v) => {
  if (!v) return ''
  // Las fechas de la API llegan como timestamp en segundos
  const d = new Date(typeof v === 'number' ? v * 1000 : v)
  return isNaN(d) ? '' : d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })
}

const ESTADOS = {
  pendiente: { label: 'Pendiente', acento: 'bg-brand-accentBlue', badge: 'bg-brand-accentBlueLight text-brand-accentBlue', punto: 'bg-brand-accentYellow animate-pulse' },
  finalizado: { label: 'Finalizado', acento: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-800', punto: 'bg-emerald-500' },
}

/* Registro de MockAPI -> objeto `order` que ya espera OrderCard.
   Es el único lugar que conoce los campos de la API: si cambian, se ajusta acá. */
const aOrder = (p) => {
  const estado = p.estado ? ESTADOS.finalizado : ESTADOS.pendiente

  return {
    accentClass: estado.acento,
    code: `#${p.idPedido}`,
    publishedAgo: `Solicitado el ${aFecha(p.fechaCreacion)}`,
    status: { className: estado.badge, dotClass: estado.punto, label: estado.label },
    // La API no trae nombre de producto: si agregan `nombre`, se usa solo
    title: p.nombre ?? `Pedido de ${p.cantidad} ${Number(p.cantidad) === 1 ? 'unidad' : 'unidades'}`,
    client: { verified: false, name: `Cliente #${p.idUsuario}` },
    location: p.localidad ?? 'Ubicación no informada', // la API todavía no tiene este dato
    file: { icon: 'attach_file', iconClass: 'text-brand-accentBlue', label: 'Archivo adjunto' },
    specs: [
      { label: 'CANTIDAD', value: p.cantidad },
      { label: 'MATERIAL', value: p.material },
      { label: 'COLOR/ACABADO', value: p.color },
      
    ].filter((s) => s.value !== '' && s.value != null),
    deadline: { icon: 'event', date: aFecha(p.fechaLimite) },
    image: { src: p.archivoUrl, alt: `Pedido ${p.idPedido}`, tag: 'Archivo' },
    description: p.descripcion ?? '',
    footerInfo: { variant: 'info', text: p.archivoUrl ? 'Archivo adjunto disponible' : 'Sin archivo adjunto' },
    primaryAction: 'Ver detalle',
  }
}


/* Usa OrderCard TAL CUAL. OrderCard tiene un único botón y no expone onClick,
   así que el click se captura en el contenedor (delegación de eventos). */
export default function TarjetaSolicitud({ producto, onVerDetalle }) {
  return (
    
      <div onClick={(e) => e.target.closest('button') && onVerDetalle?.(producto)}>
        <OrderCard order={aOrder(producto)} theme="client" />
      </div>
  )
}
