import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [disableButton, setDisableButton] = useState(false)

  async function fetchProducts() {
    try {
      setLoading(true)
      const response = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${count === 0 ? 0 : count * 10}`
      )
      const result = await response.json()

      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products])
        setLoading(false)
      }
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [count])

  useEffect(() => {
    if (products && products.length === 100) setDisableButton(true)
  }, [products])

  return (
    <div className="store-wrapper">
      {/* Hero Header */}
      <header className="hero-header">
        <span className="badge">Featured Catalog</span>
        <h1>Trending Store Products</h1>
        <p className="subtitle">Discover latest trends dynamically loaded from DummyJSON API</p>
        
        <div className="stats-bar">
          <div className="stat-pill">
            <span>Showing Products:</span>
            <strong>{products.length} / 100</strong>
          </div>
        </div>
      </header>

      {/* Grid Display */}
      <div className="products-grid">
        {products && products.length
          ? products.map((item) => {
              const originalPrice = (item.price * (1 + item.discountPercentage / 100)).toFixed(2)
              return (
                <div className="product-card" key={item.id}>
                  {/* Image Container with Badges */}
                  <div className="img-wrapper">
                    <span className="category-badge">{item.category}</span>
                    {item.discountPercentage > 0 && (
                      <span className="discount-badge">-{Math.round(item.discountPercentage)}%</span>
                    )}
                    <img src={item.thumbnail} alt={item.title} />
                  </div>

                  {/* Card Content */}
                  <div className="product-info">
                    <div className="rating-row">
                      <span className="stars">★ {item.rating.toFixed(1)}</span>
                      <span className="stock-status">In Stock</span>
                    </div>

                    <h3 className="product-title" title={item.title}>{item.title}</h3>
                    
                    <div className="price-row">
                      <div className="price-group">
                        <span className="current-price">${item.price.toFixed(2)}</span>
                        {item.discountPercentage > 0 && (
                          <span className="original-price">${originalPrice}</span>
                        )}
                      </div>
                      <button className="add-cart-btn" aria-label="Add to cart">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="21" r="1"></circle>
                          <circle cx="20" cy="21" r="1"></circle>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          : null}
      </div>

      {/* Load More Control */}
      <div className="action-container">
        <button 
          disabled={disableButton || loading} 
          onClick={() => setCount(count + 1)} 
          className="load-more-btn"
        >
          {loading ? (
            <span className="btn-spinner">Loading items...</span>
          ) : disableButton ? (
            'Reached Maximum Items (100)'
          ) : (
            'Load More Products ✨'
          )}
        </button>
      </div>
    </div>
  )
}