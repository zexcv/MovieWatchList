import './App.css';
import Header from "./components/Header"
import  { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage';
import Watchlist from './pages/Watchlist';
import Layout from './components/Layout';

function App() {
  


  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<ListPage />} />
            <Route path="watchlist" element={<Watchlist />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
