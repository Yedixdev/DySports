'use client'
import { useState, useEffect } from "react";

const Destacadas = () => {
   const [movies, setMovies] = useState([]); 
   const [loading, setLoading] = useState(true); 
   const [error, setError] = useState(null); 

   const API_KEY = "fd2aa1886acbdc82f25d5629661a7850";
   const BASE_URL = "https://api.themoviedb.org/3";

   useEffect(() => {
      const fetchPopular = async () => {
         try {
            const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
            if (!response.ok) {
               throw new Error("Error al obtener las películas");
            }
            const data = await response.json();
            setMovies(data.results); // Actualiza el estado con las películas
         } catch (error) {
            setError(error.message); // Guarda el mensaje de error
         } finally {
            setLoading(false); // Detén el indicador de carga
         }
      };

      fetchPopular(); 
   }, []);

   return (
      <div className="p-4 w-[360px] absolute z-10 bg-slate-800 m-4 rounded-lg ">
         <h1 className="text-xl text-gray-100 font-kanit italic  mb-4">Películas Destacadas</h1>

         {loading && <p>Cargando películas...</p>}

         {error && <p className="text-red-500">Error: {error}</p>}

         <div className=" flex flex-wrap justify-center gap-4 ">
            {movies.map((movie) => (
               <div
               key={movie.id}
               className="w-24 border rounded p-2 shadow flex flex-col items-center text-center bg-slate-100"
            >
               {movie.poster_path ? (
                  <img
                     src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                     alt={movie.title}
                     className="rounded w-24 mb-2"
                  />
               ) : (
                  <div className="w-24 h-32 bg-gray-300 flex items-center justify-center text-gray-700 mb-2">
                     Sin Imagen
                  </div>
               )}
               <div className="text-xs font-medium truncate w-full">
                  {movie.title}
               </div>
               <p className="text-xs text-gray-500">{movie.release_date}</p>
            </div>
            ))}
         </div>
      </div>
   );
};

export default Destacadas;
