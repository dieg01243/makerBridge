import { useState } from "react";
import "./ComoFuncionaLanding.css";

const BADGES = [
  { ico: "🛡", title: "Mercado Pago", sub: "Tu dinero protegido, 100%" },
  { ico: "⚡", title: "Presupuesto veloz", sub: "Ofertas en menos de 2h" },
  { ico: "🚚", title: "Logística coordinada", sub: "Envío directo a tu casa" },
];

const STEPS = [
  {
    n: "01",
    ico: "⬡",
    title: "Subí o buscá tu pieza",
    text: "¿Tenés tu modelo 3D o imagen de lo que querés? Subilo directo. ¿Sin idea? Podés solicitar un diseño a medida.",
    foot: "Inspección dimensional automática",
    thumb: "STL · 3MF · STEP",
  },
  {
    n: "02",
    ico: "≡",
    title: "Configurá y recibí ofertas",
    text: "Seleccioná material, color, cantidad y plazo. Los talleres certificados te enviarán presupuestos en minutos.",
    foot: "Múltiples opciones y presupuestos",
    thumb: "PLA / PETG / Resina",
  },
  {
    n: "03",
    ico: "✔",
    title: "Elegí tu Maker y pagá seguro",
    text: "Compará reputación, fotos de trabajos previos y plazos. El pago queda retenido en MakerBridge hasta que recibís tu pieza.",
    foot: "Cero riesgo de disputa o reembolso",
    thumb: "PAGO PROTEGIDO ESCROW",
    hl: true,
  },
  {
    n: "04",
    ico: "📦",
    title: "Monitoreá en vivo y entrega",
    text: "Recibí actualizaciones con fotos reales de la cama de impresión. Una vez terminada, se despacha con código de seguimiento en tiempo real.",
    foot: "Entrega a tu casa y a tu puerta",
    thumb: "Capa 482 / 600 en curso",
  },
];

const FREE = [
  "Hasta 5 cotizaciones activas simultáneas",
  "Cobro garantizado por sistema Escrow",
  "Etiquetas de envío autogeneradas",
  "Comisión por trabajo: 12%",
  "Visibilidad regular en la lista de pedidos",
];
const PRO = [
  "Cotizaciones y pedidos ilimitados",
  'Insignia de "Taller Verificado" en perfil',
  "Prioridad en mapa de geolocalización",
  "Comisión reducida: sólo 6%",
  "Soporte prioritario 24/7 y acceso a Boncity Pro",
];

export default function ComoFuncionaLanding() {
  const [mode, setMode] = useState("client");

  return (
    <div className="lp">
      {/* Hero */}
      <section className="lp-wrap lp-hero">
        <h1>
          ¿Cómo Funciona <span>MakerBridge</span>?
        </h1>
        <p>
          ¿Tenés una idea y querés hacerla realidad? Nosotros te conectamos con
          talleres de impresión 3D certificados para transformar diseños,
          bocetos o proyectos en objetos físicos. Calidad garantizada y pago
          protegido.
        </p>

        <div className="lp-badges">
          {BADGES.map((b) => (
            <div className="lp-badge" key={b.title}>
              <i>{b.ico}</i>
              <div>
                <b>{b.title}</b>
                <small>{b.sub}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="lp-toggle">
          <button
            className={mode === "client" ? "on" : ""}
            onClick={() => setMode("client")}
          >
            Soy Cliente (Imprimir o Diseñar)
          </button>
          <button
            className={mode === "maker" ? "on" : ""}
            onClick={() => setMode("maker")}
          >
            Tengo Impresora 3D (Ganar Dinero)
          </button>
        </div>
      </section>

      {/* Steps */}
      <section className="lp-wrap lp-steps">
        <div className="lp-steps-head">
          <div>
            <div className="lp-eyebrow">RUTA DE FABRICACIÓN</div>
            <h2>El proceso de 4 pasos para tu pieza</h2>
          </div>
          <p>
            Desde que subís el archivo hasta que lo tenés en tu casa, el flujo
            es 100% transparente y asegurado.
          </p>
        </div>

        <div className="lp-grid">
          {STEPS.map((s) => (
            <article key={s.n} className={`lp-step ${s.hl ? "hl" : ""}`}>
              <div className="lp-step-top">
                <span className="tag">PASO {s.n}</span>
                <span>⋮</span>
              </div>
              <div className={`lp-thumb ${s.hl ? "green" : ""}`}>
                <span className="ico">{s.ico}</span>
                <span>{s.thumb}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <small>{s.foot}</small>
            </article>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="lp-pricing">
        <div className="lp-wrap">
          <span className="lp-chip">COMUNIDAD DE FABRICANTES</span>
          <h2>Convertí tus horas de impresora libre en ingresos reales</h2>
          <p>
            Miles de personas y empresas necesitan piezas impresas todos los
            días. Conectá tu granja o taller particular y recibí pedidos sin
            lidiar con presupuestos manuales.
          </p>

          <div className="lp-plans">
            <article className="lp-plan">
              <div className="lp-plan-top">
                <span className="lp-level">Nivel Taller Inicial</span>
                <span className="lp-price">
                  $0 <small>/ mes</small>
                </span>
              </div>
              <h3>Plan Gratuito</h3>
              <p>
                Ideal para aficionados y makers independientes que quieren
                probar la plataforma sin costo fijo mensual.
              </p>
              <ul>
                {FREE.map((f, i) => (
                  <li key={f} className={i > 2 ? "off" : ""}>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="lp-cta">Registrarme Gratis</button>
            </article>

            <article className="lp-plan pro">
              <span className="lp-pop">MÁS POPULAR</span>
              <div className="lp-plan-top">
                <span className="lp-level">Taller Profesional</span>
                <span className="lp-price">
                  $8.900 <small>/ mes</small>
                </span>
              </div>
              <h3>Maker Pro</h3>
              <p>
                Para talleres con actividad y granjas de impresión que buscan
                maximizar el volumen de producción mensual.
              </p>
              <ul>
                {PRO.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button className="lp-cta fill">Registrar mi Taller Ahora</button>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
