import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Detalles = () => {
   const { id } = useParams();
   const [movie, setMovie] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [watchLink, setWatchLink] = useState(null);

   const API_KEY = "fd2aa1886acbdc82f25d5629661a7850";
   const BASE_URL = "https://api.themoviedb.org/3";

   useEffect(() => {
      const fetchDetails = async () => {
         try {
            const [detailsResponse, providersResponse] = await Promise.all([
               fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`),
               fetch(`${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`),
            ]);

            if (!detailsResponse.ok || !providersResponse.ok) {
               throw new Error("Error en la solicitud");
            }

            const detailsData = await detailsResponse.json();
            const providersData = await providersResponse.json();

            setMovie(detailsData);
            setWatchLink(providersData.results?.US?.link || null);
         } catch (error) {
            setError(error.message);
         } finally {
            setLoading(false);
         }
      };

      fetchDetails();
   }, [id]);

   if (loading) return <p>Cargando detalles...</p>;
   if (error) return <p>Error: {error}</p>;

   return (
      <div className="p-4">
         <h1 className="text-xl font-bold">{movie.title}</h1>
         <p className="text-gray-600">{movie.release_date}</p>
         <p className="mt-2">{movie.overview}</p>
         {movie.poster_path && (
            <img
               src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
               alt={movie.title}
               className="mt-4 rounded"
            />
         )}
         <p className="mt-4">Puntuación: {movie.vote_average}/10</p>
         <p>Géneros: {movie.genres.map((genre) => genre.name).join(", ")}</p>

         {/* Enlace para ver la película en una plataforma */}
         {watchLink ? (
            <a href={watchLink} target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-500">
               Ver en la plataforma
            </a>
         ) : (
            <p className="mt-4 text-gray-600">No disponible en plataformas de streaming</p>
         )}
      </div>
   );
};

export default Detalles;

