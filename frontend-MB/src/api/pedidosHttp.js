import client from './apiClient'

// Ids de orden del front -> valor que entiende el back.
const ORDERING = {
  recent: '-fecha_creacion', // el "-" significa descendente (más nuevo primero)
  oldest: 'fecha_creacion',
  deadline: 'fecha_limite',
}

export async function getPedidos({ q, sort, materials, location, page, pageSize, estado }) {
  const params = {
    page,
    page_size: pageSize,
    ordering: ORDERING[sort],
  }
  if (estado) params.estado = estado // ya acordado con el back: estado=abierto
  if (q) params.search = q
  if (materials?.length) params.material = materials.join(',')
  if (location && location !== 'all') params.ubicacion = location

  // Usamos el cliente global
  const { data } = await client.get('/pedidos/', { params })
  return data // { count, results }
}