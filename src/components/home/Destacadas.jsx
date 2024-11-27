'use client';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Destacadas = () => {
   const [movies, setMovies] = useState([]);
   const [genres, setGenres] = useState([]); // Almacena los géneros como un array
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const API_KEY = "fd2aa1886acbdc82f25d5629661a7850";
   const BASE_URL = "https://api.themoviedb.org/3";

   useEffect(() => {
      const fetchMoviesAndGenres = async () => {
         try {
            // Llama a ambas APIs al mismo tiempo
            const [moviesResponse, genresResponse] = await Promise.all([
               fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
               fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
            ]);

            if (!moviesResponse.ok || !genresResponse.ok) {
               throw new Error("Error al obtener datos de la API");
            }

            const moviesData = await moviesResponse.json();
            const genresData = await genresResponse.json();

            setMovies(moviesData.results.slice(0, 4)); 
            setGenres(genresData.genres);
         } catch (error) {
            setError(error.message);
         } finally {
            setLoading(false);
         }
      };

      fetchMoviesAndGenres();
   }, []);

   return (
      <div className="p-4 w-[300px] fixed bg-slate-800 m-4 rounded-lg right-0 shadow-lg">
         <h1 className="text-2xl text-gray-100 font-kanit italic mb-4">
            Películas Destacadas
         </h1>

         {loading && <p className="text-gray-300">Cargando películas...</p>}
         {error && <p className="text-red-500">Error: {error}</p>}

         <div className="flex flex-col gap-4">
            {movies.map((movie) => (
               <div
                  key={movie.id}
                  className="w-[270px] flex border rounded-lg shadow-md bg-gray-100 hover:shadow-lg transition-shadow duration-300"
               >
                  <Link to={`/movie/${movie.id}`} className="flex-shrink-0 m-auto">
                     {movie.poster_path ? (
                        <img
                           src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                           alt={movie.title}
                           className="rounded-l-lg w-16 h-24 object-cover"
                        />
                     ) : (
                        <div className="w-16 h-24 bg-gray-300 flex items-center justify-center text-gray-700">
                           Sin Imagen
                        </div>
                     )}
                  </Link>
                  <div className="flex flex-col justify-between p-2 w-full">
                     <div className="font-lg font-kanit text-sm text-gray-900">{movie.title}</div>
                     <div className="flex flex-wrap gap-1">
                        {movie.genre_ids.map((id) => {
                           const genreName = genres.find((genre) => genre.id === id)?.name;
                           return (
                              <span
                                 key={id}
                                 className="text-[12px] font-medium text-gray-900 bg-gray-300 rounded-lg px-2 py-1"
                              >
                                 {genreName}
                              </span>
                           );
                        })}
                     </div>
                     <div className="text-xs text-gray-600">{movie.release_date}</div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Destacadas;
