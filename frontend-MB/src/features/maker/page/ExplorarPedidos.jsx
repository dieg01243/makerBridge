import { useState } from 'react'
import FiltersSidebar from '../components/FiltersSidebar'
import OrderCard from '../components/OrderCard'
import Pagination from '../components/Pagination'
import ordersData from '../data/orders.json'
import { toOrderCard } from '../data/orderMapper'

const DEFAULT_MATERIALS = ['pla', 'petg']
const DEFAULT_LOCATION = 'all'
const PAGE_SIZE = 4   // pedidos que mostramos por página

// Hay que reemplazar? `ordersData` por el resultado del fetch.
const orders = ordersData.map(toOrderCard)

export default function ExplorarPedidos() {
  const [materials, setMaterials] = useState(DEFAULT_MATERIALS)
  const [location, setLocation] = useState(DEFAULT_LOCATION)
  const [page, setPage] = useState(1)

  const toggleMaterial = (id) =>
    setMaterials((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]))

  const clearFilters = () => {
    setMaterials([])
    setLocation(DEFAULT_LOCATION)
  }

  // Paginación
  const total = orders.length
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const visibleOrders = orders.slice(start, start + PAGE_SIZE)

  const goToPage = (n) => {
    setPage(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Título + barra de orden */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-[34px] md:text-[42px] font-extrabold text-[#1c1917] tracking-tight leading-tight">
              Explorar Pedidos <span className="text-brand-primary">Disponibles</span>
            </h1>
            <p className="text-[16px] text-[#78716c] max-w-2xl mt-1.5">
              Encontrá solicitudes de impresión y diseño 3D publicadas por clientes, revisá especificaciones técnicas y enviá tus cotizaciones antes de la fecha límite.
            </p>
          </div>
        </div>
      </section>

      {/* Sidebar + feed */}
      <div className="flex flex-col lg:flex-row items-start gap-7">
        <FiltersSidebar
          materials={materials}
          location={location}
          onToggleMaterial={toggleMaterial}
          onChangeLocation={setLocation}
          onClear={clearFilters}
        />

        <section className="flex-1 w-full flex flex-col gap-5">
          {visibleOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}

          <Pagination
            shown={visibleOrders.length}
            total={total}
            page={page}
            pages={pages}
            onChange={goToPage}
          />
        </section>
      </div>
    </>
  )
}