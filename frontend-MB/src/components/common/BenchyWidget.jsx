import { useEffect, useRef, useState } from 'react'
import usoChatBenchy from '../../api/apiChatBenchy'
import capitanBenchy from '../../assets/capitan-benchy2.png'

const WELCOME_TEXT =
  '¡Buenas! Soy Benchy ⚓. Estoy para darte una mano con tus impresiones o si querés sumarte a la red como Maker o Cliente. Contame, ¿qué tenés en mente imprimir hoy?'

function BenchyAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-amber-100 p-0">
      <img src={capitanBenchy} alt="" className="h-full w-full object-contain" />
    </div>
  )
}

export default function BenchyWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, typing, send, reset } = usoChatBenchy()

  const rootRef = useRef(null)
  const listRef = useRef(null)


  // Cerrar al hacer click fuera o con Escape
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Scroll automático al final
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, typing, open])

    const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || typing) return
    send(input)
    setInput('')
  }

  return (
    <aside ref={rootRef} aria-label="Asistente virtual" className="fixed bottom-5 right-5 z-40">
      {open ? (
        <>
          {/* Círculo (solo imagen) */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar chat con Capitán Benchy"
            className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-stone-200/90 bg-amber-100 p-0 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <img src={capitanBenchy} alt="" className="h-full w-full object-contain" />
          </button>

          {/* Ventana del chat */}
          <section
            role="dialog"
            aria-label="Chat con Capitán Benchy"
            className="fixed bottom-24 left-5 right-5 flex max-h-[min(600px,calc(100vh-8rem))] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:bottom-5 sm:left-auto sm:right-24 sm:w-100 sm:max-h-[min(600px,calc(100vh-2.5rem))]"
          >
            <header className="flex items-center justify-between gap-3 bg-brand-primary p-4 text-white shadow-md">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-12 w-12 shrink-0">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full overflow-hidden bg-white p-0">
                    <img src={capitanBenchy} alt="Capitán Benchy" className="h-full w-full object-contain" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-base font-bold">Capitán Benchy</span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase">
                      3D
                    </span>
                  </div>
                  <p className="truncate text-xs text-white/90">Especialista en piezas 3D • MakerBridge</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={reset}
                  title="Reiniciar chat"
                  aria-label="Reiniciar chat"
                  className="rounded-lg p-1.5 hover:bg-white/10"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-3-6.7" />
                    <path d="M21 4v5h-5" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  title="Minimizar"
                  aria-label="Minimizar chat"
                  className="rounded-lg p-1.5 hover:bg-white/10"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14" />
                  </svg>
                </button>
              </div>
            </header>

            {/* Mensajes */}
            <div ref={listRef} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-stone-50 p-4">
              {/* Saludo fijo: se muestra, pero NO se manda al backend */}
              <div className="flex items-start gap-2">
                <BenchyAvatar />
                <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-white p-3 text-sm leading-relaxed text-slate-800 shadow-sm">
                  {WELCOME_TEXT}
                </p>
              </div>

              {messages.map((m, i) =>
                m.role === 'user' ? (
                  <div key={i} className="flex justify-end">
                    <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-sm bg-brand-primary p-3 text-sm leading-relaxed text-white shadow-sm">
                      {m.content}
                    </p>
                  </div>
                ) : (
                  <div key={i} className="flex items-start gap-2">
                    <BenchyAvatar />
                    <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-sm bg-white p-3 text-sm leading-relaxed text-slate-800 shadow-sm">
                      {m.content}
                    </p>
                  </div>
                )
              )}

              {typing && (
                <div className="flex items-center gap-2 pl-10 text-xs text-slate-500" aria-live="polite">
                  <span className="h-2 w-2 animate-ping rounded-full bg-brand-primary" />
                  Benchy está escribiendo...
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-stone-200 bg-white p-3">
              <div className="flex items-center gap-2 rounded-xl bg-stone-100 p-1.5 pl-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribile a Benchy..."
                  aria-label="Mensaje"
                  autoComplete="off"
                  disabled={typing}
                  className="w-full border-0 bg-transparent py-1.5 text-sm text-slate-800 shadow-none outline-hidden ring-0 placeholder:text-slate-400 focus:border-0 focus:shadow-none focus:outline-hidden focus:ring-0"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Enviar mensaje"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md transition active:scale-95 disabled:opacity-50"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22l-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </form>
          </section>
        </>
      ) : (
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -top-12 right-0 flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-md motion-safe:animate-bounce"
          >
            <span>¡Hola! ¿Necesitas ayuda?</span>
            <span className="text-sm">👋</span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir chat con Capitán Benchy"
            className="flex items-center gap-3 rounded-full border border-stone-200/90 bg-white px-2 py-1 text-left shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-amber-100 p-0">
              <img src={capitanBenchy} alt="" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col pr-1">
              <span className="text-sm font-bold leading-tight text-slate-900">Capitán Benchy</span>
              <span className="flex items-center gap-1 text-xs text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                En línea
              </span>
            </div>
          </button>
        </div>
      )}
    </aside>
  )
}
