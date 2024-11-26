import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Destacadas from "../components/home/Destacadas";

const Home = () => {
   return (
      <div className="">
         <Header />
         <Navbar />
         <div className="pt-14 pl-12 bg-black ">
            <Destacadas/>
         </div>
      </div>
   );
};

export default Home;
