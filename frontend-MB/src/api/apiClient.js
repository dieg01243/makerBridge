import axios from 'axios'

// Centralizamos la creación del cliente aquí
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api',
})

export default apiClient;