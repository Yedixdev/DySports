import './App.css'
import { BrowserRouter } from 'react-router-dom';
import RoutesHeader from './routes/routes-header';
import Header from './components/Header';
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Navbar/>
      
      <RoutesHeader />
    </BrowserRouter>
  )
}

export default App
