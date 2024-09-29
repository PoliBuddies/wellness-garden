import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './static/css/index.css'
import { UserProvider } from './components/common/UserContext'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import MainView from './components/views/MainView/MainView.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import GardenView from './components/views/GardenView/GardenView.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import JournalView from './components/views/JournalView/JournalView.tsx'

const theme = createTheme({
  palette: {
    primary: {
      main: '#312F2F',
    },
    secondary: {
      main: '#F1F5F9',
    },
  },
  typography: {
    fontFamily: "Fredoka, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          letterSpacing: "1px",
          borderWidth: "2px",
        }
      }
    }
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView />
  },
  {
    path: "/garden",
    element: <GardenView></GardenView>
  },
  {
    path: "/journal",
    element: <JournalView />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
