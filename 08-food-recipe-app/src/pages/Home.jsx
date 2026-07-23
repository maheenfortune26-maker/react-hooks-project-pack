import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import './Home.css'

const CATEGORIES = ['All', 'Beef', 'Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian']

export default function Home() {
  const [query, setQuery] = useState('')
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('All')
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    fetchByCategory('Chicken')
  }, [])

  async function fetchByCategory(cat) {
    setLoading(true)
    try {
      const url = cat === 'All'
        ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
      const res = await fetch(url)
      const data = await res.json()
      setMeals(data.meals || [])
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      const data = await res.json()
      setMeals(data.meals || [])
      setCategory('All')
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  function handleCategory(cat) {
    setCategory(cat)
    setQuery('')
    fetchByCategory(cat)
  }

  function toggleFav(e, meal) {
    e.preventDefault()
    isFavorite(meal.idMeal) ? removeFavorite(meal.idMeal) : addFavorite(meal)
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>Find Your Next Recipe 🍴</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search meals..." />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="categories">
        {CATEGORIES.map(c => (
          <button key={c} className={category === c ? 'active' : ''} onClick={() => handleCategory(c)}>{c}</button>
        ))}
      </div>
      {loading ? <p className="status">Loading meals...</p> : (
        <div className="grid">
          {meals.length === 0 && <p className="status">No meals found.</p>}
          {meals.map(meal => (
            <Link to={`/recipe/${meal.idMeal}`} key={meal.idMeal} className="meal-card">
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <div className="meal-info">
                <h3>{meal.strMeal}</h3>
                <button className={`fav-btn ${isFavorite(meal.idMeal) ? 'faved' : ''}`} onClick={e => toggleFav(e, meal)}>
                  {isFavorite(meal.idMeal) ? '❤️' : '🤍'}
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
