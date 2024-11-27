import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Destacadas from "../components/home/Destacadas";
import Peliculas from "../components/home/Peliculas";
import Series from "../components/home/Series";
import Anime from "../components/home/Animes";
import Doramas from "../components/home/Doramas";
import Documentales from "../components/home/Documentales";

const Home = () => {
   return (
      <div className="">
         <Header />
         <Navbar />
         <div className="w-full pt-14 pl-20 bg-[#1b2434] ">
            <Destacadas/>
            <div className="w-[880px] m-4 ">
               <Peliculas/>
               <Series/>
               <Anime/>
               <Doramas/>
               <Documentales/>
            </div>
         </div>
      </div>
   );
};

export default Home;
