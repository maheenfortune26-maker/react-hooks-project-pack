import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import './RecipeDetail.css'

export default function RecipeDetail() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    async function fetchMeal() {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await res.json()
        setMeal(data.meals?.[0] || null)
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    fetchMeal()
  }, [id])

  if (loading) return <p className="status">Loading recipe...</p>
  if (!meal) return <p className="status">Recipe not found.</p>

  const ingredients = Array.from({ length: 20 }, (_, i) => ({
    ingredient: meal[`strIngredient${i + 1}`],
    measure: meal[`strMeasure${i + 1}`]
  })).filter(item => item.ingredient && item.ingredient.trim())

  const fav = isFavorite(meal.idMeal)

  return (
    <div className="detail">
      <Link to="/" className="back">← Back</Link>
      <div className="detail-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="detail-meta">
          <h1>{meal.strMeal}</h1>
          <p><strong>Category:</strong> {meal.strCategory}</p>
          <p><strong>Cuisine:</strong> {meal.strArea}</p>
          {meal.strYoutube && <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="yt-link">▶ Watch on YouTube</a>}
          <button className={`fav-btn ${fav ? 'faved' : ''}`} onClick={() => fav ? removeFavorite(meal.idMeal) : addFavorite(meal)}>
            {fav ? '❤️ Remove Favorite' : '🤍 Add to Favorites'}
          </button>
        </div>
      </div>
      <div className="detail-body">
        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((item, i) => (
              <li key={i}><span className="dot">•</span> {item.measure} {item.ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="instructions">
          <h2>Instructions</h2>
          <p>{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  )
}
