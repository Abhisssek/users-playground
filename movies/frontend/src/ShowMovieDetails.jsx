import React, { useState } from "react";
import { useParams } from "react-router";

export const ShowMovieDetails = () => {
  const { imdbId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);

  React.useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/movies/${imdbId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovieDetails(data.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [imdbId]);

  console.log("Movie Details:", movieDetails);
  return (
    <div>
      <div>
        <p>{movieDetails?.imdbId}</p>
        <h1>{movieDetails?.title}</h1>
        <p>{movieDetails?.type}</p>
        <p>{movieDetails?.year}</p>
        <img src={movieDetails?.poster} alt={movieDetails?.title} />

      </div>
    </div>
  );
};
