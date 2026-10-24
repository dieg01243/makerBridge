import * as servicioProductos from '../API/servicioProductos.jsx'

// Mock de API. Reemplazá estas funciones por fetch/axios a tu backend, p. ej.:
//   GET /api/pedidos/:id
//   GET /api/pedidos/:id/cotizaciones
const hoursAgo = (h) => new Date(Date.now() - h * 3600_000).toISOString()

const COTIZACIONES = {
  1234: [
    { id: 1, maker: { nombre: 'Fabricaciones Córdoba', iniciales: 'FC', tipo: 'PRO', rating: 4.9, fabricaciones: 124, ubicacion: 'Córdoba, Argentina', avatarClass: 'bg-gradient-to-tr from-brand-600 to-brand-400' }, plazoDias: 3, precio: 24500, moneda: 'ARS', fecha: hoursAgo(2) },
    { id: 2, maker: { nombre: 'PrintLab Rosario', iniciales: 'PL', tipo: 'VERIFICADO', rating: 4.8, fabricaciones: 89, ubicacion: 'Santa Fe, Argentina', avatarClass: 'bg-slate-700' }, plazoDias: 4, precio: 28000, moneda: 'ARS', fecha: hoursAgo(5) },
    { id: 3, maker: { nombre: 'Mendoza 3D Hub', iniciales: 'M3', tipo: 'VERIFICADO', rating: 5.0, fabricaciones: 64, ubicacion: 'Mendoza, Argentina', avatarClass: 'bg-neutral-700' }, plazoDias: 3, precio: 26200, moneda: 'ARS', fecha: hoursAgo(6) },
  ],
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export function normalizarPedido(pedido) {
  const color = typeof pedido.color === 'object' && pedido.color !== null
    ? {
        ...pedido.color,
        nombre: pedido.color.nombre ?? 'No especificado',
        hex: pedido.color.hex ?? '#e5e7eb',
      }
    : { nombre: pedido.color || 'No especificado', hex: '#e5e7eb' }
  const material = typeof pedido.material === 'object' && pedido.material !== null
    ? pedido.material
    : { nombre: pedido.material || 'No especificado', descripcion: '' }
  const archivoUrl = pedido.archivoUrl ?? pedido.archivo?.url
  const archivo = pedido.archivo ?? (archivoUrl
    ? {
        nombre: typeof archivoUrl === 'string' ? archivoUrl.split('/').pop() || 'Archivo adjunto' : 'Archivo adjunto',
        tamanio: '',
        facetas: '',
        verificado: false,
        url: archivoUrl,
      }
    : null)
  const estados = {
    pendiente: 'ABIERTO',
    abierto: 'ABIERTO',
    cotizado: 'ABIERTO',
    en_proceso: 'EN_PRODUCCION',
    finalizado: 'FINALIZADO',
    terminado: 'FINALIZADO',
    entregado: 'FINALIZADO',
    cancelado: 'CANCELADO',
  }
  const estado = typeof pedido.estado === 'string'
    ? estados[pedido.estado.toLowerCase()] ?? pedido.estado.toUpperCase()
    : pedido.estado ? 'FINALIZADO' : 'ABIERTO'

  return {
    ...pedido,
    id: pedido.idPedido ?? pedido.id,
    titulo: pedido.titulo ?? pedido.nombre ?? `Pedido de ${pedido.cantidad ?? 1} ${Number(pedido.cantidad ?? 1) === 1 ? 'unidad' : 'unidades'}`,
    descripcion: pedido.descripcion ?? '',
    cantidad: pedido.cantidad ?? 1,
    material,
    color,
    estado,
    archivo,
    fechaCreacion: pedido.fechaCreacion ?? pedido.createdAt,
    fechaLimite: pedido.fechaLimite ?? pedido.deadline,
  }
}

export async function getPedidoById(id) {
  await delay(300)
  const pedidos = await servicioProductos.obtener()
  const pedido = pedidos.find((item) => String(item.idPedido ?? item.id) === String(id))
  if (!pedido) throw new Error('NOT_FOUND')
  return normalizarPedido(pedido)
}

export async function getCotizacionesByPedido(id) {
  await delay(300)
  return COTIZACIONES[id] ?? []
}