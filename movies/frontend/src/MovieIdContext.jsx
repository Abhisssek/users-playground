import { useState } from 'react'
import { MovieIdContext } from './movieIdStore'

export const MovieIdProvider = ({children}) => {
  const [imdbId, setImdbId] = useState(null)

 return (
    <MovieIdContext.Provider value={{imdbId, setImdbId}}>
        {children}
    </MovieIdContext.Provider>
  )
}   

