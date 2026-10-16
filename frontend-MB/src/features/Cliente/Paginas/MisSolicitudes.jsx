import { useState } from 'react';
import { Productos } from '../API/Productos';
import './MisSolicitudes.css'
import ClienteLayout from '../layout/ClienteLayout'
import TarjetaSolicitud from '../Componentes/TarjetaSolicitud'
// import OrderCard from '../../maker/components/OrderCard'
import Icon from '../../maker/components/Icon'
import FiltersSidebar from '../../maker/components/FiltersSidebar'




function Solicitudes() {
  // const pedidos {props} = pedidos.props
  const [materials, setMaterials] = useState([]);
  const [location, setLocation] = useState("all");

  const onToggleMaterial = (id) =>
  setMaterials((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]));
  const onClear = () => { setMaterials([]); setLocation("all"); };

  return (
    <ClienteLayout                                                 //se busco no inyectar el layout desde aqui, revisar el Router de Cliente
      title="Mis "
      accent="solicitudes"
      description="Consultá el estado y los detalles de tus solicitudes de impresion 3D, podes filtrarlo segun lo que estes buscando. Cualquier conmsulta estamos para ayudarte"
    >
      <div className="flex flex-col gap-6" >

        <div className="contents [--color-brand-primary:#568ea6] flex flex-col items-start gap-6 lg:flex-row">
          <FiltersSidebar
            materials={materials}
            location={location}
            onToggleMaterial={onToggleMaterial}
            onChangeLocation={setLocation}
            onClear={onClear}
          />
          {/* importacion productos de la API */}
          {/* <Productos /> */}
        
          <div className='flex min-w-0 flex-1 flex-col gap-6' >
            <Productos idUsuario={24} />
          </div>
        </div>
      </div>
      {/* <FiltersSidebar /> */}

      <Icon />
      
    </ClienteLayout>
    



  )
}

export default Solicitudes
