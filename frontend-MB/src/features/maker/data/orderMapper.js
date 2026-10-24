import { ORDER_DEFAULTS as D } from './orderDefaults'
//-------------------------------------Datos que se usan para el detalle de un pedido en la vista de explorarpedidos---------

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

// '2025-02-26' -> '26 Feb 2025' (sin new Date() para evitar desfases de zona horaria)
export function formatDate(value) {
  const [y, m, d] = String(value).slice(0, 10).split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}

// '2025-02-14T09:30:00' -> 'Publicado hace 3 horas'
export function timeAgo(value) {
  const min = Math.floor((Date.now() - new Date(value).getTime()) / 60000)
  const hours = Math.floor(min / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`

  if (min < 1) return 'Publicado recién'
  if (min < 60) return `Publicado hace ${plural(min, 'minuto', 'minutos')}`
  if (hours < 24) return `Publicado hace ${plural(hours, 'hora', 'horas')}`
  if (days < 30) return `Publicado hace ${plural(days, 'día', 'días')}`
  return `Publicado hace ${plural(months, 'mes', 'meses')}`
}
export const formatCode = (id) => `#MK-${id}`

export const formatQuantity = (n) => `${n} ${n === 1 ? 'unidad' : 'unidades'}`

export function getFileName(url = '') {
  try {
    return decodeURIComponent(String(url).split('?')[0].split('/').pop()) || 'archivo.stl'
  } catch {
    return 'archivo.stl'
  }
}

// Fila de la tabla `pedidos` -> props que espera <OrderCard />
export function toOrderCard(row) {
  return {
    id: row.id_pedido,
    code: formatCode(row.id_pedido),
    accentClass: D.accentClass,
    publishedAgo: timeAgo(row.fecha_creacion),
    status: {
      ...D.statusStyle,
      label: D.statusLabels[String(row.estado).toLowerCase()] ?? row.estado,
    },
    title: row.titulo,
    // Si se hace un JOIN con usuarios y devolvés `nombre_usuario`, se usa acá.
    client: { ...D.client, name: row.nombre_usuario ?? D.client.name },
    location: row.ubicacion,
    file: { ...D.file, label: row.archivo_url ? getFileName(row.archivo_url) : D.file.label },
    specs: [
      { label: 'Cantidad', value: formatQuantity(row.cantidad) },
      { label: 'Material', value: row.material },
      { label: 'Color / Acabado', value: row.color },
    ],
    deadline: { icon: D.deadlineIcon, date: formatDate(row.fecha_limite) },
    image: D.image,
    description: row.descripcion,
    footerInfo: D.footerInfo,
    primaryAction: D.primaryAction,
  }
}
