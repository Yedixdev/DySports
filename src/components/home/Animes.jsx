'use client';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Anime = () => {
   const [anime, setAnime] = useState([]);

   const API_KEY = "fd2aa1886acbdc82f25d5629661a7850";
   const BASE_URL = "https://api.themoviedb.org/3";

   useEffect(() => {
      const fetchAnime = async () => {
         try {
            const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`);
            if (!response.ok) {
               throw new Error("Error al obtener las anime");
            }
            const data = await response.json();
            setAnime(data.results.slice(0, 15)); 
         } catch (error) {
            setError(error.message);
         } finally {
            setLoading(false);
         }
      };

      fetchAnime();

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
      <div className="">
         <div className="flex items-center justify-between pr-5">
            <div className="font-kanit text-2xl italic text-gray-200">Animes y Caricaturas</div>
            <Link
               to="/anime"
               className="font-kanit italic text-gray-200 hover:text-red-600"
            >
               Ver todos los Animes y Caricaturas
            </Link>
         </div>
            <Slider {...sliderSettings}>
               {anime.map((anime) => (
                  <div key={anime.id} className="p-3">
                     <Link
                        to={`/anime/${anime.id}`}
                        className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
                     >
                        {anime.poster_path ? (
                           <img
                              src={`https://image.tmdb.org/t/p/w300${anime.poster_path}`}
                              alt={anime.name}
                              className="rounded-lg shadow-md hover:shadow-xl w-full"
                           />
                        ) : (
                           <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-700 rounded-lg shadow-md hover:shadow-xl">
                              Sin Imagen
                           </div>
                        )}
                        <p className="text-gray-200 mt-2 text-center text-sm font-ubuntu">{anime.name}</p>
                        <p className="text-xs text-gray-400">{anime.first_air_date}</p>
                     </Link>
                  </div>
               ))}
            </Slider>
      </div>
   );
};

export default Anime;
