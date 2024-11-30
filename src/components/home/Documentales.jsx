"use client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Documentales = () => {
  const [documentales, setDocumentales] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDocumentalesId, setSelectedDocumentalesId] = useState(null);
  const [documentalesDetails, setDocumentalesDetails] = useState(null);

  const API_KEY = "fd2aa1886acbdc82f25d5629661a7850";
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchDocumentales = async () => {
      try {
        const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=99`);
        if (!response.ok) throw new Error("Error al obtener los documentales");
        const data = await response.json();
        setDocumentales(data.results.slice(0, 15));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentales();
  }, []);

  const fetchDocumentalesDetails = async (id) => {
    try {
      const [detailsResponse, providersResponse] = await Promise.all([
        fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`),
        fetch(`${BASE_URL}/tv/${id}/watch/providers?api_key=${API_KEY}`),
      ]);

      if (!detailsResponse.ok || !providersResponse.ok) {
        throw new Error("Error al obtener los detalles del documental");
      }

      const detailsData = await detailsResponse.json();
      const providersData = await providersResponse.json();

      setDocumentalesDetails({
        ...detailsData,
        watchLink: providersData.results?.US?.link || null,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const openModal = (id) => {
    setSelectedDocumentalesId(id);
    setIsOpen(true);
    fetchDocumentalesDetails(id);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedDocumentalesId(null);
    setDocumentalesDetails(null);
  };
   const sliderSettings = {
      speed: 500,
      slidesToShow: 4, 
      slidesToScroll: 1,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 4,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
            },
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
            },
         },
      ],
   };

   return (
      <div className="p-4">
         <div className="flex items-center justify-between pr-5">
            <div className="font-kanit text-2xl italic text-gray-200">Documentales Populares</div>
            <Link
               to="/anime"
               className="font-kanit italic text-gray-200 hover:text-red-600"
            >
               Ver todos los documentales
            </Link>
         </div>
         <Slider {...sliderSettings}>
            {documentales.map((documentales) => (
               <div key={documentales.id} className="p-3">
                  <div
                     onClick={() => openModal(documentales.id)}
                     className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
                  >
                     {documentales.poster_path ? (
                        <img
                           src={`https://image.tmdb.org/t/p/w300${documentales.poster_path}`}
                           alt={documentales.name}
                           className="rounded-lg shadow-md hover:shadow-xl w-full"
                        />
                     ) : (
                        <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-700 rounded-lg shadow-md hover:shadow-xl">
                           Sin Imagen
                        </div>
                     )}
                     <p className="text-gray-200 mt-2 text-center text-sm font-ubuntu">{documentales.name}</p>
                     <p className="text-xs text-gray-400">{documentales.first_air_date}</p>
                  </div>
               </div>
            ))}
         </Slider>
         {isOpen && selectedDocumentalesId && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
               <div className="bg-gray-100 text-gray-100 rounded-lg p-6 xl:w-[800px] md:w-1/2 relative shadow-xl transform transition-transform scale-95 hover:scale-100">
                  <button
                     onClick={closeModal}
                     className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-xl"
                  >
                     ✖
                  </button>

                  {documentalesDetails ? (
                     <div className="flex gap-6">
                        <div className="flex-shrink-0">
                           {documentalesDetails.poster_path && (
                              <img
                                 src={`https://image.tmdb.org/t/p/w400${documentalesDetails.poster_path}`}
                                 alt={documentalesDetails.name}
                                 className="rounded-lg shadow-lg w-full"
                              />
                           )}
                        </div>

                        <div className="flex flex-col gap-4">
                           <h1 className="text-2xl font-bold text-red-600">{documentalesDetails.name}</h1>
                           <p className="text-sm text-gray-800">{documentalesDetails.overview}</p>
                           <div className="flex flex-wrap gap-2">
                              {documentalesDetails.genres.map((genre, index) => (
                                 <span
                                    key={index}
                                    className="px-3 py-1 bg-red-600 text-white rounded-full text-xs"
                                 >
                                    {genre.name}
                                 </span>
                              ))}
                           </div>
                           <p className="text-gray-800">
                              <strong>Temporadas:</strong> {documentalesDetails.number_of_seasons}
                           </p>
                           <p className="text-gray-800">
                              <strong>Capítulos:</strong> {documentalesDetails.number_of_episodes}
                           </p>
                           <p className="text-gray-800">
                              <strong>Puntuación:</strong>{" "}
                              <span className="text-red-600 font-bold">
                                 {documentalesDetails.vote_average}/10
                              </span>
                           </p>
                           <p className="text-gray-800">
                              <strong>Fecha de estreno:</strong> {documentalesDetails.first_air_date}
                           </p>

                           {documentalesDetails.watchLink ? (
                              <a
                                 href={documentalesDetails.watchLink}
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

export default Documentales;
