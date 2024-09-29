import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './static/css/index.css'
import MainView from './components/views/MainView/MainView.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import GardenView from './components/views/GardenView/GardenView.tsx'
import { UserProvider } from './components/common/UserContext'
import { createTheme, ThemeProvider } from '@mui/material'

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
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>  
        <RouterProvider router={router} />
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
)
