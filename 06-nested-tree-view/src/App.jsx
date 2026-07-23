import { useState } from 'react'
import './App.css'

const menus = [
  { label: 'Home', to: '/' },
  {
    label: 'Profile',
    to: '/profile',
    children: [
      { label: 'Details', to: 'details' },
      {
        label: 'Location',
        to: 'location',
        children: [{ label: 'City', to: 'city' }],
      },
    ],
  },
  {
    label: 'Settings',
    to: '/settings',
    children: [
      { label: 'Account', to: 'account' },
      { label: 'Security', to: 'security' },
    ],
  },
]

function MenuItem({ item }) {
  const [displayCurrentChildren, setDisplayCurrentChildren] = useState({})

  function handleToggleChildren(getCurrentlabel) {
    setDisplayCurrentChildren({
      ...displayCurrentChildren,
      [getCurrentlabel]: !displayCurrentChildren[getCurrentlabel],
    })
  }

  const hasChildren = item && item.children && item.children.length > 0
  const isOpen = displayCurrentChildren[item.label]

  return (
    <li className="tree-item">
      <div 
        className="tree-item-content" 
        onClick={() => hasChildren && handleToggleChildren(item.label)}
      >
        <div className="item-left">
          <span className="folder-icon">{hasChildren ? (isOpen ? '📂' : '📁') : '📄'}</span>
          <span className="item-label">{item.label}</span>
        </div>
        {hasChildren && (
          <span className="toggle-btn">
            {isOpen ? '−' : '+'}
          </span>
        )}
      </div>

      {hasChildren && isOpen && (
        <MenuList list={item.children} />
      )}
    </li>
  )
}

function MenuList({ list = [] }) {
  return (
    <ul className="tree-list">
      {list && list.length
        ? list.map((listItem, idx) => <MenuItem key={idx} item={listItem} />)
        : null}
    </ul>
  )
}

export default function App() {
  return (
    <div className="tree-container">
      <div className="tree-card">
        <header className="tree-header">
          <span className="badge">Recursive Menu</span>
          <h2>Nested Tree View</h2>
          <p className="subtitle">Click items to toggle nested branches</p>
        </header>
        <MenuList list={menus} />
      </div>
    </div>
  )
}