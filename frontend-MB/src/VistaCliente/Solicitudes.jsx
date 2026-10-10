function StatusBadge({ status }) {
  const styles = {
    progress: {
      wrapper:
        'bg-amber-50 text-amber-800 border-amber-200',
      dot: 'bg-amber-500 animate-pulse',
    },
    queue: {
      wrapper: 'bg-blue-50 text-brand-blue-dark border-blue-200',
      dot: 'bg-brand-blue',
    },
    ready: {
      wrapper: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dot: 'bg-emerald-500',
    },
  };

  const s = styles[status.type] || styles.queue;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${s.wrapper}`}
    >
      <span className={`w-2 h-2 rounded-full ${s.dot}`}></span>
      {status.label}
    </span>
  );
}

function PreviewThumbnail({ order }) {
  if (order.image) {
    return (
      <div className="w-full md:w-56 h-56 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0 relative group shadow-sm">
        <img
          alt={order.title}
          src={order.image}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
        />
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-mono tracking-wider font-semibold">
          {order.imageOverlay}
        </div>
      </div>
    );
  }

  const isReady = order.status.type === 'ready';
  const isQueue = order.status.type === 'queue';

  return (
    <div
      className={`w-full md:w-56 h-56 rounded-2xl overflow-hidden flex flex-col items-center justify-center text-white shrink-0 relative group shadow-sm border ${
        isReady
          ? 'bg-brand-blue border-brand-blue-dark'
          : isQueue
          ? 'bg-brand-blue/90 border-brand-blue-dark'
          : 'bg-brand-blue border-brand-blue-dark'
      }`}
    >
      <svg
        className="w-16 h-16 opacity-90 group-hover:scale-110 transition duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {isReady ? (
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        ) : (
          <path
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
          />
        )}
      </svg>
      <span className="text-xs font-mono font-bold mt-2 tracking-wider uppercase">
        {order.iconPreview}
      </span>
      <div
        className={`absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded backdrop-blur-md text-white text-[10px] font-mono tracking-wider ${
          isReady ? 'bg-emerald-700/80 font-semibold' : 'bg-black/40'
        }`}
      >
        {order.imageOverlay}
      </div>
    </div>
  );
}

function SpecsGrid({ specs }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs text-brand-slate">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="bg-white/80 p-2 rounded-lg border border-stone-200/40"
        >
          <span className="block text-brand-muted text-[10px] uppercase font-semibold">
            {spec.label}
          </span>
          <span
            className={`font-bold truncate block ${
              spec.green
                ? 'text-emerald-700'
                : spec.highlight
                ? 'text-brand-blue-dark'
                : 'text-stone-800'
            }`}
          >
            {spec.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function SectionBlock({ section }) {
  const isProgress = section.type === 'progress';
  const isText = section.type === 'text';

  const badgeStyles = {
    progress: 'bg-white/70 border-stone-200/50',
    text: 'bg-white/80 border-stone-200/50',
  };

  return (
    <div className="bg-brand-sage-light/75 border border-brand-sage/60 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${section.dotColor}`}></span>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
            {section.title}
          </span>
        </div>
        <span
          className={`text-xs font-semibold text-stone-700 px-2 py-0.5 rounded-md border ${
            badgeStyles[section.type] || 'bg-white/70 border-stone-200/50'
          }`}
        >
          {section.badge}
        </span>
      </div>

      {isProgress && (
        <div className="space-y-1">
          <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-brand-sage/40">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all"
              style={{ width: `${section.progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-brand-muted font-medium">
            <span>{section.timeLeft}</span>
            <span>{section.timeRemaining}</span>
          </div>
        </div>
      )}

      {isText && (
        <p className="text-xs text-stone-700 leading-relaxed bg-white/40 p-2.5 rounded-lg border border-stone-200/30">
          {section.text}
        </p>
      )}
    </div>
  );
}

function ActionButtons({ actions }) {
  const chatBtn = (
    <button
      key="chat"
      className="py-2.5 px-4 rounded-xl border border-stone-300 text-xs font-bold text-brand-slate bg-stone-50 hover:bg-stone-100 flex items-center justify-center gap-2 transition"
    >
      <svg
        className="w-4 h-4 text-brand-blue"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      Chat con Maker
    </button>
  );

  const detailsBtn = (
    <button
      key="details"
      className="py-2.5 px-5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-xs font-bold text-white flex items-center justify-center gap-2 shadow-sm transition"
    >
      Ver detalles completos
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9 5l7 7-7 7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );

  const trackBtn = (
    <button
      key="track"
      className="py-2.5 px-4 rounded-xl border border-stone-300 text-xs font-bold text-brand-slate bg-stone-50 hover:bg-stone-100 flex items-center justify-center gap-2 transition"
    >
      <svg
        className="w-4 h-4 text-stone-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      Rastrear envío
    </button>
  );

  const confirmBtn = (
    <button
      key="confirm"
      className="py-2.5 px-5 rounded-xl bg-brand-coral hover:bg-brand-coral-hover text-xs font-bold text-white flex items-center justify-center gap-2 shadow-sm transition"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M5 13l4 4L19 7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </svg>
      Confirmar Recepción
    </button>
  );

  const map = { chat: chatBtn, details: detailsBtn, track: trackBtn, confirm: confirmBtn };

  return (
    <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-stone-100">
      {actions.map((a) => map[a])}
    </div>
  );
}

export default function OrderCard({ order }) {
  return (
    <article className="bg-brand-card rounded-2xl border border-stone-200/90 shadow-soft hover:shadow-card transition-all duration-200 overflow-hidden">
      {/* Top bar */}
      <div className="px-6 py-3 bg-stone-50/80 border-b border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-stone-700 tracking-tight">
            PEDIDO {order.id}
          </span>
          <span className="text-stone-300">|</span>
          <span className="text-brand-muted">Solicitado el {order.date}</span>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <PreviewThumbnail order={order} />

          <div className="flex-1 min-w-0 space-y-4 w-full">
            {/* Title + Maker + Price */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-brand-slate leading-snug">
                  {order.title}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-brand-muted">
                  <span>Maker asignado:</span>
                  <div className="flex items-center gap-1.5 font-medium text-brand-slate bg-stone-100 px-2 py-0.5 rounded-lg border border-stone-200/60">
                    <span
                      className={`w-4 h-4 rounded-full ${order.maker.color} text-white flex items-center justify-center text-[9px] font-bold`}
                    >
                      {order.maker.initials}
                    </span>
                    <span>{order.maker.name}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-brand-muted block font-medium">
                  Presupuesto total
                </span>
                <div className="text-2xl font-black text-brand-coral">
                  {order.price}
                </div>
              </div>
            </div>

            <SectionBlock section={order.section} />
            <SpecsGrid specs={order.specs} />
            <ActionButtons actions={order.actions} />
          </div>
        </div>
      </div>
    </article>
  );
}