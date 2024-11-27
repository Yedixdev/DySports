import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Películas', path: '/peliculas' },
    { name: 'Series', path: '/series' },
    { name: 'Anime', path: '/anime' },
    { name: 'Doramas', path: '/doramas' },
    { name: 'Documentales', path: '/documental' },
  ];

  return (
    <header className="w-full h-14 fixed bg-slate-800 text-white flex justify-between px-10 items-center z-50 shadow-xl shadow-[#2b384b]">
      <div className="flex items-center">
        <div className="text-2xl font-kanit italic">DyMovies</div>
      </div>

      <nav className="flex gap-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`font-kanit italic hover:text-red-600 transition duration-300 ${
              location.pathname === item.path ? 'border-b-2 border-red-600' : ''
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <button className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300 font-museo">
        Modo
      </button>
    </header>
  );
};

export default Header;
