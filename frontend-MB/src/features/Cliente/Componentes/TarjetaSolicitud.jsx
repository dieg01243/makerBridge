
import './TarjetaSolicitud.css'

/* export const Tarjeta = props => {



  return(

  )
} */


function TarjetaSolicitud() {

  return(

          <div className='Solicitudes' >
            <div className='pedidos'>
            {/* Comienzo tarjeta */}
              <div className="overflow-hidden rounded-xl bg-white shadow-md w-full ">
                <div className="md:flex flex flex-col ">
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
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque voluptates distinctio deleniti rem eaque, in qui tempora, nostrum numquam cupiditate voluptatem maiores enim tempore incidunt ullam quo, animi aliquam nam.
                    </a>
                    <p className="mt-2 text-gray-500" />
                  </div>
                </div>
              </div>
              
              
              
              {/* <OrderCard /> */}

              {/* <button className="btn-primary">Consultas</button> */}
            </div>
          </div>
          
      )

      }

      export default TarjetaSolicitud
