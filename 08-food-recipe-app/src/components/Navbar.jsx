import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import './Navbar.css'

export default function Navbar() {
  const { favorites } = useFavorites()
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🍽 RecipeApp</Link>
      <Link to="/favorites" className="fav-link">
        ❤️ Favorites {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
      </Link>
    </nav>
  )
}
