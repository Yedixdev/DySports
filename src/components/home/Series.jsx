'use client';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Series = () => {
   const [series, setSeries] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

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
            setSeries(data.results.slice(0, 15)); 
         } catch (error) {
            setError(error.message);
         } finally {
            setLoading(false);
         }
      };

      fetchSeries();
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
            <div className="font-kanit text-2xl italic text-gray-200">Series Populares</div>
            <Link
               to="/series"
               className="font-kanit italic text-gray-200 hover:text-red-600"
            >
               Ir a todas las series
            </Link>
         </div>
         {loading && <p className="text-gray-200">Cargando series...</p>}
         {error && <p className="text-red-500">Error: {error}</p>}

         {!loading && !error && (
            <Slider {...sliderSettings}>
               {series.map((serie) => (
                  <div key={serie.id} className="p-3">
                     <Link
                        to={`/serie/${serie.id}`}
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
                     </Link>
                  </div>
               ))}
            </Slider>
         )}
      </div>
   );
};

export default Series;
