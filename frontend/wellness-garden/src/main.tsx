import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './static/css/index.css'
import MainView from './components/views/MainView/MainView.tsx'
import CssBaseline from '@mui/material/CssBaseline'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView />
  },
  {
    path: "/garden",
    element: <div>garden</div>    // Replace with garden view
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </StrictMode>,
)
