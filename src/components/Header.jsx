import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  return (
    <header className="w-full h-14 fixed bg-slate-800 text-white flex justify-between px-10 items-center shadow-md">
      <div className="flex items-center">
        <div className='text-2xl font-kanit italic'>DySports</div>
      </div>

      <nav className="flex gap-8">
      <Link
        to="/"
        className={` font-kanit italic hover:text-red-600 transition duration-300 ${
          location.pathname === "/" ? "border-b-2 border-red-600" : ""
        }`}
      >
        Home
      </Link>
      <Link
        to="/deportes"
        className={` font-kanit italic hover:text-red-600 transition duration-300 ${
          location.pathname === "/deportes" ? "border-b-2 border-red-600" : ""
        }`}
      >
        Deportes
      </Link>
      <Link
        to="/envivo"
        className={` font-kanit italic hover:text-red-600 transition duration-300 ${
          location.pathname === "/envivo" ? "border-b-2 border-red-600" : ""
        }`}
      >
        En Vivo
      </Link>
      <Link
        to="/estadisticas"
        className={` font-kanit italic hover:text-red-600 transition duration-300 ${
          location.pathname === "/estadisticas" ? "border-b-2 border-red-600" : ""
        }`}
      >
        Estadísticas
      </Link>
      <Link
        to="/calendarios"
        className={` font-kanit italic hover:text-red-600 transition duration-300 ${
          location.pathname === "/calendarios" ? "border-b-2 border-red-600" : ""
        }`}
      >
        Calendarios
      </Link>
    </nav>

      <button className="bg-gray-700 px-4 py-2 rounded-lg  hover:bg-gray-600 transition duration-300 font-museo">
        Modo
      </button>
    </header>
  );
};

export default Header;
