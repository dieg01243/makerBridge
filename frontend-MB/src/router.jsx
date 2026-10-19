import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './components/common/RootLayout'
/*-------------- Todas las rutas publicas de la aplicacion web ----------------*/
/* --------------------------Rutas de públicas -------------------------*/
import PublicLayout from './features/public/layout/PublicLayout.jsx' /* Plantilla que comparten las paginas publicas */
import Home from './features/public/pages/Home'
import ServiciosPage from './features/public/pages/ServiciosPage.jsx'
/* 
import ComoFunciona from './features/public/pages/ComoFunciona'
import ExplorarProductos from './features/public/pages/ExplorarProductos'
*/
/* --------------------------Rutas de autenticación -------------------------*/
/* import AuthLayout from './features/auth/layout/AuthLayout' */  /* Plantilla que comparten las paginas de autenticacion */
import RutaProtegida from './features/auth/RutaProtegida'
import Login from './features/auth/pages/LoginPage'
/* import Register from './features/auth/pages/Register' */
/* --------------------------Rutas del maker -------------------------*/
import MakerLayout from './features/maker/layout/MakerLayout'
import ExplorarPedidos from './features/maker/page/ExplorarPedidos'

/* --------------------------Rutas del cliente -------------------------*/
import PerfilPrivado from './features/Cliente/Paginas/PerfilPrivado.jsx'
import Solicitudes from './features/Cliente/Paginas/MisSolicitudes.jsx'
import NuevaSolicitud from './features/Cliente/Paginas/NuevaSolicitud.jsx'
import ClienteLayout from './features/Cliente/layout/ClienteLayout.jsx'


const router = createBrowserRouter([
  {
    element: <RootLayout />,          // Benchy fijo en TODO (habria que ver si es lo suficientemente seguro)
    children: [

      {
        element: <PublicLayout />,     // Navbar + Footer del PublicLayout
        children: [
          { path: '/', element: <Home /> },
          { path: '/servicios', element: <ServiciosPage /> },
          /* { path: '/como-funciona', element: <ComoFunciona /> },
          { path: '/explorarProductos', element: <ExplorarProductos /> }, */
        ],
      },

      {
        element: <PublicLayout /> /*  <AuthLayout /> */,       // Navbar minimalista + footer del AuthLayout
        children: [
          { path: '/login', element: <Login /> },
          /* { path: '/registro', element: <Register /> }, */
        ],
      },
  /* -------------------------------------------- Vista Cliente ------------------------------------------------------ */
      /* ------------------------------ Perfil Privado ----------------------------------- */
      /* ...(import.meta.env.DEV
        ? [{
          path: '/dev/cliente',
          element: <ClienteLayout />, //<MakerLayout />
          children: [
              { index: true, element: <PerfilPrivado /> }],
        }]
        : []), */

      /* --------------------- MisSolicitudes / Nueva solicitud--------------------------- */
      ...(import.meta.env.DEV
        ? [{
          path: '/dev/solicitudes',
          element: <ClienteLayout />,
          children: [
            
            { index: true, element: <Solicitudes /> },
            { path: 'nueva-solicitud', element: <NuevaSolicitud /> },
            { path: 'mi-perfil', element: <PerfilPrivado /> }],
            
        }]
        : []),
      /* ------------------------------------------------------------------------------------------------------------------ */
      {
        path: '/maker',
        element: (
          <RutaProtegida rol={['maker']}>
            <MakerLayout />
          </RutaProtegida>
          
        ),
        children: [{ index: true, element: <ExplorarPedidos /> }],
      },
      ...(import.meta.env.DEV
        ? [{
          path: '/dev/maker',
          element: <MakerLayout />,
          children: [{ index: true, element: <ExplorarPedidos /> }],
        }]
        : []),
    ],
  },
])

export default router