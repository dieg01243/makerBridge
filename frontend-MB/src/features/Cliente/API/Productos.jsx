import { useEffect, useState } from 'react'
import './Productos.css'
import * as servicioProductos from '../API/servicioProductos'


const productos = servicioProductos.obtener()
console.log(productos)

export function Productos(props) {
    const { titulo } = props
    const [ productos, setProductos ] = useState([])


    useEffect(() => {
        console.log('Api productos montado')

        async function pedir() {
            try {
                const productos = await servicioProductos.obtener()
                console.log(productos)
                setProductos(productos)
            } catch (error) {
                console.error('Error al cargar productos', error)
            }
        }

        pedir()

        return () => console.log('Api Productos desmontado')
    }, [])


    return(
        <div className=''>
            <div className=''>
                <div className='body'>



                </div>
            </div>
        </div>
    )
}