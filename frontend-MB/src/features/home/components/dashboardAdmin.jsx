import { useState } from "react";
import "./dashboardAdmin.css";

const ORDERS = [
  {
    label: "En Impresión / Fabricación activa",
    n: 124,
    pct: "38%",
    color: "#2e7d5b",
  },
  {
    label: "En Espera / Cotización abierta",
    n: 68,
    pct: "21%",
    color: "#e5a326",
  },
  {
    label: "Entregado & Aprobados (Escrow OK)",
    n: 89,
    pct: "28%",
    color: "#1f6f6b",
  },
  {
    label: "En Disputa / Revisión de garantía",
    n: 23,
    pct: "8%",
    color: "#d8453b",
    alert: true,
  },
];

const MAKERS = [
  {
    ini: "LP",
    name: "LP 3D Lab",
    loc: "Córdoba Capital, CBA",
    tag: "Pendiente",
    email: "@pclabsc.xxx",
    machines: "3× Prusa MK4 + 1× Voron 2.4",
    lead: "Volumen máx: 250×250×210",
    filament: "Multimaterial (2 sets)",
    file: "Constancia_AFIP.pdf",
    portfolio: "Portfolio: pclabsc.xxx",
    note: "Último envío 5 de 28 hs 5a",
  },
  {
    ini: "PP",
    name: "ProtoPrint Studio",
    loc: "Palermo, CABA",
    tag: "Pendiente",
    email: "@protoprint.com.ar",
    machines: "2× Bambu Lab X1C (AMS)",
    lead: "Multimaterial (4 sets)",
    filament: "Prueba de Instalación",
    file: "Constancia_ARCA.pdf",
    portfolio: "Portfolio: protoprint.shop",
    note: "Resp. inscripto",
  },
];

const USERS = [
  {
    ini: "AF",
    name: "Martín Andrés Ferrero",
    mail: "aferrero.lq@hotmail.com.ar",
    role: "Maker Pro",
    pro: true,
    status: "Activo",
    cls: "ok",
    act: "48 cotizaciones ganadas",
    sub: "Vol: $1.860.000 ARS · 4.8 ★",
    btn: "Suspender",
  },
  {
    ini: "DE",
    name: "Dra. Valeria Estévez",
    mail: "vestevez@hotmail.com.ar",
    role: "Cliente",
    status: "Activo",
    cls: "ok",
    act: "19 pedidos realizados",
    sub: "Gastado: $842.000 ARS",
    btn: "Suspender",
  },
  {
    ini: "RC",
    name: "Rodrigo Calvo (RC Imprime)",
    mail: "rcalvo.rcimprime@gmail.com",
    role: "Maker Free",
    status: "Bloqueado por disputa",
    cls: "blocked",
    act: "2 reclamos abiertos por tolerancia dimensional",
    sub: "Garantía retenida: $92.500",
    btn: "Reactivar",
    alert: true,
  },
  {
    ini: "IA",
    name: "Ignacio Alonso",
    mail: "ignacio.alonso@gmail.com",
    role: "Cliente",
    status: "Suspendido",
    cls: "off",
    act: "Inactivo desde 14/01/2025",
    sub: "por inactividad prolongada",
    btn: "Reactivar / Alta",
    plain: true,
  },
];

export default function dashboardAdmin() {
  const [filter, setFilter] = useState("Todos");
  const [query, setQuery] = useState("");

  const rows = USERS.filter(
    (u) =>
      (filter === "Todos" ||
        u.status.toLowerCase().startsWith(filter.toLowerCase().slice(0, 5))) &&
      (u.name + u.mail).toLowerCase().includes(query.toLowerCase()),
  );

  // conic-gradient for the donut
  const parts = [38, 21, 28, 13];
  let acc = 0;
  const gradient = ORDERS.map((o, i) => {
    const from = acc;
    acc += parts[i];
    return `${o.color} ${from}% ${acc}%`;
  }).join(", ");

  return (
    <div className="adm">
      {/* Header */}
      <header className="adm-head">
        <div>
          <h1>Panel de Administración &amp; Control Global</h1>
          <span className="adm-badge">ROL: SUPERADMIN</span>
          <p className="adm-sub">
            Supervisión estratégica de transacciones, talleres de fabricación
            aditiva e integridad de usuarios.
          </p>
        </div>
        <div className="adm-actions">
          <select className="select">
            <option>Este mes (En curso)</option>
          </select>
          <button className="btn btn-ghost">Exportar Reporte</button>
          <button className="btn btn-primary">+ Nuevo Usuario Manual</button>
        </div>
      </header>

      {/* KPIs */}
      <section className="kpis">
        <article className="kpi">
          <div className="kpi-label">
            USUARIOS TOTALES <span className="chip">▲ 14%</span>
          </div>
          <div className="kpi-value">1,420</div>
          <div className="kpi-note">
            <span className="dot" style={{ background: "#2e7d5b" }} />
            840 Clientes{" "}
            <span className="dot" style={{ background: "#e2603a" }} />
            580 Makers
          </div>
        </article>
        <article className="kpi">
          <div className="kpi-label">
            PEDIDOS CONCRETADOS <span className="chip">88.2% Tasa</span>
          </div>
          <div className="kpi-value">324</div>
          <div className="kpi-note">
            Volumen Transaccionado
            <br />
            <b>$12.850.000 ARS</b>
          </div>
        </article>
        <article className="kpi">
          <div className="kpi-label">
            SUSCRIPCIONES MAKER{" "}
            <span className="chip warn">80.4% Maker Pro</span>
          </div>
          <div className="kpi-value">580</div>
          <div className="kpi-note">Makers por mayor</div>
        </article>
        <article className="kpi wide">
          <div className="kpi-label">
            INGRESOS NETOS PLATAFORMA <span className="chip">+22% MoM</span>
          </div>
          <div className="kpi-value sm">$2.239.500</div>
          <div className="kpi-note">Escrow fee 3% (Mín.) + MRR Pro</div>
        </article>
      </section>

      {/* Orders + tiers */}
      <div className="grid2">
        <section className="panel">
          <div className="panel-top">
            <h2>Distribución Operativa de Pedidos</h2>
            <span className="pill">Corte: Final al día</span>
          </div>
          <p className="panel-sub">
            Estado en tiempo real de 324 órdenes activas e históricas del ciclo.
          </p>
          <div className="donut-row">
            <div
              className="donut"
              style={{ background: `conic-gradient(${gradient})` }}
            >
              <div className="donut-center">
                <b>324</b>
                <span>ORDENES</span>
              </div>
            </div>
            <div className="legend">
              {ORDERS.map((o) => (
                <div
                  key={o.label}
                  className={`legend-item ${o.alert ? "alert" : ""}`}
                >
                  <span className="dot" style={{ background: o.color }} />
                  <span className="grow">{o.label}</span>
                  <b>{o.n}</b>
                  <span className="pct">{o.pct}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="guarantee">
            <span>
              ✔ Garantía de reembolso protegida por Smart Escrow MakerBridge
            </span>
            <button className="link">Ver auditoría completa →</button>
          </div>
        </section>

        <section className="panel">
          <h2>Monetización Maker Tiers</h2>
          <p className="panel-sub">
            Estructura de pagos para los 580 talleres según su nivel de
            suscripción.
          </p>
          <div className="tiers">
            <div className="tier">
              <div className="tier-tag">
                <span>STARTER</span>
                <span>340 Makers</span>
              </div>
              <h3>Gratuito</h3>
              <p>Hasta 5 presupuestos al mes con 12% de fee transaccional.</p>
            </div>
            <div className="tier pro">
              <div className="tier-tag">
                <span>MAKER PRO</span>
                <span className="chip">Activos</span>
              </div>
              <div className="price">$8.900 /mes</div>
              <p>
                Cotizaciones ilimitadas, 6% fee reducido e insignia verificada.
              </p>
              <div className="mrr">
                MRR Generado<b>$1.468.500</b>
              </div>
            </div>
          </div>
          <div className="conv">
            Conversión de Starter a Maker Pro:{" "}
            <b>24.4% (Meta: Inmediata, 50%)</b>
            <div className="progress">
              <i />
            </div>
          </div>
        </section>
      </div>

      {/* Makers pending */}
      <section className="panel">
        <div className="panel-top">
          <h2>Auditoría &amp; Verificación de Makers Pendientes</h2>
          <span className="pill">SLA de aprobación: &lt; 24 horas</span>
        </div>
        <p className="panel-sub">
          Valida la infraestructura física, CUIT/AFIP y calidad técnica de los
          aspirantes antes de habilitar su taller.
        </p>
        <div className="makers">
          {MAKERS.map((m) => (
            <article className="maker" key={m.name}>
              <div className="maker-head">
                <div className="avatar">{m.ini}</div>
                <div>
                  <h3>{m.name}</h3>
                  <small>{m.loc}</small>
                </div>
                <span className="state">{m.tag}</span>
              </div>
              <div className="maker-meta">
                <div>
                  <span>Granja Declarada</span>
                  <b>{m.machines}</b>
                </div>
                <div>
                  <span>Prueba de Instalación</span>
                  <b>{m.lead}</b>
                </div>
                <div>
                  <span>Documentación AFIP</span>
                  <a href="#">{m.file}</a>
                </div>
              </div>
              <small style={{ fontSize: 9, color: "#7a726a" }}>
                {m.portfolio} · {m.note}
              </small>
              <div className="maker-actions">
                <button className="btn">Rechazar</button>
                <button className="btn">Solicitar Más Datos</button>
                <button className="btn btn-primary">
                  Aprobar Maker &amp; Certificar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Users */}
      <section className="panel">
        <div className="panel-top">
          <h2>Gestión de Alta, Baja &amp; Permisos de Usuarios</h2>
          <span className="pill">Total Listados: 1,420 usuarios</span>
        </div>
        <p className="panel-sub">
          Búsqueda ágil, cambio de estatus y auditoría disciplinaria de
          compradores y talleres.
        </p>
        <div className="toolbar">
          <input
            className="search"
            placeholder="Buscar por Nombre, Email, DNI/CUIT o Empresa..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="filters">
            Filtrar Estado:
            {["Todos", "Activos", "Suspendidos", "En Disputa"].map((f) => (
              <button
                key={f}
                className={filter === f ? "on" : ""}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
            <button
              onClick={() => {
                setFilter("Todos");
                setQuery("");
              }}
            >
              Todas las Rol
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="users">
            <thead>
              <tr>
                <th>USUARIO / CONTACTO</th>
                <th>ROL</th>
                <th>ESTADO DE CUENTA</th>
                <th>ACTIVIDAD / HISTORIAL</th>
                <th>ACCIONES DIRECTAS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.mail} className={u.alert ? "row-alert" : ""}>
                  <td>
                    <div className="user-cell">
                      <div className="avatar round">{u.ini}</div>
                      <div>
                        <b>{u.name}</b>
                        <small>{u.mail}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`role ${u.pro ? "pro" : ""}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${u.cls}`}>
                      <i
                        className="dot"
                        style={{ background: "currentColor", margin: 0 }}
                      />
                      {u.status}
                    </span>
                  </td>
                  <td>
                    <b>{u.act}</b>
                    <small>{u.sub}</small>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        className={`btn ${u.btn === "Suspender" ? "btn-danger" : ""}`}
                      >
                        {u.btn}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pager">
          <span>Mostrando 8 de 1,420 usuarios totales</span>
          <div>
            <button className="btn">Anterior</button>
            <span>Página 1 de 356</span>
            <button className="btn">Siguiente</button>
          </div>
        </div>
      </section>
    </div>
  );
}
