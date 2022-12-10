import React, { useState, useEffect } from 'react';
import './scss/app.scss';
import Header from './components/Header';
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Card from "./pages/Card"
import NotFound from './pages/NotFound';


import { useSelector, useDispatch } from 'react-redux'


export const SearchContext = React.createContext()

function App() {
  
  const dispatch = useDispatch()


  const [searchValue, setSearchValue] = useState('')
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue,  setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home  />} />
              <Route path="/card" element={<Card />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default App;
