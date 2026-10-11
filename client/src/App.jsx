import { useEffect, useState } from 'react'
import './App.css'
import UnderConstruction from './components/under-construction/UnderConstruction'
import CookieConsent from './components/CookieConsent.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import WorkspaceLayout from './components/workspace/WorkspaceLayout.jsx'
import { initializeConsent } from './lib/consent-manager.js'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { WorkspaceProvider } from './context/WorkspaceContext.jsx'

function AppContent() {
  const [showLoader, setShowLoader] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    initializeConsent()
  }, [])

  const handleLoadComplete = () => {
    setShowLoader(false)
    // Small delay so the fade-out of the loader finishes before content appears
    setTimeout(() => setContentVisible(true), 1000)
  }

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleLoadComplete} />}

      <main
        className="relative min-h-screen w-full flex flex-col bg-background text-foreground transition-colors duration-300"
        style={{
          opacity: contentVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <UnderConstruction />
        {/* <WorkspaceLayout /> */}
        <CookieConsent />
      </main>
    </>
  )
}


function App() {
  return (
    <ThemeProvider>
      <WorkspaceProvider>
        <AppContent />
      </WorkspaceProvider>
    </ThemeProvider>
  )
}

export default App

