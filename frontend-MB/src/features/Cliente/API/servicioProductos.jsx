import axios from 'axios'


const URL_API_PRODUCTOS = 'https://6ad0e127addc5b5cb142759f.mockapi.io/productos'


// ---------------- crud: cRud : READ (http get) ---------------
export async function obtener() {
    
    const { data: productosLeidos } = await axios.get(URL_API_PRODUCTOS)
    return productosLeidos
}

// ---------------- crud: Crud : CREAT (http post)---------------
export function guardar(producto) {
    
}


// ---------------- crud: crUd : UPDATE (http out) ---------------
export function actualizarr(id, producto) {
    
}


// ---------------- crud: cruD ---------------
export function borrar(id) {
    
}