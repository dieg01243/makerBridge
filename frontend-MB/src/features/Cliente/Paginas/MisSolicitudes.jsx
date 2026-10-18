import { useState } from 'react';
import { Productos } from '../API/Productos';
import './MisSolicitudes.css'
import FiltersSidebar from '../../maker/components/FiltersSidebar'
import Header from '../layout/Header'

function Solicitudes() {

  const [materials, setMaterials] = useState([]);
  const [location, setLocation] = useState("all");

  const onToggleMaterial = (id) =>
  setMaterials((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]));
  const onClear = () => { setMaterials([]); setLocation("all"); };

  return (
        
        <>
        <Header 
        title='Mis'
        accent='solicitudes'
        description='En esta seccion vas a poder visualizar aquellos pedidos que estan en la espera de ser tomados por un maker. ¡Revisa las distintas cotizaciones que te ofrecen los miembros de nuestra comunidad!'/>
        <div className="contents [--color-brand-primary:#568ea6] flex flex-col items-start gap-6 lg:flex-row flex flex-col gap-6">
        
          <FiltersSidebar
            materials={materials}
            location={location}
            onToggleMaterial={onToggleMaterial}
            onChangeLocation={setLocation}
            onClear={onClear}
          />
          <div className='flex min-w-0 flex-1 flex-col gap-6' >
            <Productos idUsuario={24} />
          </div>
          
        </div>
        </>
  )
}

export default Solicitudes
