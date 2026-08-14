import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/movies");
        console.log(response.data);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);



  return (
    <div>
      <Card movies={movies} />
    </div>
  );
};
