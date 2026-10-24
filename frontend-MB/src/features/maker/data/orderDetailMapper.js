import { ORDER_DEFAULTS as D } from './orderDefaults'
import { formatDate, timeAgo, formatCode, formatQuantity, getFileName } from './orderMapper'

// Fila de la tabla `pedidos` -> props para <OrderSummaryCard />
export function toOrderDetail(row) {
  return {
    id: row.id_pedido,
    code: formatCode(row.id_pedido),
    publishedLabel: `${timeAgo(row.fecha_creacion)} (${formatDate(row.fecha_creacion)})`,
    statusLabel: D.statusLabels[String(row.estado).toLowerCase()] ?? row.estado,
    title: row.titulo,
    // Si hacés JOIN con usuarios y devolvés `nombre_usuario`, se usa acá.
    client: { name: row.nombre_usuario ?? D.client.name, location: row.ubicacion },
    file: row.archivo_url
      ? { name: getFileName(row.archivo_url), url: row.archivo_url }
      : null,
    specs: {
      quantity: formatQuantity(row.cantidad),
      material: row.material,
      color: row.color,
      deadline: formatDate(row.fecha_limite),
    },
    description: row.descripcion,
  }
}
