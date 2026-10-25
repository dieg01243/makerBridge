import { Fragment, useEffect, useMemo, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Textos según el rol de quien mira la pantalla                             */
/* -------------------------------------------------------------------------- */

const COPY = {
  maker: {
    subtitle:
      "Comunicate directamente con los clientes de cada pedido para coordinar detalles técnicos de impresión, colores, entregas y tiempos de entrega.",
    searchPlaceholder: "Buscar por cliente, #MK-..., o palabra clave...",
    orderButton: "Ver Ficha de Pedido",
    empty: "No hay conversaciones que coincidan con tu búsqueda.",
  },
  client: {
    subtitle:
      "Hablá directamente con los makers que fabrican tus pedidos para resolver dudas sobre materiales, avances de impresión y entrega.",
    searchPlaceholder: "Buscar por maker, #MK-..., o palabra clave...",
    orderButton: "Ver Mi Pedido",
    empty: "No hay conversaciones que coincidan con tu búsqueda.",
  },
};

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "unread", label: "No leídos" },
  { id: "in_progress", label: "Pedidos en curso" },
  { id: "completed", label: "Finalizados" },
];

const STATUS_TONES = {
  printing: "bg-brand-accentYellowLight text-brand-dark",
  waiting: "bg-surface-cardMuted text-brand-graySub",
  shipping: "bg-brand-accentBlueLight text-brand-accentBlue font-semibold",
  review: "bg-surface-cardMuted text-brand-graySub",
  done: "bg-surface-cardMuted text-brand-graySub",
};

/* -------------------------------------------------------------------------- */
/*  Datos de ejemplo (reemplazar por tu API / store)                          */
/*                                                                            */
/*  Cada conversación tiene UN maker y UN cliente. La pantalla muestra solo   */
/*  las conversaciones donde participa el usuario actual, y como "otra        */
/*  persona" siempre aparece la contraparte.                                  */
/*  `unread` es por rol: cuántos mensajes sin leer tiene cada lado.           */
/* -------------------------------------------------------------------------- */

// Helpers solo para generar datos de ejemplo con fechas reales.
// En producción cada mensaje debe venir con su `createdAt` (ISO 8601) desde tu API.
const ago = (minutes) => new Date(Date.now() - minutes * 60000).toISOString();
const at = (daysAgo, hour, minute) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

const P = {
  carlos: { id: "u-carlos", name: "Carlos Duarte", initials: "CD", tone: "bg-brand-primary text-white", online: true },
  martin: { id: "u-martin", name: "Martín Palermo", initials: "MP", tone: "bg-brand-lightBg text-brand-primary", online: true },
  lucia: { id: "u-lucia", name: "Lucía Varela", initials: "LV", tone: "bg-brand-accentBlueLight text-brand-accentBlue", online: true },
  carlosL: { id: "u-carlosl", name: "Carlos López", initials: "CL", tone: "bg-surface-cardMuted text-brand-dark", online: false },
  sofia: { id: "u-sofia", name: "Sofía Benítez", initials: "SB", tone: "bg-brand-borderTone text-brand-dark", online: true },
  diego: { id: "u-diego", name: "Diego Ramos", initials: "DR", tone: "bg-surface-cardMuted text-brand-dark", online: false },
  hexa: { id: "u-hexa", name: "Taller Hexa 3D", initials: "TH", tone: "bg-brand-accentYellowLight text-brand-dark", online: true },
  nube: { id: "u-nube", name: "Nube Maker Lab", initials: "NM", tone: "bg-brand-accentBlueLight text-brand-accentBlue", online: false },
};

export const MOCK_CHATS = [
  {
    id: 1,
    maker: P.carlos,
    client: P.martin,
    orderCode: "#MK-9510",
    orderTitle: "Engranaje Helicoidal",
    orderFullTitle: "Engranaje cónico helicoidal",
    orderSpecs: "Tolerancia requerida: ±0.15mm • Infill 100%",
    material: "Nylon PA12",
    quantity: "3 un.",
    delivery: "26 Feb",
    status: "printing",
    statusLabel: "En impresión 45%",
    group: "in_progress",
    unread: { maker: 0, client: 0 },
    messages: [
      { id: 1, from: "client", text: "Hola Carlos, te consulto sobre el pedido #MK-9510. ¿Llegás bien con la fecha del 26 de febrero para las 3 piezas?", createdAt: ago(145) },
      { id: 2, from: "maker", text: "Hola Martín! Sí, ya tengo el archivo STL revisado sin errores de malla. Voy a usar Nylon PA12 con relleno al 100% como solicitaste para máxima resistencia al desgaste.", createdAt: ago(140), read: true },
      { id: 3, from: "client", text: "Excelente. ¿El acabado mate queda uniforme en ese material? Lo necesito para un engranaje de reductor.", createdAt: ago(137), read: true },
      { id: 4, from: "maker", text: "Exacto, queda un gris oscuro con textura mate técnica muy resistente a fricción interna. Te voy a ir enviando fotos apenas termine la primera capa en la cama de impresión.", createdAt: ago(134), read: true },
      { id: 5, from: "client", text: "Perfecto Carlos, muchas gracias! Quedo atento a las actualizaciones por acá.", createdAt: ago(15), read: true },
    ],
  },
  {
    id: 2,
    maker: P.carlos,
    client: P.lucia,
    orderCode: "#MK-9518",
    orderTitle: "Carcasa Drone FPV",
    orderFullTitle: "Carcasa Drone FPV",
    material: "PETG",
    quantity: "1 un.",
    delivery: "02 Mar",
    status: "waiting",
    statusLabel: "Esperando confirmación",
    group: "in_progress",
    unread: { maker: 1, client: 0 },
    messages: [
      { id: 1, from: "client", text: "Hola Carlos, ¿podrías hacerlo en PETG negro mate?", createdAt: ago(30), read: false },
    ],
  },
  {
    id: 3,
    maker: P.carlos,
    client: P.carlosL,
    orderCode: "#MK-9402",
    orderTitle: "Soporte Dinámico",
    orderFullTitle: "Soporte dinámico",
    material: "PLA+",
    quantity: "2 un.",
    delivery: "21 Feb",
    status: "shipping",
    statusLabel: "Por despachar",
    group: "in_progress",
    unread: { maker: 0, client: 0 },
    messages: [
      { id: 1, from: "maker", text: "Confirmado, pasá a retirar o despachá por Andreani.", createdAt: at(1, 17, 20), read: true },
    ],
  },
  {
    id: 4,
    maker: P.carlos,
    client: P.sofia,
    orderCode: "#MK-9388",
    orderTitle: "Prototipo Carátula Médica",
    orderFullTitle: "Prototipo carátula médica",
    material: "Resina SLA",
    quantity: "1 un.",
    delivery: "28 Feb",
    status: "review",
    statusLabel: "Revisión de Archivo",
    group: "in_progress",
    unread: { maker: 1, client: 0 },
    messages: [
      { id: 1, from: "client", text: "¿Es biocompatible la resina que vas a utilizar?", createdAt: at(1, 15, 5), read: false },
    ],
  },
  {
    id: 5,
    maker: P.carlos,
    client: P.diego,
    orderCode: "#MK-9210",
    orderTitle: "Set 10 Miniaturas RPG",
    orderFullTitle: "Set 10 miniaturas RPG",
    material: "Resina SLA",
    quantity: "10 un.",
    delivery: "15 Feb",
    status: "done",
    statusLabel: "Finalizado con éxito",
    group: "completed",
    unread: { maker: 0, client: 0 },
    messages: [
      { id: 1, from: "client", text: "Llegaron de diez las piezas, ya califiqué 5 estrellas.", createdAt: at(8, 12, 0), read: true },
    ],
  },
  // Martín (cliente) también habla con otros makers
  {
    id: 6,
    maker: P.hexa,
    client: P.martin,
    orderCode: "#MK-9533",
    orderTitle: "Soporte Sensor",
    orderFullTitle: "Soporte para sensor de proximidad",
    material: "ABS",
    quantity: "5 un.",
    delivery: "01 Mar",
    status: "review",
    statusLabel: "Revisión de Archivo",
    group: "in_progress",
    unread: { maker: 0, client: 1 },
    messages: [
      { id: 1, from: "client", text: "Hola! Adjunté el STL del soporte, ¿lo podés revisar?", createdAt: at(1, 18, 10), read: true },
      { id: 2, from: "maker", text: "Lo vi, hay un voladizo que conviene apoyar. Te propongo girar la pieza 90° y usar soportes de árbol.", createdAt: ago(90), read: false },
    ],
  },
  {
    id: 7,
    maker: P.nube,
    client: P.martin,
    orderCode: "#MK-9101",
    orderTitle: "Prototipo Carcasa",
    orderFullTitle: "Prototipo de carcasa electrónica",
    material: "PLA",
    quantity: "2 un.",
    delivery: "30 Ene",
    status: "done",
    statusLabel: "Finalizado con éxito",
    group: "completed",
    unread: { maker: 0, client: 0 },
    messages: [
      { id: 1, from: "maker", text: "Entregado! Cualquier ajuste me avisás por acá.", createdAt: at(20, 16, 0), read: true },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const otherRole = (role) => (role === "maker" ? "client" : "maker");

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const dayDiff = (date, now = new Date()) =>
  Math.round((startOfDay(now) - startOfDay(date)) / 86400000);

// "10:14 hs"
const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }) + " hs";

// Separador de día dentro del chat: "Hoy", "Ayer", "18 de febrero", "18 de febrero de 2025"
const formatDayLabel = (iso) => {
  const date = new Date(iso);
  const diff = dayDiff(date);
  if (diff === 0) return "Hoy";
  if (diff === 1) return "Ayer";
  const sameYear = date.getFullYear() === new Date().getFullYear();
  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    ...(sameYear ? {} : { year: "numeric" }),
  });
};

// Fecha corta de la bandeja: "Ahora", "Hace 15 min", "11:42 hs", "Ayer", "18 feb"
const formatListTime = (iso) => {
  const date = new Date(iso);
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return "Ahora";
  if (minutes < 60) return `Hace ${minutes} min`;
  const diff = dayDiff(date);
  if (diff === 0) return formatTime(iso);
  if (diff === 1) return "Ayer";
  const sameYear = date.getFullYear() === new Date().getFullYear();
  return date
    .toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short",
      ...(sameYear ? {} : { year: "numeric" }),
    })
    .replace(".", "");
};

// Agrupa los mensajes por día calendario (en la zona horaria del usuario)
const groupByDay = (messages) => {
  const groups = [];
  messages.forEach((m) => {
    const d = new Date(m.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.items.push(m);
    else groups.push({ key, label: formatDayLabel(m.createdAt), items: [m] });
  });
  return groups;
};

const lastActivity = (chat) =>
  new Date(chat.messages[chat.messages.length - 1].createdAt).getTime();

/* -------------------------------------------------------------------------- */
/*  Subcomponentes                                                            */
/* -------------------------------------------------------------------------- */

function Icon({ name, className = "" }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
}

function Avatar({ person, size = "w-11 h-11", text = "text-lg", showStatus = false }) {
  return (
    <div className="relative shrink-0">
      <div className={`${size} ${person.tone} ${text} rounded-full flex items-center justify-center font-bold`}>
        {person.initials}
      </div>
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-surface-card ${
            person.online ? "bg-emerald-500" : "bg-brand-graySub/50"
          }`}
        />
      )}
    </div>
  );
}

function FilterBar({ active, onChange, unreadCount, totalCount, query, onQuery, placeholder }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
      <div className="lg:col-span-5 relative">
        <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-graySub text-[20px]" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-card text-brand-dark text-[13px] shadow-warm-sm placeholder:text-brand-graySub/70 border-0 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all"
        />
      </div>

      <div className="lg:col-span-7 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const isActive = active === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange(f.id)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold tracking-wide shadow-warm-sm transition-all flex items-center gap-1.5 ${
                isActive ? "bg-brand-primary text-white" : "bg-surface-card text-brand-graySub hover:text-brand-dark"
              }`}
            >
              {f.label}
              {f.id === "all" && ` (${totalCount})`}
              {f.id === "unread" && unreadCount > 0 && (
                <span
                  className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                    isActive ? "bg-white text-brand-primary" : "bg-brand-primary text-white"
                  }`}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ChatListItem({ chat, counterpart, unread, active, onSelect }) {
  const hasUnread = unread > 0;
  const isCompleted = chat.group === "completed";
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <button
      type="button"
      onClick={() => onSelect(chat.id)}
      className={`text-left cursor-pointer p-2 md:p-3.5 rounded-2xl bg-surface-card transition-all relative overflow-hidden ${
        active ? "shadow-warm-md" : "shadow-warm-sm hover:bg-surface-cardMuted"
      } ${isCompleted && !active ? "opacity-85" : ""}`}
    >
      {active && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-primary" />}

      <div className={`flex items-start justify-center md:justify-start gap-3 ${active ? "md:pl-1" : ""}`}>
        <div className="relative shrink-0">
          <Avatar person={counterpart} showStatus />
          {hasUnread && (
            <span className="md:hidden absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-primary text-white font-mono text-[10px] flex items-center justify-center font-bold ring-2 ring-surface-card">
              {unread}
            </span>
          )}
        </div>

        <div className="hidden md:flex flex-col flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[18px] leading-6.5 font-bold text-brand-dark truncate">{counterpart.name}</span>
            <span className={`font-mono text-[10px] shrink-0 ${active ? "text-brand-primary font-semibold" : "text-brand-graySub"}`}>
              {formatListTime(lastMessage.createdAt)}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2 py-0.5 rounded-md font-mono text-[10px] truncate ${
                active ? "bg-surface-cardMuted text-brand-dark font-semibold" : "bg-surface-cardMuted/70 text-brand-graySub"
              }`}
            >
              {chat.orderCode}: {chat.orderTitle}
            </span>
          </div>

          <p
            className={`text-[13px] mt-1.5 truncate ${
              hasUnread ? "text-brand-dark font-semibold" : active ? "text-brand-dark font-medium" : "text-brand-graySub"
            }`}
          >
            {lastMessage.text}
          </p>

          <div className="mt-2.5 flex items-center justify-between gap-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] ${STATUS_TONES[chat.status]}`}>
              {chat.status === "printing" && <span className="w-1.5 h-1.5 rounded-full bg-brand-accentYellow" />}
              {chat.statusLabel}
            </span>

            {hasUnread ? (
              <span className="w-5 h-5 rounded-full bg-brand-primary text-white font-mono text-[10px] flex items-center justify-center font-bold">
                {unread}
              </span>
            ) : isCompleted ? (
              <Icon name="verified" className="text-[16px] text-emerald-500" />
            ) : (
              <Icon name="done_all" className={`text-[16px] ${active ? "text-brand-primary" : "text-brand-graySub"}`} />
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function ChatHeader({ chat, counterpart, orderButtonLabel, onViewOrder }) {
  return (
    <div className="p-3 md:p-5 bg-surface-cardMuted/70 flex flex-col gap-3.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <Avatar person={counterpart} size="w-12 h-12" showStatus />
          <span className="text-xl font-bold text-brand-dark">{counterpart.name}</span>
        </div>

        <button
          type="button"
          onClick={() => onViewOrder?.(chat)}
          className="px-4 py-2 rounded-xl bg-surface-cardMuted text-brand-dark font-mono text-xs font-semibold tracking-wide hover:bg-surface-border transition-colors flex items-center gap-2"
        >
          <Icon name="receipt_long" className="text-[18px]" />
          {orderButtonLabel}
        </button>
      </div>

      <div className="p-3.5 rounded-2xl bg-surface-card flex flex-wrap items-center justify-between gap-3 shadow-warm-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-brand-lightBg flex items-center justify-center text-brand-primary shrink-0">
            <Icon name="precision_manufacturing" className="text-[18px]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-xs font-bold text-brand-dark truncate">
              Pedido {chat.orderCode} • {chat.orderFullTitle}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-brand-dark">
          {[
            ["Material", chat.material],
            ["Cant", chat.quantity],
            ["Entrega", chat.delivery],
          ].map(([label, value]) => (
            <div key={label} className="px-2.5 py-1 rounded-lg bg-surface-cardMuted font-mono text-[10px] font-medium">
              {label}: <strong className="font-bold">{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message, chat, viewerRole }) {
  const isMine = message.from === viewerRole;
  const sender = message.from === "maker" ? chat.maker : chat.client;

  return (
    <div className={`flex items-start gap-2 md:gap-3 max-w-[92%] md:max-w-[85%] ${isMine ? "self-end flex-row-reverse" : ""}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-1 ${
          isMine ? "bg-brand-primary text-white" : sender.tone
        }`}
      >
        {sender.initials}
      </div>

      <div className={`flex flex-col gap-1 ${isMine ? "items-end" : ""}`}>
        <div
          className={`p-4 rounded-2xl ${
            isMine
              ? "rounded-tr-sm bg-brand-primary text-white shadow-warm-md"
              : "rounded-tl-sm bg-surface-card text-brand-dark shadow-warm-sm"
          }`}
        >
          <p className="text-[15px] leading-relaxed">{message.text}</p>
        </div>

        <div className={`flex items-center gap-1 ${isMine ? "pr-1" : "pl-1"}`}>
          <span className="font-mono text-[10px] text-brand-graySub">{formatTime(message.createdAt)}</span>
          {isMine && (
            <Icon name={message.read ? "done_all" : "done"} className="text-[14px] text-brand-primary" />
          )}
        </div>
      </div>
    </div>
  );
}

function MessageComposer({ recipient, onSend }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
  };

  return (
    <div className="p-3 md:p-5 bg-surface-card flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="flex flex-row items-center gap-2 md:gap-3 w-full">
        <div className="relative w-full">
          <input
            type="text"
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`Escribe un mensaje para ${recipient}...`}
            className="w-full pl-4 pr-10 py-3.5 rounded-2xl bg-surface-cardMuted text-brand-dark text-[15px] placeholder:text-brand-graySub/70 border-0 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 transition-all"
          />
          <Icon name="keyboard" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-graySub text-[20px] pointer-events-none" />
        </div>

        <button
          type="submit"
          className="px-4 sm:px-6 py-3.5 rounded-2xl bg-brand-primary hover:bg-brand-primaryHover text-white font-mono text-sm font-bold flex items-center justify-center gap-2 shrink-0 shadow-warm-md transition-all active:scale-95"
        >
          <span className="hidden sm:inline">Enviar Mensaje</span>
          <Icon name="send" className="text-[20px]" />
        </button>
      </form>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 font-mono text-[10px] text-brand-graySub">
        <span>
          Presioná{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-surface-cardMuted text-brand-dark text-[11px]">Enter</kbd>{" "}
          para enviar directamente.
        </span>
        <div className="flex items-center gap-1.5">
          <Icon name="lock" className="text-[16px] text-brand-accentYellow" />
          <span>Por seguridad de ambas partes mantené toda la comunicación dentro de MakerBridge.</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Página (misma vista para maker y cliente)                                 */
/*                                                                            */
/*  Props:                                                                    */
/*   - role:        "maker" | "client"  → qué lado de la conversación sos     */
/*   - currentUser: { id, ... }         → para filtrar tus conversaciones     */
/*   - chats:       lista completa (o ya filtrada por tu API)                 */
/*   - onViewOrder: (chat) => void      → navegar a la ficha del pedido       */
/* -------------------------------------------------------------------------- */

export default function MessagesPage({
  role = "maker",
  currentUser = P.carlos,
  chats: chatsProp = MOCK_CHATS,
  onViewOrder,
}) {
  const copy = COPY[role];
  const theirRole = otherRole(role);

  // Solo las conversaciones donde participa el usuario actual en ese rol
  const myChats = useMemo(
    () => chatsProp.filter((c) => c[role].id === currentUser.id),
    [chatsProp, role, currentUser.id]
  );

  const [chats, setChats] = useState(myChats);
  const [activeId, setActiveId] = useState(myChats[0]?.id ?? null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const messagesEndRef = useRef(null);

  // Si cambia el rol/usuario (o llegan datos nuevos), resetear
  useEffect(() => {
    setChats(myChats);
    setActiveId(myChats[0]?.id ?? null);
    setFilter("all");
    setQuery("");
  }, [myChats]);

  const activeChat = chats.find((c) => c.id === activeId);
  const unreadCount = chats.filter((c) => c.unread[role] > 0).length;

  const visibleChats = useMemo(() => {
    const term = query.trim().toLowerCase();
    return chats
      .filter((c) => {
      if (filter === "unread" && c.unread[role] === 0) return false;
      if (filter === "in_progress" && c.group !== "in_progress") return false;
      if (filter === "completed" && c.group !== "completed") return false;
      if (!term) return true;
      const haystack = [c[theirRole].name, c.orderCode, c.orderTitle, ...c.messages.map((m) => m.text)]
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
      })
      .sort((a, b) => lastActivity(b) - lastActivity(a));
  }, [chats, filter, query, role, theirRole]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [activeId, activeChat?.messages.length]);

  const handleSelect = (id) => {
    setActiveId(id);
    setChats((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              unread: { ...c.unread, [role]: 0 },
              // los mensajes de la contraparte pasan a leídos
              messages: c.messages.map((m) => (m.from === theirRole ? { ...m, read: true } : m)),
            }
          : c
      )
    );
  };

  const handleSend = (text) => {
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              unread: { ...c.unread, [theirRole]: c.unread[theirRole] + 1 },
              messages: [...c.messages, { id: c.messages.length + 1, from: role, text, createdAt: new Date().toISOString(), read: false }],
            }
          : c
      )
    );
    // TODO: enviar al backend / websocket
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-8 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-[32px] leading-10 font-bold tracking-tight text-brand-dark">
            Mis <span className="text-brand-primary">Mensajes</span>
          </h1>
          <p className="text-[15px] leading-6 text-brand-graySub mt-1.5 max-w-3xl">{copy.subtitle}</p>
        </div>

        <FilterBar
          active={filter}
          onChange={setFilter}
          unreadCount={unreadCount}
          totalCount={chats.length}
          query={query}
          onQuery={setQuery}
          placeholder={copy.searchPlaceholder}
        />
      </div>

      <div className="w-full grid grid-cols-12 gap-2 md:gap-6 items-start">
        <div className="col-span-3 md:col-span-4 flex flex-col gap-3 min-w-0">
          <div className="hidden md:flex items-center justify-between px-1">
            <span className="font-mono text-xs font-semibold text-brand-graySub uppercase tracking-wider">
              Bandeja de Entrada
            </span>
            <span className="font-mono text-[10px] text-brand-graySub">Ordenado por actividad</span>
          </div>

          <div className="flex flex-col gap-2.5 max-h-190 overflow-y-auto pr-1">
            {visibleChats.length === 0 ? (
              <p className="text-[13px] text-brand-graySub px-1 py-6 text-center">{copy.empty}</p>
            ) : (
              visibleChats.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  counterpart={chat[theirRole]}
                  unread={chat.unread[role]}
                  active={chat.id === activeId}
                  onSelect={handleSelect}
                />
              ))
            )}
          </div>
        </div>

        {activeChat && (
          <div className="col-span-9 md:col-span-8 min-w-0 flex flex-col rounded-3xl bg-surface-card shadow-warm-md overflow-hidden">
            <ChatHeader
              chat={activeChat}
              counterpart={activeChat[theirRole]}
              orderButtonLabel={copy.orderButton}
              onViewOrder={onViewOrder}
            />

            <div className="flex-1 p-3 md:p-6 flex flex-col gap-5 overflow-y-auto max-h-125 bg-surface-base/50">
              {groupByDay(activeChat.messages).map((group) => (
                <Fragment key={group.key}>
                  <div className="flex items-center justify-center my-2">
                    <span className="px-3.5 py-1 rounded-full bg-surface-cardMuted text-brand-graySub font-mono text-[10px]">
                      {group.label}
                    </span>
                  </div>

                  {group.items.map((m) => (
                    <MessageBubble key={m.id} message={m} chat={activeChat} viewerRole={role} />
                  ))}
                </Fragment>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <MessageComposer recipient={activeChat[theirRole].name} onSend={handleSend} />
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Wrappers opcionales para usar en cada ruta                                */
/* -------------------------------------------------------------------------- */

export const MakerMessages = (props) => <MessagesPage role="maker" {...props} />;
export const ClientMessages = (props) => <MessagesPage role="client" {...props} />;