import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiMenuFold4Fill, RiMenuFoldFill } from "react-icons/ri";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Acción", path: "/accion" },
    { name: "Animación", path: "/animacion" },
    { name: "Aventura", path: "/aventura" },
    { name: "Comedia", path: "/comedia" },
    { name: "Crimen", path: "/crimen" },
    { name: "Drama", path: "/drama" },
    { name: "Fantasía", path: "/fantasia" },
    { name: "Ficción", path: "/ficcion" },
    { name: "Guerra", path: "/guerra" },
    { name: "Historia", path: "/historia" },
    { name: "Misterio", path: "/misterio" },
    { name: "Romance", path: "/romance" },
    { name: "Suspenso", path: "/suspenso" },
    { name: "Terror", path: "/terror" },
  ];
 
  return (
    <div
      className={`fixed z-50 h-full bg-slate-800 text-gray-200 mt-14 transition-all duration-300 ${
        isOpen ? "w-52" : "w-12"
      }`}
    >
      {/* Botón de toggle */}
      <div className="flex justify-end pt-2 pr-3">
        {isOpen ? (
          <div className=" flex gap-14">
          <div className="font-kanit italic text-gray-400 pt-5">Generos</div>
          <RiMenuFoldFill
            onClick={toggleMenu}
            className="text-xl cursor-pointer hover:text-red-600"
          />
          
          </div>
        ) : (
          <RiMenuFold4Fill
            onClick={toggleMenu}
            className="text-xl cursor-pointer hover:text-red-600"
          />
        )}
        
      </div>
      
      {/* Menú */}
      <div className="flex flex-col items-center gap-3 mt-3">
        
        {menuItems.map((item, index) => (
          
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-2 w-full px-4 cursor-pointer hover:text-red-600 transition duration-300 ${
              location.pathname === item.path ? "text-red-600 font-bold" : ""
            }`}
          >
            {isOpen && <span className="font-kanit italic">{item.name}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
