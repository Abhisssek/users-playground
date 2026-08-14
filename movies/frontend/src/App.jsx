import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";
import { useMovieId } from "./movieIdStore";
import { useNavigate } from "react-router";

export const App = () => {
  const { imdbId, setImdbId } = useMovieId();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/movies");
        // console.log(response.data.data);
        setMovies(response.data.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleMovieClick = (imdbId) => {
    setImdbId(imdbId);
    navigate(`/movies/${imdbId}`);
  };

  return (
    <div>
      <Card movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
};
