import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AddHero from './AddHero.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="App">
      <div className="bg-blue-300 p-6 text-white text-center">
        <h1 className="text-4xl font-bold">Welcome to the Superhero App</h1>
      </div>

      <AddHero />
      <App />
    </div>
  </StrictMode>,
)
