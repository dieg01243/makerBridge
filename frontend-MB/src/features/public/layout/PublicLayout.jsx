import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PublicLayout() {
  return (
    <div className="min-h-screen text-slate-800 antialiased flex flex-col justify-between selection:bg-[#e06d53]/20 selection:text-[#e06d53]">

      <Header />
      <main className="flex-grow">
        <Outlet />   {/* acá inyectamos Home, Servicios, ComoFunciona o Explorar Productos según la URL */}
      </main>
      <Footer />
    </div>
  )
}