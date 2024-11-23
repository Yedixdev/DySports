import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Deportes from './pages/pages-header/Deportes';
import EnVivo from './pages/pages-header/EnVivo';
import Estadisticas from './pages/pages-header/Estadisticas';
import Calendarios from './pages/pages-header/Calendarios';
import Basketball from './pages/pages-navbar/Basketball';
import Beisbol from './pages/pages-navbar/Beisbol';
import Boxeo from './pages/pages-navbar/Boxeo';
import ESports from './pages/pages-navbar/E-Sports';
import Formula1 from './pages/pages-navbar/Formula1';
import Futbol from './pages/pages-navbar/Futbol';
import WWE from './pages/pages-navbar/WWE';
import Error from './pages/Error';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/deportes" element={<Deportes />} />
      <Route path="/envivo" element={<EnVivo />} />
      <Route path="/estadisticas" element={<Estadisticas />} />
      <Route path="/calendarios" element={<Calendarios />} />
      <Route path="/basketball" element={<Basketball />} />
      <Route path="/beisbol" element={<Beisbol />} />
      <Route path="/boxeo" element={<Boxeo />} />
      <Route path="/e-sports" element={<ESports />} />
      <Route path="/formula1" element={<Formula1 />} />
      <Route path="/futbol" element={<Futbol />} />
      <Route path="/wwe" element={<WWE />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default AppRoutes;
