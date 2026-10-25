import "./ComoFunciona.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ComoFunciona() {
  return (
    <>
      <Header />
      <main className="cf">
        <h1>
          ¿Cómo funciona <span>MakerBridge</span>?
        </h1>

        <div className="cf-divider">
          Si necesitás imprimir algo y estás buscando un taller o maker que lo
          realice seguí estos pasos
        </div>

        <section className="cf-steps">
          <article className="card pink left">
            <span className="num">1.</span>
            <div className="body">
              Subí o buscá tu pieza. ¿Tenés tu archivo 3D (
              <span className="hl-blue">STL, 3MF, STEP</span>)? Subilo directo.
              Si aún no lo tenés, podés encontrar modelos en MakerWorld o
              encargar un diseño a medida especificando la función de tu pieza.
            </div>
          </article>

          <article className="card sand right">
            <span className="num">2.</span>
            <div className="body">
              Configurá tu solicitud y recibí presupuestos. Definí{" "}
              <span className="hl-blue">
                material, color, cantidad y plazo de entrega
              </span>
              . Fabricantes cerca de ti evaluarán tu proyecto y te enviarán
              presupuestos a tu correo. Revisá sus perfiles, valoraciones y
              trabajos.
            </div>
          </article>

          <article className="card sage left">
            <span className="num">3.</span>
            <div className="body">
              Elegí a tu Maker y{" "}
              <span className="hl">aceptá la mejor cotización</span> con un solo
              clic. El pedido quedará confirmado para iniciar la producción y
              las demás ofertas se <em>rechazarán automáticamente</em>.
            </div>
          </article>

          <article className="card salmon right">
            <span className="num">4.</span>
            <div className="body">
              Monitoreá el estado de la impresión en tiempo real con fotos del
              proceso hasta recibir tu producto terminado en tu puerta.
            </div>
          </article>
        </section>

        <div className="cf-divider" style={{ marginTop: 40 }}>
          Si tenés impresora 3D y querés sumarte a MakerBridge
        </div>

        <section className="cf-bottom">
          <article className="card slate">
            <span className="num">1</span>
            <div className="body">
              Registrate subiendo tus datos, redes de emprendimiento y fotos de
              tu impresora 3D. Listo ahora esperá a que verifiquemos tu
              información para activar tu cuenta y sumarte a MakerBridge.
            </div>
          </article>

          <article className="card lilac">
            <span className="num">2.</span>
            <div className="body">
              <b>Suscripción gratuita</b>
              <br />
              Seguí con tu cuenta gratuita de 5 pedidos para probar la
              plataforma, sin pagar ninguna comisión o suscripción.
            </div>
          </article>

          <article className="card lilac full">
            <div className="body">
              <b>Suscripción premium</b>
              <br />
              Podés empezar al plan premium con múltiples beneficios como:
              <ul>
                <li>-Pedidos ilimitados</li>
                <li>-Más visibilidad</li>
                <li>-Perfil personalizado</li>
              </ul>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
