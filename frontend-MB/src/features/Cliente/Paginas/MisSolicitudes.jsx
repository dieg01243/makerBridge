import './MisSolicitudes.css'
// import ClienteLayout from '../layout/ClienteLayout.jsx'

function Solicitudes(props) {
  // const pedidos {props} = pedidos.props
  return (
    <ClienteLayout
      title="Mis solicitudes"
      accent=""
      description="Consultá el estado y los detalles de tus solicitudes de fabricación."
    >
      <div className='Solicitudes'>
        <div className='pedidos'>
        {/* Comienzo tarjeta */}
        <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
          <div className="md:flex">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full md:w-48"
                src="https://images.cults3d.com/lyn9McKVza9MhZRu6QL3uOCqBJs=/246x246/filters:no_upscale():format(webp)/https://fbi.cults3d.com/uploaders/27702084/illustration-file/d3e29006-0263-4627-837d-85bcbe03b313/Travel-Mug-Holding-1x1.jpg"
                alt="Modern building architecture"
              />
            </div>
            <div className="p-8">
              <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">Portavasos para latas de viaje</div>
              <a href="#" className="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
                Here is Travel can cup holder, This design lets you add a handle to your favourite drinks and cans, the design comes with 3 versions a small normal and large size the normal size fits standard cans 67mm.
              </a>
              <p className="mt-2 text-gray-500" />
            </div>
          </div>
        </div>

        <button className="btn-primary">Consultas</button>
        </div>
      </div>
    </ClienteLayout>
  )
}

export default Solicitudes
