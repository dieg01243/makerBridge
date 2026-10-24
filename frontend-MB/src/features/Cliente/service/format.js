const fecha = new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })
const hora = new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit', hour12: true })
const precio = new Intl.NumberFormat('es-AR')

export const formatFecha = (iso) => fecha.format(new Date(iso)).replace(/\./g, '')
export const formatHora = (iso) => hora.format(new Date(iso))
export const formatPrecio = (n) => precio.format(n)

export function tiempoRelativo(iso) {
  const min = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (min < 60) return 'hace unos minutos'
  const h = Math.floor(min / 60)
  if (h < 24) return `hace ${h}h`
  const d = Math.floor(h / 24)
  return `hace ${d} ${d === 1 ? 'día' : 'días'}`
}

