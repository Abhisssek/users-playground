import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import axios from "axios";

configDotenv();
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());



const API_URL = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&`

const getMovies = async (req, res) => {
    try {
        const { page=1 } = req.query;
        const response = await axios.get(API_URL, {
            s: "movie",
            page: page
        });
        if (response.data.Response === "False" || !response.data.Search) {
            return res.status(404).json({ error: "Movies not found" });
        }
         console.log(response.data.totalResults);
        const totalResults = parseInt(response.data.totalResults);
        const data = response.data.Search.map(movie => ({
            imdbId: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            type: movie.Type,
            poster: movie.Poster
        }));
        res.status(200).json({message: "Movies found", data, totalResults});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get movies" });
    }
}

const searchMovies = async (req, res) => {
    try {
        let { movieName, page=1 } = req.query;
        // const { page } = req.query;

        if (!movieName) {
            return res.status(400).json({ error: "Movie name parameter is required" });
        }
      
       
        movieName = encodeURIComponent(movieName);
        console.log(movieName);

        const response = await axios.get(API_URL, {
            s: movieName,
            page: page
        } );
        if (response.data.Response === "False" || !response.data.Search) {
            return res.status(404).json({ error: "Movies not found" });
        }
        const data = response.data.Search.map(movie => ({
            imdbId: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            type: movie.Type,
            poster: movie.Poster
        }));
       
        
        const totalResults = parseInt(response.data.totalResults);
        res.status(200).json({message: "Movies found", data, totalResults});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to search movies" });
    }
}



const searchMoviesById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID parameter is required" });
        }


        const response = await axios.get(API_URL, {
            i: id
        });
        if (!response.data || response.data.Response === "False") {
            return res.status(404).json({ error: "Movie not found" });
        }
        
        const data = {
            imdbId: response.data.imdbID,
            title: response.data.Title,
            year: response.data.Year,
            type: response.data.Type,
            poster: response.data.Poster
        };
        res.status(200).json({message: "Movie found", data});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to search movies by ID" });
    }

}



app.get("/movies", getMovies);
app.get("/movies/search", searchMovies);
app.get("/movies/:id", searchMoviesById);



app.listen(3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
