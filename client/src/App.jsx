import { useEffect } from 'react'
import './App.css'
import UnderConstruction from './components/under-construction/UnderConstruction.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import { initializeConsent } from './lib/consent-manager.js'

function App() {
  useEffect(() => {
    initializeConsent()
  }, [])

  return (
    <>
      <UnderConstruction />
      <CookieConsent />
    </>
  )
}

export default App
