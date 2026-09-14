import { useState } from "react";

const MAKERS = [
  { name: "Bruce Banner", role: "Impresión en resina · Córdoba" },
  { name: "Natalia Rivas", role: "PLA y PETG · Buenos Aires" },
  { name: "Leo Duarte", role: "Prototipado rápido · Rosario" },
];

const PRODUCTS = [
  {
    name: "Producto 1",
    maker: "Nombre del maker",
    path: "M35 20 C28 35 26 50 32 70 C34 78 30 84 33 92 L67 92 C70 84 66 78 68 70 C74 50 72 35 65 20 C58 12 42 12 35 20 Z",
  },
  {
    name: "Producto 2",
    maker: "Nombre del maker",
    shape: "gear",
  },
  {
    name: "Producto 3",
    maker: "Nombre del maker",
    path: "M50 12 L82 30 V70 L50 88 L18 70 V30 Z",
    chip: "Natalia",
  },
];

const STEPS = [
  {
    title: "Subí tu archivo",
    desc: "Cargá tu diseño en formato STL u OBJ desde cualquier dispositivo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 V15 M12 15 L7 10 M12 15 L17 10" />
        <path d="M5 19 H19" />
      </svg>
    ),
  },
  {
    title: "Configurá tus detalles",
    desc: "Elegí material, color y cantidad de unidades que necesitás.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3 V6 M12 18 V21 M3 12 H6 M18 12 H21 M6 6 L8 8 M16 16 L18 18 M6 18 L8 16 M16 8 L18 6" />
      </svg>
    ),
  },
  {
    title: "Elegí a tu Maker",
    desc: "Comparé precios, tiempos y calificaciones de makers cercanos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21 C4 16.5 7.5 14 12 14 C16.5 14 20 16.5 20 21" />
      </svg>
    ),
  },
  {
    title: "Recibí tu pedido",
    desc: "Seguí la fabricación en vivo y recibí tu pieza lista para usar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8 L12 3 L20 8 V17 L12 21 L4 17 Z" />
        <path d="M4 8 L12 13 L20 8 M12 13 V21" />
      </svg>
    ),
  },
];

function CornerMarks({ corners }) {
  return (
    <>
      {corners.includes("tl") && <span className="corner-mark tl" />}
      {corners.includes("tr") && <span className="corner-mark tr" />}
      {corners.includes("bl") && <span className="corner-mark bl" />}
      {corners.includes("br") && <span className="corner-mark br" />}
    </>
  );
}

export default function MakerbridgeLanding() {
  const [makerIndex, setMakerIndex] = useState(0);
  const maker = MAKERS[makerIndex];

  const prevMaker = () =>
    setMakerIndex((i) => (i - 1 + MAKERS.length) % MAKERS.length);
  const nextMaker = () => setMakerIndex((i) => (i + 1) % MAKERS.length);

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap');

        :root{
          --cream: #FBF6EC;
          --cream-2: #F5EEE0;
          --white: #FFFFFF;
          --ink: #322E28;
          --ink-soft: #6E6759;
          --ink-faint: #A79F8E;
          --mustard: #F4B740;
          --mustard-deep: #E29A1E;
          --coral: #FF7A5C;
          --coral-deep: #E85E40;
          --blue: #7FB8E0;
          --blue-deep: #5C9BC9;
          --sage: #A8C39A;
          --shadow-card: 0 14px 30px rgba(50, 46, 40, 0.08);
          --radius-lg: 28px;
          --radius-md: 20px;
          --radius-sm: 14px;
        }

        .page *{ box-sizing:border-box; }

        .page{
          background-color:var(--cream);
          background-image:
            linear-gradient(rgba(50,46,40,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(50,46,40,0.04) 1px, transparent 1px);
          background-size:32px 32px;
          background-position:-1px -1px;
          color:var(--ink);
          font-family:'Nunito Sans', sans-serif;
          line-height:1.55;
          -webkit-font-smoothing:antialiased;
          max-width:480px;
          margin:0 auto;
          min-height:100vh;
          position:relative;
        }

        .page h1, .page h2, .page h3{
          font-family:'Baloo 2', sans-serif;
          font-weight:700;
          line-height:1.15;
          color:var(--ink);
          margin:0;
        }

        .page p{ margin:0; }
        .page a{ color:inherit; text-decoration:none; }
        .page img, .page svg{ display:block; max-width:100%; }
        .page button{ font-family:inherit; }

        .page :focus-visible{
          outline:3px solid var(--blue-deep);
          outline-offset:3px;
          border-radius:8px;
        }

        .wrap{ padding:0 20px; }

        /* NAV */
        nav{
          position:sticky; top:0; z-index:50;
          background:rgba(251,246,236,0.92);
          backdrop-filter:blur(8px);
          padding:18px 20px 14px;
        }
        .nav-top{ display:flex; align-items:center; justify-content:space-between; }
        .logo{
          display:flex; align-items:center; gap:8px;
          font-family:'Baloo 2', sans-serif;
          font-weight:700;
          font-size:1.1rem;
        }
        .logo-mark{ width:32px; height:32px; }
        .nav-links{
          display:flex; gap:16px;
          margin-top:14px;
          overflow-x:auto;
          padding-bottom:2px;
        }
        .nav-links a{
          font-size:0.82rem;
          font-weight:700;
          color:var(--ink-soft);
          white-space:nowrap;
        }
        .nav-links a:hover{ color:var(--coral-deep); }

        .btn{
          display:inline-flex; align-items:center; justify-content:center;
          gap:6px;
          padding:11px 18px;
          font-family:'Nunito Sans', sans-serif;
          font-weight:800;
          font-size:0.84rem;
          border-radius:100px;
          border:none;
          cursor:pointer;
          transition:transform .15s ease, box-shadow .2s ease;
          white-space:nowrap;
        }
        .btn-primary{
          background:var(--coral);
          color:var(--white);
          box-shadow:0 8px 18px rgba(255,122,92,0.32);
        }
        .btn-primary:hover{ transform:translateY(-2px); }
        .btn-teal{ background:#DDF0EA; color:#2E7A66; box-shadow:none; }
        .btn-teal:hover{ transform:translateY(-2px); }
        .btn-secondary{ background:var(--white); color:var(--ink); box-shadow:var(--shadow-card); }

        .nav-ctas{ display:flex; gap:10px; margin-top:14px; }
        .nav-ctas .btn{ flex:1; padding:11px 10px; font-size:0.8rem; }

        /* HERO */
        .hero{ padding:32px 20px 8px; text-align:left; }
        .hero h1{ font-size:1.55rem; max-width:22ch; }
        .hero h1 .accent{ color:var(--coral); }
        .hero-visual{
          margin-top:22px;
          height:150px;
          border-radius:var(--radius-lg);
          background:linear-gradient(135deg, #FDEBC7 0%, #FFDCD3 55%, #E3F0F8 100%);
          position:relative;
          overflow:hidden;
          display:flex; align-items:center; justify-content:center;
        }
        .hero-visual .blob{ position:absolute; border-radius:45% 55% 60% 40% / 50% 45% 55% 50%; }
        .hero-visual .blob-1{
          width:96px; height:96px;
          background:linear-gradient(155deg, var(--mustard), var(--mustard-deep));
          top:-18px; left:-14px; opacity:.9;
        }
        .hero-visual .blob-2{
          width:70px; height:70px;
          background:linear-gradient(155deg, var(--coral), var(--coral-deep));
          bottom:-16px; right:20px; opacity:.85;
        }
        .hero-visual .mark{
          width:76px; height:76px;
          position:relative; z-index:2;
          filter:drop-shadow(0 10px 16px rgba(50,46,40,0.14));
        }

        /* MAKER CAROUSEL */
        .maker-carousel{ padding:30px 20px 6px; }
        .maker-carousel .eyebrow{
          text-align:center; font-size:0.78rem; font-weight:800;
          color:var(--ink-faint); margin-bottom:14px;
        }
        .carousel-row{ display:flex; align-items:center; justify-content:center; gap:14px; }
        .carousel-arrow{
          width:34px; height:34px; border-radius:50%;
          background:var(--white); box-shadow:var(--shadow-card);
          display:flex; align-items:center; justify-content:center;
          color:var(--ink-soft); cursor:pointer; flex-shrink:0; border:none;
        }
        .carousel-arrow:hover{ color:var(--coral-deep); }
        .carousel-arrow svg{ width:16px; height:16px; }

        .maker-card{
          background:var(--white); border-radius:var(--radius-md);
          box-shadow:var(--shadow-card); padding:16px 20px;
          display:flex; align-items:center; gap:12px; flex:1;
        }
        .maker-avatar{
          width:44px; height:44px; border-radius:50%;
          background:linear-gradient(155deg, var(--blue), var(--blue-deep));
          flex-shrink:0;
        }
        .maker-name{ font-family:'Baloo 2', sans-serif; font-size:1rem; font-weight:700; }
        .maker-role{ font-size:0.76rem; color:var(--ink-faint); margin-top:2px; }

        /* PRODUCTS */
        .section{ padding:34px 20px; }
        .section h2{ font-size:1.25rem; margin-bottom:16px; }

        .product-row{ display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; position:relative; }
        .product-card{
          background:var(--white); border-radius:var(--radius-sm);
          box-shadow:var(--shadow-card); overflow:hidden; position:relative;
        }
        .product-card.has-chip{ overflow:visible; }
        .product-media{
          aspect-ratio:1/1;
          background:linear-gradient(160deg, #FDEBC7, #F4B740);
          display:flex; align-items:center; justify-content:center;
        }
        .product-media svg{ width:52%; height:52%; }
        .product-info{ padding:9px 8px 11px; }
        .product-info .p-name{ font-size:0.78rem; font-weight:800; }
        .product-info .p-maker{ font-size:0.66rem; color:var(--ink-faint); margin-top:2px; }

        .maker-chip{
          position:absolute; top:-12px; right:8px;
          background:var(--blue); color:var(--white);
          font-size:0.66rem; font-weight:800; padding:6px 12px;
          border-radius:100px; box-shadow:0 8px 16px rgba(92,155,201,0.35); z-index:3;
        }
        .maker-chip::after{
          content:""; position:absolute; bottom:-4px; right:16px;
          width:8px; height:8px; background:var(--blue); transform:rotate(45deg);
        }

        /* HOW IT WORKS */
        .steps{ display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .step{ background:var(--white); border-radius:var(--radius-sm); padding:16px 14px; box-shadow:var(--shadow-card); }
        .step-icon{
          width:34px; height:34px; border-radius:50%;
          display:flex; align-items:center; justify-content:center; margin-bottom:10px;
        }
        .step-icon svg{ width:17px; height:17px; }
        .step h3{ font-size:0.86rem; font-weight:700; }
        .step p{ font-size:0.72rem; color:var(--ink-soft); margin-top:5px; }
        .step-icon.i0{ background:#FCE7C2; color:var(--mustard-deep); }
        .step-icon.i1{ background:#FFDCD3; color:var(--coral-deep); }
        .step-icon.i2{ background:#DCEBF6; color:var(--blue-deep); }
        .step-icon.i3{ background:#E8F0E2; color:#5A7A4B; }

        /* ABOUT */
        .about{
          position:relative;
          background:var(--white); border-radius:var(--radius-lg);
          margin:0 20px; padding:28px 22px; box-shadow:var(--shadow-card);
        }
        .about h2{ font-size:1.2rem; }
        .about p{ margin-top:10px; font-size:0.86rem; color:var(--ink-soft); }
        .about-stats{ display:flex; gap:18px; margin-top:18px; }
        .about-stats div{ font-family:'Baloo 2', sans-serif; font-size:1.05rem; }
        .about-stats span{
          display:block; font-family:'Nunito Sans', sans-serif;
          font-size:0.68rem; color:var(--ink-faint); font-weight:700; margin-top:2px;
        }

        /* FOOTER */
        footer{ margin-top:36px; padding:30px 20px 26px; background:var(--cream-2); border-radius:28px 28px 0 0; }
        .footer-social{ display:flex; gap:12px; margin-bottom:24px; }
        .footer-social a{
          width:36px; height:36px; border-radius:50%;
          background:var(--white); box-shadow:var(--shadow-card);
          display:flex; align-items:center; justify-content:center; color:var(--ink-soft);
        }
        .footer-social a:hover{ color:var(--coral-deep); }
        .footer-social svg{ width:16px; height:16px; }

        .footer-cols{ display:flex; justify-content:space-between; gap:20px; }
        .footer-col h4{ font-size:0.78rem; font-weight:800; color:var(--ink); margin-bottom:10px; }
        .footer-col a{ display:block; font-size:0.8rem; color:var(--ink-soft); padding:5px 0; }
        .footer-col a:hover{ color:var(--coral-deep); }

        .footer-bottom{
          margin-top:24px; padding-top:16px;
          border-top:1px solid rgba(50,46,40,0.08);
          font-size:0.72rem; color:var(--ink-faint); text-align:center;
        }

        /* TECHNICAL TEXTURE */
        .corner-mark{ position:absolute; width:16px; height:16px; pointer-events:none; opacity:.5; }
        .corner-mark.tl{ top:9px; left:9px; border-top:2px solid var(--coral-deep); border-left:2px solid var(--coral-deep); }
        .corner-mark.tr{ top:9px; right:9px; border-top:2px solid var(--blue-deep); border-right:2px solid var(--blue-deep); }
        .corner-mark.bl{ bottom:9px; left:9px; border-bottom:2px solid var(--blue-deep); border-left:2px solid var(--blue-deep); }
        .corner-mark.br{ bottom:9px; right:9px; border-bottom:2px solid var(--coral-deep); border-right:2px solid var(--coral-deep); }

        .dimension-line{ display:flex; align-items:center; gap:6px; margin-bottom:16px; color:var(--ink-faint); }
        .dimension-line::before, .dimension-line::after{
          content:""; height:1px; background:var(--ink-faint); opacity:.4; flex:1;
        }
        .dimension-line svg{ width:14px; height:14px; opacity:.55; flex-shrink:0; }
        .dimension-label{ font-size:.68rem; font-weight:800; letter-spacing:.02em; }

        /* DESKTOP */
        @media (min-width: 720px){
          .page{ max-width:none; }
          nav .wrap, .hero, .maker-carousel, .section, .about, footer .wrap{ max-width:1080px; margin:0 auto; }
          .nav-top{ padding:0; }
          nav{ padding:20px 40px; }
          .nav-links{ margin-top:0; overflow:visible; }
          .nav-inner-desktop{ display:flex; align-items:center; justify-content:space-between; }
          .nav-ctas{ margin-top:0; width:auto; }
          .nav-ctas .btn{ flex:none; }
          .hero{ padding:56px 40px 20px; display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:center; }
          .hero h1{ font-size:2.4rem; max-width:14ch; }
          .hero-visual{ margin-top:0; height:320px; }
          .hero-visual .mark{ width:140px; height:140px; }
          .hero-visual .blob-1{ width:180px; height:180px; }
          .hero-visual .blob-2{ width:130px; height:130px; }
          .maker-carousel{ padding:40px; }
          .carousel-row{ max-width:520px; margin:0 auto; }
          .section{ padding:56px 40px; }
          .product-row{ grid-template-columns:repeat(3,1fr); gap:24px; }
          .product-info{ padding:16px 16px 18px; }
          .product-info .p-name{ font-size:0.95rem; }
          .product-info .p-maker{ font-size:0.78rem; }
          .steps{ grid-template-columns:repeat(4,1fr); gap:18px; }
          .step{ padding:24px 20px; }
          .about{ margin:0 40px; padding:44px 48px; }
          footer{ padding:48px 40px 32px; }
          .footer-cols{ max-width:1080px; margin:0 auto; }
        }
      `}</style>

      <nav>
        <div className="wrap" style={{ padding: 0 }}>
          <div className="nav-inner-desktop">
            <div className="nav-top">
              <div className="logo">
                <span className="logo-mark">
                  <svg viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="15" fill="#FCE7C2" />
                    <path d="M16 7 L24 11.5 V20.5 L16 25 L8 20.5 V11.5 Z" fill="#F4B740" stroke="#E29A1E" strokeWidth="1" />
                    <path d="M16 7 L16 16 M16 16 L24 11.5 M16 16 L8 11.5" stroke="#FF7A5C" strokeWidth="1.2" />
                  </svg>
                </span>
                MakerBridge
              </div>
            </div>
            <div className="nav-links">
              <a href="#tienda">Explorar</a>
              <a href="#como-funciona">Cómo funciona</a>
              <a href="#servicios">Servicios</a>
              <a href="#proveedores">Proveedores</a>
            </div>
            <div className="nav-ctas">
              <a href="#" className="btn btn-teal">Soy Maker</a>
              <a href="#" className="btn btn-primary">Necesito un Maker</a>
            </div>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div>
          <h1>MakerBridge conecta con <span className="accent">clientes y proveedores</span> en un solo lugar</h1>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <CornerMarks corners={["tl", "tr", "bl", "br"]} />
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <svg className="mark" viewBox="0 0 120 120" fill="none">
            <path d="M60 15 L100 35 V85 L60 105 L20 85 V35 Z" fill="#F4B740" stroke="#E29A1E" strokeWidth="2" />
            <path d="M60 15 L60 60 M60 60 L100 35 M60 60 L20 35" stroke="#FF7A5C" strokeWidth="3" />
            <circle cx="60" cy="60" r="10" fill="#7FB8E0" />
          </svg>
        </div>
      </section>

      <section className="maker-carousel">
        <div className="eyebrow">Maker destacado del mes</div>
        <div className="carousel-row">
          <button className="carousel-arrow" aria-label="Maker anterior" onClick={prevMaker}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M15 5 L8 12 L15 19" />
            </svg>
          </button>
          <div className="maker-card">
            <div className="maker-avatar" />
            <div>
              <div className="maker-name">{maker.name}</div>
              <div className="maker-role">{maker.role}</div>
            </div>
          </div>
          <button className="carousel-arrow" aria-label="Siguiente maker" onClick={nextMaker}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M9 5 L16 12 L9 19" />
            </svg>
          </button>
        </div>
      </section>

      <section className="section" id="tienda">
        <h2>Trabajos destacados</h2>
        <div className="product-row">
          {PRODUCTS.map((p) => (
            <div className={`product-card${p.chip ? " has-chip" : ""}`} key={p.name}>
              {p.chip && <div className="maker-chip">{p.chip}</div>}
              <div className="product-media">
                {p.shape === "gear" ? (
                  <svg viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="40" r="24" fill="#E29A1E" opacity="0.85" />
                    <rect x="30" y="64" width="40" height="26" rx="10" fill="#E29A1E" opacity="0.85" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 100 100" fill="none">
                    <path d={p.path} fill="#E29A1E" opacity="0.85" />
                  </svg>
                )}
              </div>
              <div className="product-info">
                <div className="p-name">{p.name}</div>
                <div className="p-maker">{p.maker}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="como-funciona">
        <h2>¿Cómo funciona MakerBridge con tu archivo 3D?</h2>
        <div className="dimension-line">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M2 12 H22 M2 8 V16 M22 8 V16" />
          </svg>
          <span className="dimension-label">4 pasos</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M2 12 H22 M2 8 V16 M22 8 V16" />
          </svg>
        </div>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div className="step" key={s.title}>
              <div className={`step-icon i${i}`}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="about">
          <CornerMarks corners={["tl", "br"]} />
          <h2>Sobre Nosotros</h2>
          <p>
            MakerBridge nació para que cualquier idea con un archivo 3D encuentre a la persona
            correcta para fabricarla: makers independientes, talleres y proveedores organizados
            en una sola red.
          </p>
          <div className="about-stats">
            <div>3.200+<span>makers</span></div>
            <div>18<span>ciudades</span></div>
            <div>4.9★<span>calificación</span></div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap" style={{ padding: "0 20px" }}>
          <div className="footer-social">
            <a href="#" aria-label="X">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4 L20 20 M20 4 L4 20" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="4" width="16" height="16" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 21 V13 H17 L17.5 9 H14 V7 C14 5.9 14.3 5 16 5 H17.5 V1.5 C17 1.4 15.7 1 14.2 1 C11 1 9 3 9 6.5 V9 H6 V13 H9 V21" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="8" cy="8" r="0.6" fill="currentColor" />
                <path d="M8 11 V17 M8 11 V11 M13 17 V13 C13 11.5 14 11 15 11 C16 11 17 11.8 17 13 V17 M13 11 V17" />
              </svg>
            </a>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Explorar</h4>
              <a href="#">Cómo funciona</a>
              <a href="#">Servicios</a>
              <a href="#">Proveedores</a>
              <a href="#">Sobre nosotros</a>
            </div>
            <div className="footer-col">
              <h4>Contáctanos</h4>
              <a href="mailto:makerbridge@gmail.com">makerbridge@gmail.com</a>
            </div>
          </div>
          <div className="footer-bottom">© 2026 MakerBridge — hecho por makers, para makers</div>
        </div>
      </footer>
    </div>
  );
}
