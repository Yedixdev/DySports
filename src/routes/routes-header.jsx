import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Deportes from '../pages/pages-header/Deportes';
import EnVivo from '../pages/pages-header/EnVivo';
import Estadisticas from '../pages/pages-header/Estadisticas';
import Calendarios from '../pages/pages-header/Calendarios';
import Error from '../pages/Error'

const RoutesHeader = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/deportes" element={<Deportes />} />
      <Route path="/envivo" element={<EnVivo/>} />
      <Route path="/Estadisticas" element={<Estadisticas />} />
      <Route path="/Calendarios" element={<Calendarios />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default RoutesHeader;
