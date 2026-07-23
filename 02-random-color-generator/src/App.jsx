import { useState } from 'react'
import './App.css'

export default function App() {
  const [typeOfColor, setTypeOfColor] = useState('hex')
  const [color, setColor] = useState('#9AE1C7')
  const [copied, setCopied] = useState(false)

  const randomColorUtility = (length) => Math.floor(Math.random() * length)

  const handleCreateRandomHexColor = () => {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]
    let hexColor = "#"
    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)]
    }
    setColor(hexColor)
  }

  const handleCreateRandomRgbColor = () => {
    const r = randomColorUtility(256)
    const g = randomColorUtility(256)
    const b = randomColorUtility(256)
    setColor(`rgb(${r}, ${g}, ${b})`)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="color-container" style={{ background: color }}>
      <div className="glass-card">
        <h1>Color Generator</h1>
        
        <div className="btn-group">
          <button 
            className={typeOfColor === 'hex' ? 'active' : ''} 
            onClick={() => setTypeOfColor('hex')}
          >
            HEX Mode
          </button>
          <button 
            className={typeOfColor === 'rgb' ? 'active' : ''} 
            onClick={() => setTypeOfColor('rgb')}
          >
            RGB Mode
          </button>
        </div>

        <button 
          className="generate-btn"
          onClick={typeOfColor === 'hex' ? handleCreateRandomHexColor : handleCreateRandomRgbColor}
        >
          Generate Color ✨
        </button>

        <div className="color-display" onClick={copyToClipboard} title="Click to copy">
          <span className="color-value">{color}</span>
          <span className="copy-hint">
            {copied ? 'Copied to Clipboard! 🎉' : 'Click code to copy'}
          </span>
        </div>
      </div>
    </div>
  )
}