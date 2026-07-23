import { useState } from 'react'
import './App.css'

export default function App({ noOfStars = 5 }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex)
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex)
  }

  function handleMouseLeave() {
    setHover(rating)
  }

  return (
    <div className="star-wrapper">
      <div className="star-card">
        <h1>Rate Your Experience</h1>
        <p className="subtitle">How would you rate this project?</p>
        
        <div className="stars-container">
          {[...Array(noOfStars)].map((_, index) => {
            index += 1
            return (
              <span
                key={index}
                className={`star ${index <= (hover || rating) ? 'active' : ''}`}
                onClick={() => handleClick(index)}
                onMouseMove={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave()}
              >
                ★
              </span>
            )
          })}
        </div>

        <div className="rating-status">
          {rating > 0 ? (
            <span className="badge">You rated: {rating} / {noOfStars} Stars ⭐</span>
          ) : (
            <span className="badge muted">Click a star to rate</span>
          )}
        </div>
      </div>
    </div>
  )
}