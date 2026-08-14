import { createContext, useContext } from 'react'

export const MovieIdContext = createContext(null)

export const useMovieId = () => {
  return useContext(MovieIdContext)
}
