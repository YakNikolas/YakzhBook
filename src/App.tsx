import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import CardPage from './pages/CartPage/CartPage';
import CurrentBookPage from './pages/CurrentBookPage/CurrentBookPage';
import NewPage from './pages/NewPage/NewPage';
import SearchPage from './pages/SearchPage/SearchPage'
import Footer from './components/Footer/Footer';

function App() {
  return (<>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<NewPage></NewPage>}></Route>
        <Route path='/Cardpage' element={<CardPage></CardPage>}></Route>
        <Route path='/CurrentBookPage/:isbn13' element={<CurrentBookPage></CurrentBookPage>}></Route>
        <Route path='/SearchPage' element={<SearchPage></SearchPage>}></Route>
        <Route path='*' element={<div className='container'><h1 className='main_title'>We couldn't find this page</h1></div>}/>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
    </>
  );
}

export default App;
