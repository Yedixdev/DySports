import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Anime from './pages/pages-header/Anime';
import Doramas from './pages/pages-header/Doramas';
import Peliculas from './pages/pages-header/Peliculas';
import Series from './pages/pages-header/Series';
import Documental from './pages/pages-header/Documental';

import Accion from './pages/pages-navbar/Accion';
import Animacion from './pages/pages-navbar/Animacion';
import Aventura from './pages/pages-navbar/Aventura';
import Comedia from './pages/pages-navbar/Comedia';
import Crimen from './pages/pages-navbar/Crimen';
import Drama from './pages/pages-navbar/Drama';
import Fantasia from './pages/pages-navbar/Fantasia';
import Ficcion from './pages/pages-navbar/Ficcion';
import Guerra from './pages/pages-navbar/Guerra';
import Historia from './pages/pages-navbar/Historia';
import Misterio from './pages/pages-navbar/Misterio';
import Romance from './pages/pages-navbar/Romance';
import Suspenso from './pages/pages-navbar/Suspenso';
import Terror from './pages/pages-navbar/Terror';
import Error from './pages/Error';
import Destacadas from './components/home/Destacadas';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas del header  */}
      <Route path="/" element={<Home />} />
      <Route path="/anime" element={<Anime />} />
      <Route path="/doramas" element={<Doramas />} />
      <Route path="/peliculas" element={<Peliculas />} />
      <Route path="/series" element={<Series />} />
      <Route path="/documental" element={<Documental />} />

      {/* Rutas del Navbar  */}
      <Route path="/accion" element={<Accion />} />
      <Route path="/animacion" element={<Animacion />} />
      <Route path="/aventura" element={<Aventura />} />
      <Route path="/comedia" element={<Comedia />} />
      <Route path="/crimen" element={<Crimen />} />
      <Route path="/drama" element={<Drama />} />
      <Route path="/fantasia" element={<Fantasia />} />
      <Route path="/ficcion" element={<Ficcion />} />
      <Route path="/guerra" element={<Guerra />} />
      <Route path="/historia" element={<Historia/>} />
      <Route path="/misterio" element={<Misterio />} />
      <Route path="/romance" element={<Romance />} />
      <Route path="/suspenso" element={<Suspenso />} />
      <Route path="/terror" element={<Terror />} />

      {/* Rutas de navegacion de peliculas */}
      <Route path="/destacadas" element={<Destacadas />} />

      {/* Rutas de Paginas no Encontradas */}
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default AppRoutes;
