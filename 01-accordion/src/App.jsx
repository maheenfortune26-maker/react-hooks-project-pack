import { useState } from 'react'
import './App.css'

const data = [
  { id: 1, question: "What is React?", answer: "React is a JavaScript library for building user interfaces, maintained by Meta." },
  { id: 2, question: "What is useState?", answer: "useState is a React hook that lets you add state to functional components." },
  { id: 3, question: "What is useEffect?", answer: "useEffect is a hook that lets you perform side effects in functional components, like fetching data or subscriptions." },
  { id: 4, question: "What are props?", answer: "Props are inputs to a React component. They are data passed down from a parent component to a child component." },
]

export default function App() {
  const [selected, setSelected] = useState(null)
  const [multiMode, setMultiMode] = useState(false)
  const [multiSelected, setMultiSelected] = useState([])

  function handleSingle(id) {
    setSelected(id === selected ? null : id)
  }

  function handleMulti(id) {
    if (multiSelected.includes(id)) {
      setMultiSelected(multiSelected.filter(item => item !== id))
    } else {
      setMultiSelected([...multiSelected, id])
    }
  }

  const isItemOpen = (id) => multiMode ? multiSelected.includes(id) : selected === id

  const toggleMode = () => {
    setMultiMode(!multiMode)
    setSelected(null)
    setMultiSelected([])
  }

  return (
    <div className="wrapper">
      <div className="container">
        <header className="header">
          <span className="badge">{multiMode ? 'Multi-Select Enabled' : 'Single-Select Mode'}</span>
          <h1>Frequently Asked Questions</h1>
          <p className="subtitle">Click on any question to expand and read the details.</p>
          <button className="toggle-btn" onClick={toggleMode}>
            {multiMode ? 'Switch to Single Select' : 'Switch to Multi Select'}
          </button>
        </header>

        <div className="accordion">
          {data.map(item => {
            const isOpen = isItemOpen(item.id)
            return (
              <div 
                key={item.id} 
                className={`accordion-item ${isOpen ? 'active' : ''}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => multiMode ? handleMulti(item.id) : handleSingle(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="question-text">{item.question}</span>
                  <span className={`icon ${isOpen ? 'open' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <div className={`accordion-collapse ${isOpen ? 'show' : ''}`}>
                  <div className="accordion-body">
                    {item.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}