import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import TokenContextProvider from './components/Context/TokenContext.jsx'
import CounterContextProvider from './components/Context/CounterContext.jsx'
import "flowbite/dist/flowbite.min.js"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './components/Context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenContextProvider>
      <CartContextProvider>
      <CounterContextProvider>
        <App />
      </CounterContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  </StrictMode>
)
