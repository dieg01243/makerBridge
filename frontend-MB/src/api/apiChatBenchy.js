import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import client from './apiClient'

const ERROR_TEXT = 'No pude conectarme con el servidor. Probá de nuevo.'

export default function useBenchyChat() {
  const [messages, setMessages] = useState([]) // solo { role: 'user' | 'assistant', content }
  const [typing, setTyping] = useState(false)
  const abortRef = useRef(null)

  // Cancelar pedido en curso al cerrar el chat
  useEffect(() => () => abortRef.current?.abort(), [])

  const send = async (content) => {
    const text = content.trim()
    if (!text || typing) return

    const next = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setTyping(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const { data } = await client.post(
        '/chatbot/',
        { messages: next },
        { signal: controller.signal }
      )
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch (err) {
      if (axios.isCancel(err)) return
      setMessages((m) => [...m, { role: 'assistant', content: ERROR_TEXT }])
    } finally {
      if (abortRef.current === controller) setTyping(false)
    }
  }

  const reset = () => {
    abortRef.current?.abort()
    setTyping(false)
    setMessages([])
  }

  return { messages, typing, send, reset }
}