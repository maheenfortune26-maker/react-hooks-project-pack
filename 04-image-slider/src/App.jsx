import { useEffect, useState } from 'react'
import './App.css'

export default function App({ url = 'https://picsum.photos/v2/list', limit = 5, page = 1 }) {
  const [images, setImages] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchImages(getUrl) {
    try {
      setLoading(true)
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`)
      const data = await response.json()

      if (data) {
        setImages(data)
        setLoading(false)
      }
    } catch (e) {
      setErrorMsg(e.message)
      setLoading(false)
    }
  }

  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)
  }

  useEffect(() => {
    if (url !== '') fetchImages(url)
  }, [url])

  if (loading) {
    return (
      <div className="slider-wrapper">
        <div className="loader-spinner"></div>
      </div>
    )
  }

  if (errorMsg !== null) {
    return (
      <div className="slider-wrapper">
        <div className="error-card">Failed to load gallery: {errorMsg}</div>
      </div>
    )
  }

  return (
    <div className="slider-wrapper">
      <div className="slider-card">
        {/* Header Title */}
        <header className="slider-header">
          <span className="badge">Featured Gallery</span>
          <h2>Interactive Image Slider</h2>
        </header>

        {/* Main Viewport Container */}
        <div className="slider-container">
          {/* Navigation Arrows */}
          <button className="arrow-btn arrow-left" onClick={handlePrevious} aria-label="Previous Slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button className="arrow-btn arrow-right" onClick={handleNext} aria-label="Next Slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Slide Image & Details Overlay */}
          {images && images.length ? (
            images.map((imageItem, index) => (
              <div
                key={imageItem.id}
                className={`slide-item ${currentSlide === index ? 'active' : ''}`}
              >
                <img
                  alt={imageItem.author}
                  src={imageItem.download_url}
                  className="slide-image"
                />
                <div className="slide-overlay">
                  <span className="slide-counter">
                    {index + 1} / {images.length}
                  </span>
                  <p className="author-name">Photo by <span>{imageItem.author}</span></p>
                </div>
              </div>
            ))
          ) : null}

          {/* Dots Indicator */}
          <div className="indicators-wrapper">
            {images && images.length
              ? images.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  ></button>
                ))
              : null}
          </div>
        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="thumbnails-wrapper">
          {images && images.length
            ? images.map((img, index) => (
                <div
                  key={img.id}
                  className={`thumb-item ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                >
                  <img src={img.download_url} alt={img.author} />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}