import { useState, useRef } from 'react'
import './App.css'

function getWeatherIcon(code) {
  if (code === 0) return '☀️'
  if (code <= 2) return '⛅'
  if (code === 3) return '☁️'
  if (code <= 48) return '🌫️'
  if (code <= 57) return '🌦️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌧️'
  if (code <= 86) return '🌨️'
  if (code <= 99) return '⛈️'
  return '🌤️'
}

function getWeatherDesc(code) {
  if (code === 0) return 'Clear Sky'
  if (code <= 2) return 'Partly Cloudy'
  if (code === 3) return 'Overcast'
  if (code <= 48) return 'Foggy'
  if (code <= 57) return 'Drizzle'
  if (code <= 67) return 'Rainy'
  if (code <= 77) return 'Snowy'
  if (code <= 82) return 'Rain Showers'
  if (code <= 86) return 'Snow Showers'
  if (code <= 99) return 'Thunderstorm'
  return 'Unknown'
}

export default function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  async function fetchWeather(e) {
    e.preventDefault()
    if (!city.trim()) return
    setLoading(true)
    setError('')
    setWeather(null)

    try {
      // Step 1: Geocode city name → coordinates (no key needed)
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`)
      const geoData = await geoRes.json()

      if (!geoData.results || geoData.results.length === 0) throw new Error('City not found')

      const { latitude, longitude, name, country } = geoData.results[0]

      // Step 2: Fetch weather using coordinates
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&temperature_unit=celsius`
      )
      const weatherData = await weatherRes.json()
      const current = weatherData.current

      setWeather({
        name,
        country,
        temp: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        wind: current.wind_speed_10m,
        code: current.weather_code,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="app">
      <div className="card">
        <h1>🌤 Weather App</h1>
        <form onSubmit={fetchWeather} className="search-form">
          <input ref={inputRef} value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city name..." />
          <button type="submit" disabled={loading}>Search</button>
        </form>
        {loading && <p className="status">Fetching weather...</p>}
        {error && <p className="error">❌ {error}</p>}
        {weather && (
          <div className="weather-info">
            <div className="icon">{getWeatherIcon(weather.code)}</div>
            <h2>{weather.name}, {weather.country}</h2>
            <p className="temp">{weather.temp}°C</p>
            <p className="desc">{getWeatherDesc(weather.code)}</p>
            <div className="details">
              <div><span>Feels Like</span><strong>{weather.feelsLike}°C</strong></div>
              <div><span>Humidity</span><strong>{weather.humidity}%</strong></div>
              <div><span>Wind</span><strong>{weather.wind} km/h</strong></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
