'use client';
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";

const Peliculas = () => {
   const [movies, setMovies] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [currentPage, setCurrentPage] = useState(1);
   const [moviesPerPage] = useState(12); 
   const [isOpen, setIsOpen] = useState(false);
   const [selectedMovieId, setSelectedMovieId] = useState(null);
   const [movieDetails, setMovieDetails] = useState(null);

    const API_KEY = "fd2aa1886acbdc82f25d5629661a7850";
    const BASE_URL = "https://api.themoviedb.org/3";

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=2`);
                if (!response.ok) {
                    throw new Error("Error al obtener las películas");
                }
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPopular();
    }, []);

    // Función para cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Determinar las películas que se mostrarán en la página actual
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    // Calcular el número total de páginas
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(movies.length / moviesPerPage); i++) {
        pageNumbers.push(i);
    }

    const fetchMovieDetails = async (id) => {
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

         setMovieDetails({
            ...detailsData,
            watchLink: providersData.results?.link || null,
         });
      } catch (error) {
         console.error("Error al cargar los detalles de la película:", error.message);
      }
   };

   const openModal = (id) => {
      setSelectedMovieId(id);
      fetchMovieDetails(id);
      setIsOpen(true);
   };

   const closeModal = () => {
      setIsOpen(false);
      setSelectedMovieId(null);
      setMovieDetails(null);
   };


    return (
        <div>
            <Header />
            <Navbar />
            <div className="pt-14 pl-16 w-full bg-[#1b2434]">
                <div className="pt-4">
                    <div className="flex items-center justify-between pr-5">
                        <div className="font-kanit text-2xl italic text-gray-200">Mas Películas Disponibles</div>
                    </div>

                    {loading && <p className="text-gray-200">Cargando películas...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}

                    {!loading && !error && (
                        <div className="xl:w-[1200px] 2xl:w-full justify-center flex flex-wrap">
                            {currentMovies.map((movie) => (
                                <div key={movie.id} onClick={() => openModal(movie.id)}  className="p-4">
                                    <div className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105 cursor-pointer">
                                        {movie.poster_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                                alt={movie.title}
                                                className="rounded-lg shadow-md hover:shadow-xl w-60"
                                            />
                                        ) : (
                                            <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-700 rounded-lg shadow-md hover:shadow-xl">
                                                Sin Imagen
                                            </div>
                                        )}
                                        <p className="text-gray-200 mt-2 text-center text-sm font-ubuntu">
                                            {movie.title}
                                        </p>
                                        <p className="text-xs text-gray-400">{movie.release_date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

{isOpen && selectedMovieId && (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-gray-100 text-gray-100 rounded-lg p-6 xl:w-[800px] md:w-1/2 relative shadow-xl transform transition-transform scale-95 hover:scale-100">
               <button
               onClick={closeModal}
               className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-xl"
               >
               ✖
               </button>

               {movieDetails ? (
               <div className="flex gap-6">
                  <div className="flex-shrink-0">
                     {movieDetails.poster_path && (
                     <img
                        src={`https://image.tmdb.org/t/p/w400${movieDetails.poster_path}`}
                        alt={movieDetails.title}
                        className="rounded-lg shadow-lg w-full"
                     />
                     )}
                  </div>

                  <div className="flex flex-col gap-4">
                     <h1 className="text-2xl font-bold text-red-600">
                     {movieDetails.title}
                     </h1>
                     <p className="text-sm text-gray-800">{movieDetails.overview}</p>
                     <div className="flex flex-wrap gap-2">
                     {movieDetails.genres.map((genre, index) => (
                        <span
                           key={index}
                           className="px-3 py-1 bg-red-600 text-white rounded-full text-xs"
                        >
                           {genre.name}
                        </span>
                     ))}
                     </div>
                     <p className="text-gray-800">
                     <strong>Duración:</strong> {movieDetails.runtime} minutos
                     </p>
                     <p className="text-gray-800">
                     <strong>Puntuación:</strong>{" "}
                     <span className="text-red-600 font-bold">
                        {movieDetails.vote_average}/10
                     </span>
                     </p>
                     <p className="text-gray-800">
                     <strong>Fecha de estreno:</strong> {movieDetails.release_date}
                     </p>

                     {movieDetails.watchLink ? (
                     <a
                        href={movieDetails.watchLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-300 mt-4"
                     >
                        Ver en la plataforma
                     </a>
                     ) : (
                     <p className="text-gray-500 mt-4">
                        No disponible en plataformas de streaming
                     </p>
                     )}
                  </div>
               </div>
               ) : (
               <p className="text-gray-400">Cargando detalles...</p>
               )}
            </div>
         </div>
         )}
                    {/* Paginación */}
                    <div className="flex justify-center mt-6">
                        <nav>
                            <ul className="flex space-x-2">
                                {pageNumbers.map((number) => (
                                    <li key={number}>
                                        <button
                                            onClick={() => paginate(number)}
                                            className={`px-4 py-2 border rounded-lg text-gray-200 ${currentPage === number ? 'bg-red-600' : 'bg-gray-800'}`}
                                        >
                                            {number}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Peliculas;
