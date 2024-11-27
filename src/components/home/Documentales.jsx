'use client';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Documentales = () => {
   const [documentales, setDocumentales] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const API_KEY = "fd2aa1886acbdc82f25d5629661a7850";
   const BASE_URL = "https://api.themoviedb.org/3";

   useEffect(() => {
      const fetchDocumentales = async () => {
         try {
            const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=99`);
            if (!response.ok) {
               throw new Error("Error al obtener las anime");
            }
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
         {loading && <p className="text-gray-200">Cargando documentales...</p>}
         {error && <p className="text-red-500">Error: {error}</p>}

         {!loading && !error && (
            <Slider {...sliderSettings}>
               {documentales.map((documentales) => (
                  <div key={documentales.id} className="p-3">
                     <Link
                        to={`/documentales/${documentales.id}`}
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
                     </Link>
                  </div>
               ))}
            </Slider>
         )}
      </div>
   );
};

export default Documentales;
