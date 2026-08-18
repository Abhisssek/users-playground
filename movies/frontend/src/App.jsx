import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";
import { useMovieId } from "./movieIdStore";
import { useNavigate } from "react-router";

export const App = () => {
  const { imdbId, setImdbId } = useMovieId();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const urll = activeSearchTerm ? `http://localhost:3000/movies/search` : `http://localhost:3000/movies`;
        const response = await axios.get(urll, {
          params: activeSearchTerm ? { movieName: activeSearchTerm, page } : { page }
        });
        setMovies(response.data.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page, activeSearchTerm]);



  const handleSearch = async () => {
    setPage(1); // Reset to the first page when a new search is initiated
    setActiveSearchTerm(searchTerm);
  };


  // console.log("movies", movies);

  const handleMovieClick = (imdbId) => {
    setImdbId(imdbId);
    navigate(`/movies/${imdbId}`);
  };

  return (
    <div className="">


      <div className="flex justify-center items-center m-10">
        <label htmlFor="search">Search Movies:</label>
        <input type="text" id="search" placeholder="Enter movie title..." onChange={(e) => setSearchTerm(e.target.value)} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSearch}>
          Search
        </button>
      </div>
      <Card movies={movies} onMovieClick={handleMovieClick} />
      <div className="pagination mt-7 mx-auto flex justify-center gap-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span> {page} </span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};
