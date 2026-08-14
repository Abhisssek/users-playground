import React from 'react'
// import { useMovieId } from './MovieIdContext';
export const Card = ({ movies, onMovieClick }) => {
    // console.log(movies);

    // const {setImdbId} = useMovieId();


    
  return (
    <div className='flex flex-wrap gap-4 justify-center'>
        {movies.map((movie) => 
            <div className='cursor-pointer border border-gray-300 rounded-md p-4' onClick={() => onMovieClick(movie.imdbId)} key={movie.imdbId}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <p>{movie.type}</p>

                <img className='w-82 h-98 object-cover' src={movie.poster} alt={movie.title} />
            </div>
        )}
    </div>
  )
}
