import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import './Favorites.css'

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites()

  if (favorites.length === 0) return (
    <div className="empty">
      <p>💔 No favorites yet.</p>
      <Link to="/">Browse recipes →</Link>
    </div>
  )

  return (
    <div className="favorites">
      <h1>Your Favorites ❤️</h1>
      <div className="grid">
        {favorites.map(meal => (
          <div key={meal.idMeal} className="meal-card">
            <Link to={`/recipe/${meal.idMeal}`}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h3>{meal.strMeal}</h3>
            </Link>
            <button onClick={() => removeFavorite(meal.idMeal)}>Remove ✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}
