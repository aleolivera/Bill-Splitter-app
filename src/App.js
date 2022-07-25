import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from './pages/Index';
import Header from './components/Header';
import Footer from './components/Footer';
import Bill from './pages/Bill';
import Expences from './pages/Expences';

function App() {
  return (
    <div className='container'>
      
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='expences' element={<Expences/>}/>
          <Route path='bill' element={<Bill/>}/>
          <Route path="*" element={<Index/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
