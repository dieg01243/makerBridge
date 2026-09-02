import './ProductCard.css'

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-visual" style={{ background: product.gradient }}>
        <span className="product-emoji">{product.emoji}</span>
        <span className="product-tag">{product.tag}</span>
      </div>
      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-foot">
          <span className="product-material">{product.material}</span>
          <span className="product-price">{product.price}</span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
