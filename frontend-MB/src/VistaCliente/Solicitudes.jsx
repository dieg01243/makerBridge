import'./Solicitudes.css'
import { detallePedidos } from './DetallePedidos'

function Solicitudes(props) {

  return(
    <div className='Solicitudes'>
      <div className='pedidos'>
        <h2>Mis solicitudes</h2>
        <detallePedidos />
        



        
        <button class="btn-primary">Consultas</button>
        
      </div>
    </div>
  )
}

export default Solicitudes