import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './components/common/RootLayout'
/*-------------- Todas las rutas publicas de la aplicacion web ----------------*/
/* --------------------------Rutas de públicas -------------------------*/
import PublicLayout from './features/public/layout/PublicLayout.jsx' /* Plantilla que comparten las paginas publicas */
import Home from './features/public/pages/Home'
/* import Servicios from './features/public/pages/Servicios'
import ComoFunciona from './features/public/pages/ComoFunciona'
import ExplorarProductos from './features/public/pages/ExplorarProductos' */
/* --------------------------Rutas de autenticación -------------------------*/
/* import AuthLayout from './features/auth/layout/AuthLayout' */  /* Plantilla que comparten las paginas de autenticacion */
/* import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register' */

const router = createBrowserRouter([
  {
    element: <RootLayout />,          // Benchy fijo en TODO (habria que ver si es lo suficientemente seguro)
    children: [

      {
        element: <PublicLayout />,     // Navbar + Footer del PublicLayout
        children: [
          { path: '/', element: <Home /> },
          /* { path: '/servicios', element: <Servicios /> },
          { path: '/como-funciona', element: <ComoFunciona /> },
          { path: '/explorarProductos', element: <ExplorarProductos /> }, */
        ],
      },

      /* {
        element: <AuthLayout />,       // Navbar minimalista + footer del AuthLayout
        children: [
          { path: '/login', element: <Login /> },
          { path: '/registro', element: <Register /> },
        ],
      },

      {
        path: '/cliente',
        element: (
          <ProtectedRoute rolesPermitidos={['cliente']}>
            <ClienteLayout />
          </ProtectedRoute>
        ),
        children: [{ index: true, element: <ClienteHome /> }],
      },

      {
        path: '/maker',
        element: (
          <ProtectedRoute rolesPermitidos={['maker']}>
            <MakerLayout />
          </ProtectedRoute>
        ),
        children: [{ index: true, element: <MakerHome /> }],
      }, */
    ],
  },
])

export default router