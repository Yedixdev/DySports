import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiMenuFold4Fill, RiMenuFoldFill } from "react-icons/ri";
import { PiSoccerBallFill, PiBaseballHelmet, PiBasketballBold } from "react-icons/pi";
import { MdSportsMotorsports, MdSportsEsports, MdSportsMma, MdHome } from "react-icons/md";
import { SiWwe } from "react-icons/si";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: <PiSoccerBallFill />, label: "Futbol", path: "/futbol" },
    { icon: <PiBaseballHelmet />, label: "Beisbol", path: "/beisbol" },
    { icon: <PiBasketballBold />, label: "Basketball", path: "/basketball" },
    { icon: <MdSportsMotorsports />, label: "Formula 1", path: "/formula1" },
    { icon: <MdSportsEsports />, label: "E-Sports", path: "/e-sports" },
    { icon: <MdSportsMma />, label: "Boxeo", path: "/boxeo" },
    { icon: <SiWwe />, label: "WWE", path: "/wwe" },
  ];

  return (
    <div
      className={`fixed h-full bg-slate-800 text-gray-200 mt-14 transition-all duration-300 ${
        isOpen ? "w-52" : "w-12"
      }`}
    >
      <div className="flex justify-end pt-2 pr-3">
        {isOpen ? (
          <RiMenuFoldFill
            onClick={toggleMenu}
            className="text-xl cursor-pointer hover:text-red-600"
          />
        ) : (
          <RiMenuFold4Fill
            onClick={toggleMenu}
            className="text-xl cursor-pointer hover:text-red-600"
          />
        )}
      </div>

      <div className="flex flex-col items-center gap-6 mt-5">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-4 w-full px-4 cursor-pointer hover:text-red-600 transition duration-300 ${
              location.pathname === item.path ? "text-red-600 font-bold" : ""
            }`}
          >
            <div className="text-xl">{item.icon}</div>
            {isOpen && <span className="font-kanit italic">{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
