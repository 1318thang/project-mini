import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import theme from './theme.ts'
import { CssBaseline, ThemeProvider } from '@mui/material'
import '../src/style/swiper.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* reset css mặc định MUI */}
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
