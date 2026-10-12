import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from'@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    {
      name: 'full-reload',
      handleHotUpdate({server}) {
        server.ws.send({type: "full-reload"})
        return[]
      }
    }
  ],
})
