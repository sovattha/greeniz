import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThirdwebProvider } from 'thirdweb/react'
import { Helmet } from 'react-helmet'

createRoot(document.getElementById('root')!).render(
<StrictMode>
    <Helmet>
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />
    </Helmet>
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
  </StrictMode>,
)
