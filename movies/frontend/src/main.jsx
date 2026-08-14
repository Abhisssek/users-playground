import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import {App} from './App.jsx'
import { ShowMovieDetails } from './ShowMovieDetails.jsx'
import { MovieIdProvider } from './MovieIdContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/movies/:imdbId",
    element: <ShowMovieDetails />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieIdProvider>
      <RouterProvider router={router} />
    </MovieIdProvider>
  </StrictMode>,
)
