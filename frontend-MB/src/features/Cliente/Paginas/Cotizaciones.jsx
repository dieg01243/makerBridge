import { Link, useNavigate, useParams } from 'react-router-dom'
import { usePedidosCotizaciones } from '../Hooks/usePedidosCotizaciones.jsx'
import ListadoCotizaciones from '../Componentes/ListadoCotizaciones.jsx'
import DetallePedidos from '../Componentes/DetallePedidos.jsx'
import Header from '../layout/Header.jsx'


function Skeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
      <div className="lg:col-span-6 h-[520px] rounded-2xl bg-surface-muted" />
      <div className="lg:col-span-6 h-[520px] rounded-2xl bg-surface-muted" />
    </div>
  )
}

export default function Cotizaciones() {

  const { idPedido } = useParams()
  const navigate = useNavigate()
  const { pedido, cotizaciones, loading, error } = usePedidosCotizaciones(idPedido)

  // TODO: conectar con tu flujo real de pago / chat
  const handlePagar = (cotizacion) => navigate(`/checkout/${pedido.id}/${cotizacion.id}`)
  const handleMensaje = (cotizacion) => navigate(`/mensajes?maker=${encodeURIComponent(cotizacion.maker.nombre)}&pedido=${pedido.id}`)
  const handleVisor3D = (archivo) => console.log('Abrir visor 3D', archivo) // p. ej. react-three-fiber + STLLoader

  if (loading) return <Skeleton />

  if (error || !pedido) {
    return (
      <div className="text-center py-24 space-y-3">
        <h1 className="text-2xl font-extrabold">No encontramos este pedido</h1>
        <p className="text-sm text-ink-secondary">Puede que haya sido eliminado o que no tengas acceso.</p>
        <Link to=".." className="inline-block text-sm font-bold text-brand-600 hover:underline">
          Volver a Mis Solicitudes
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section>
      
        <Header 
        title='Mis'
        accent='cotizaciones'
        description='Visualiza el detalle de tu pedido junto con las distintas cotizaciones ofrecidas por los makers, junto con su boton de pago correspondiente, ¡No dudes en contactarte con los makers por cualquier consulta!, si necesita asistencia puede contactarse con el centro de atencion al cliente dispoble de 8hs a 18hs.  '/>
        {/* </div> */}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <DetallePedidos pedido={pedido} onVerVisor3D={handleVisor3D} />
        <ListadoCotizaciones cotizaciones={cotizaciones} onPagar={handlePagar} onMensaje={handleMensaje} />
      </div>
    </div>
  )
}