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
    <CssBaseline />
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)
