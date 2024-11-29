'use client';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Series = () => {
   const [series, setSeries] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const [selectedSerieId, setSelectedSerieId] = useState(null);
   const [serieDetails, setSerieDetails] = useState(null);
   const [isDetailsLoading, setIsDetailsLoading] = useState(false); 

   const API_KEY = "fd2aa1886acbdc82f25d5629661a7850";
   const BASE_URL = "https://api.themoviedb.org/3";

   useEffect(() => {
      const fetchSeries = async () => {
         try {
            const response = await fetch(`${BASE_URL}/trending/tv/day?api_key=${API_KEY}`);
            if (!response.ok) {
               throw new Error("Error al obtener las series");
            }
            const data = await response.json();
            setSeries(data.results.slice(0, 15)); // Obtiene las primeras 15 series populares
         } catch (error) {
            console.error("Error al obtener las series:", error.message);
         }
      };

      fetchSeries();
   }, []);

   const fetchSerieDetails = async (id) => {
      try {
         setIsDetailsLoading(true); // Inicia la carga
         const [detailsResponse, providersResponse] = await Promise.all([
            fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`),
            fetch(`${BASE_URL}/tv/${id}/watch/providers?api_key=${API_KEY}`),
         ]);

         if (!detailsResponse.ok || !providersResponse.ok) {
            throw new Error("Error al obtener los detalles de la serie");
         }

         const detailsData = await detailsResponse.json();
         const providersData = await providersResponse.json();

         setSerieDetails({
            ...detailsData,
            watchLink: providersData.results?.link || null,
         });
      } catch (error) {
         console.error("Error al cargar los detalles de la serie:", error.message);
      } finally {
         setIsDetailsLoading(false); // Finaliza la carga
      }
   };

   const openModal = (id) => {
      setSelectedSerieId(id);
      fetchSerieDetails(id);
      setIsOpen(true);
   };

   const closeModal = () => {
      setIsOpen(false);
      setSelectedSerieId(null);
      setSerieDetails(null);
   };

   const sliderSettings = {
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
         { breakpoint: 1024, settings: { slidesToShow: 4 } },
         { breakpoint: 768, settings: { slidesToShow: 2 } },
         { breakpoint: 480, settings: { slidesToShow: 1 } },
      ],
   };

   return (
      <div className="p-4">
         <div className="flex items-center justify-between pr-5">
            <div className="font-kanit text-2xl italic text-gray-200">Series Populares</div>
            <Link
               to="/series"
               className="font-kanit italic text-gray-200 hover:text-red-600"
            >
               Ir a todas las series
            </Link>
         </div>

         <Slider {...sliderSettings}>
            {series.map((serie) => (
               <div key={serie.id} className="p-3">
                  <div
                     onClick={() => openModal(serie.id)}
                     className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
                  >
                     {serie.poster_path ? (
                        <img
                           src={`https://image.tmdb.org/t/p/w300${serie.poster_path}`}
                           alt={serie.name}
                           className="rounded-lg shadow-md hover:shadow-xl w-full"
                        />
                     ) : (
                        <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-700 rounded-lg shadow-md hover:shadow-xl">
                           Sin Imagen
                        </div>
                     )}
                     <p className="text-gray-200 mt-2 text-center text-sm font-ubuntu">{serie.name}</p>
                     <p className="text-xs text-gray-400">{serie.first_air_date}</p>
                  </div>
               </div>
            ))}
         </Slider>

         {isOpen && selectedSerieId && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
               <div className="bg-gray-100 text-gray-100 rounded-lg p-6 xl:w-[800px] md:w-1/2 relative shadow-xl transform transition-transform scale-95 hover:scale-100">
                  <button
                     onClick={closeModal}
                     className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-xl"
                  >
                     ✖
                  </button>

                  {serieDetails ? (
                     <div className="flex gap-6">
                        <div className="flex-shrink-0">
                           {serieDetails.poster_path && (
                              <img
                                 src={`https://image.tmdb.org/t/p/w400${serieDetails.poster_path}`}
                                 alt={serieDetails.name}
                                 className="rounded-lg shadow-lg w-full"
                              />
                           )}
                        </div>

                        <div className="flex flex-col gap-4">
                           <h1 className="text-2xl font-bold text-red-600">{serieDetails.name}</h1>
                           <p className="text-sm text-gray-800">{serieDetails.overview}</p>
                           <div className="flex flex-wrap gap-2">
                              {serieDetails.genres.map((genre, index) => (
                                 <span
                                    key={index}
                                    className="px-3 py-1 bg-red-600 text-white rounded-full text-xs"
                                 >
                                    {genre.name}
                                 </span>
                              ))}
                           </div>
                           <p className="text-gray-800">
                              <strong>Temporadas:</strong> {serieDetails.number_of_seasons}
                           </p>
                           <p className="text-gray-800">
                              <strong>Capítulos:</strong> {serieDetails.number_of_episodes}
                           </p>
                           <p className="text-gray-800">
                              <strong>Puntuación:</strong>{" "}
                              <span className="text-red-600 font-bold">
                                 {serieDetails.vote_average}/10
                              </span>
                           </p>
                           <p className="text-gray-800">
                              <strong>Fecha de estreno:</strong> {serieDetails.first_air_date}
                           </p>

                           {serieDetails.watchLink ? (
                              <a
                                 href={serieDetails.watchLink}
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
      </div>
   );
};

export default Series;
