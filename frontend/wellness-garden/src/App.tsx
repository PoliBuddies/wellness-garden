import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom'
import MainView from './components/views/MainView/MainView.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import GardenView from './components/views/GardenView/GardenView.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import JournalView from './components/views/JournalView/JournalView.tsx'

const App = () => {
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

  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainView />} />
          <Route path="/garden" element={<GardenView />} />
          <Route path="/journal" element={<JournalView />} />
          <Route path="/tree" element={<GardenView />} />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App;