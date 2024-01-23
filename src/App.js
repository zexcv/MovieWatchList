import './App.css';
import  { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage';
import Watchlist from './pages/Watchlist';


function App() {
  


  return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<ListPage />} />
            <Route path='watchlist' element={<Watchlist />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
