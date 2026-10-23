import { Outlet, ScrollRestoration } from 'react-router-dom'
import BenchyWidget from '../common/BenchyWidget'

export default function RootLayout() {
  return (
    <>
      <Outlet />        {/* acá se inyecta la página según la ruta */}
      <ScrollRestoration/>
      <BenchyWidget />  {/* esto queda fijo sin importar qué página esté activa (hay que ver si es seguro) */}
    </>
  )
}