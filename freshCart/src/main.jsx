import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import TokenContextProvider from './components/Context/TokenContext.jsx'
import CounterContextProvider from './components/Context/CounterContext.jsx'
import "flowbite/dist/flowbite.min.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenContextProvider>
      <CounterContextProvider>
        <App />
      </CounterContextProvider>
    </TokenContextProvider>
  </StrictMode>
)
