import { useEffect, useState } from 'react'
import { getPedidoById, getCotizacionesByPedido } from '../service/pedidosService.js'

export function usePedidosCotizaciones(idPedido) {
  const [state, setState] = useState({ pedido: null, cotizaciones: [], loading: true, error: null })

  useEffect(() => {
    let cancelled = false
    setState({ pedido: null, cotizaciones: [], loading: true, error: null })

    Promise.all([getPedidoById(idPedido), getCotizacionesByPedido(idPedido)])
      .then(([pedido, cotizaciones]) => !cancelled && setState({ pedido, cotizaciones, loading: false, error: null }))
      .catch((error) => !cancelled && setState({ pedido: null, cotizaciones: [], loading: false, error }))

    return () => { cancelled = true }
  }, [idPedido])

  return state
}
