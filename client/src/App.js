import logo from './logo.svg';
import './App.css';
import { Route, Routes,Navigate, BrowserRouter } from "react-router-dom";
import React from 'react'
import HomePage from './pages/homePage';

const App = () => {
  return (
    <BrowserRouter>
   
    <Routes>
      <Route path="/">
        <Route index element={<HomePage/>}/>

      </Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
