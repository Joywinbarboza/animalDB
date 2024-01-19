import React, { useEffect } from 'react'
import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './Components/Navbar';
import Home from './Components/Home';
// import Navbar2 from './Components/Navbar2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={[<Navbar/>,<Home/>]}></Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App