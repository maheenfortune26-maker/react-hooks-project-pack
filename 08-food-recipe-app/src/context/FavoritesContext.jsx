import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  function addFavorite(meal) {
    setFavorites(prev => [...prev, meal])
  }

  function removeFavorite(id) {
    setFavorites(prev => prev.filter(m => m.idMeal !== id))
  }

  function isFavorite(id) {
    return favorites.some(m => m.idMeal === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
