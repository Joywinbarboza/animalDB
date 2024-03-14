import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from './Components/Navbar';
import Navbar from "./layouts/Navbar/Navbar.jsx";
import Home from "./pages/home/Home.jsx";
// import login from './pages/login/Login.jsx'
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import VisitUs from "./pages/visitUs/visitUs.jsx";
import YourBook from "./pages/YourBooking/YourBook.jsx";
import PrevBook from "./pages/prevBook/prevBook.jsx";
import Donate from "./pages/donate/donate.jsx";
// import Navbar2 from './Components/Navbar2';

function App() {
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     const message = 'Are you sure you want to leave?';
  //     event.returnValue = message; // Standard for most browsers
  //     return message; // For some older browsers
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={[<Navbar />, <Home />]}></Route>
        <Route path="/visit" element={[<Navbar />, <VisitUs />]}></Route>
        <Route path="/donate" element={[<Navbar />, <Donate />]}></Route>
        <Route path="/login" element={[<Navbar />, <Login />]}></Route>
        <Route path="/signUp" element={[<Navbar />, <SignUp />]}></Route>
        {/* //changed here */}
        <Route path="/yb" element={[<Navbar />, <YourBook />]}></Route>
        <Route path="/pb" element={[<Navbar />, <PrevBook />]}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
