import { useState } from 'react';
import DatosPersonales from '../Componentes/DatosPersonales.jsx';
import DatosUsuario from '../Componentes/DatosUsuarios.jsx';
import FotoDePerfil from '../Componentes/FotoDePerfil.jsx';
import ClienteLayout from '../layout/ClienteLayout.jsx';
import './PerfilPrivado.css';

const USER = {
  id: 'MB-2026-0842',
  iniciales: 'ML',
  nombre: 'María López',
  tipo: 'Cliente particular',
  verificado: true,
  nivel: 'Cliente frecuente',
  email: 'maria.lopez@email.com',
  telefono: '+54 9 11 4567-8901',
  localidad: 'Córdoba',
  direccion: 'Av. Colón 1234',
  codigoPostal: '5000',
  notifWhatsapp: true,
  notifEmail: true,
  estado: 'Activa',
  penalizaciones: 'Sin penalizaciones',
  rol: 'Cliente',
  fechaRegistro: '14/03/2025',
};

function PerfilPrivado() {
  const [avisoGuardado, setAvisoGuardado] = useState(false);

  return (
    <div className="perfil-privado-page">
      <ClienteLayout
        user={USER}
        title="Mi"
        accent="perfil"
        description="En esta sección vas a poder modificar tus datos personales. ¡Cualquier consulta estamos para ayudarte!"
      >
        {avisoGuardado && (
          <p
            className="mb-6 rounded-2xl border border-brand-border-subtle bg-white px-5 py-4 text-sm font-medium text-brand-dark-muted shadow-card"
            role="status"
          >
            Los cambios se actualizaron en esta vista de demostración. Todavía no se
            guardan en un servidor.
          </p>
        )}

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.8fr)] lg:gap-8">
          <aside className="space-y-6" aria-label="Resumen de la cuenta">
            <FotoDePerfil user={USER} />
            <DatosUsuario user={USER} />
          </aside>

          <section aria-label="Información personal">
            <DatosPersonales
              user={USER}
              onSave={() => setAvisoGuardado(true)}
            />
          </section>
        </div>
      </ClienteLayout>
    </div>
  );
}

export default PerfilPrivado;
