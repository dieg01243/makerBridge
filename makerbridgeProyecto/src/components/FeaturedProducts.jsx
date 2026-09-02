import ProductCard from './ProductCard'
import './FeaturedProducts.css'

const products = [
  {
    id: 1,
    name: 'Soporte para celu',
    description: 'Soporte ergonómico e inclinable para tu teléfono, resistente y con acabado suave.',
    material: 'PLA+',
    price: '$8.500',
    tag: 'Popular',
    emoji: '📱',
    gradient: 'linear-gradient(135deg, #0b7a6b, #17b6a0)',
  },
  {
    id: 2,
    name: 'Organizador de escritorio',
    description: 'Módulo modular para lápices, auriculares y cables. Imprimí varias y combiná.',
    material: 'PETG',
    price: '$12.900',
    tag: 'Nuevo',
    emoji: '🖇️',
    gradient: 'linear-gradient(135deg, #2ee6d6, #0f9c8c)',
  },
  {
    id: 3,
    name: 'Vaso de viaje',
    description: 'Taza aislante con tapa hermética, ideal para llevar tu café o mate a todas partes.',
    material: 'Tritan',
    price: '$15.200',
    tag: 'Destacado',
    emoji: '☕',
    gradient: 'linear-gradient(135deg, #f5a623, #ffcf7d)',
  },
  {
    id: 4,
    name: 'Maceta geométrica',
    description: 'Maceta de diseño moderno con drenaje integrado. Perfecta para suculentas.',
    material: 'PLA',
    price: '$7.800',
    tag: 'Edición limitada',
    emoji: '🪴',
    gradient: 'linear-gradient(135deg, #b78a2e, #e6c269)',
  },
  {
    id: 5,
    name: 'Engranaje funcional',
    description: 'Pieza funcional de precisión para prototipos y mecanismos móviles.',
    material: 'Nylon',
    price: '$9.400',
    tag: 'Técnico',
    emoji: '⚙️',
    gradient: 'linear-gradient(135deg, #565d5a, #9aa4a0)',
  },
  {
    id: 6,
    name: 'Lámpara decorativa',
    description: 'Lámpara impresa con paneles difusores para una luz cálida y creativa.',
    material: 'PETG',
    price: '$18.600',
    tag: 'Bestseller',
    emoji: '💡',
    gradient: 'linear-gradient(135deg, #14534d, #0b7a6b)',
  },
]

function FeaturedProducts() {
  return (
    <section id="trabajos">
      <div className="container">
        <div className="section-head">
          <span className="badge">Portafolio</span>
          <h2 className="section-title">Trabajos destacados</h2>
          <p className="section-subtitle">
            Una muestra de lo que podemos imprimir para vos: desde objetos decorativos
            hasta piezas técnicas de precisión.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="products-more">
          <a href="#trabajos" className="btn btn-ghost">
            Ver más proyectos
          </a>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
