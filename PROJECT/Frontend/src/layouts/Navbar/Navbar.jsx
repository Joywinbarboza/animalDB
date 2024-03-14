import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar2() {
  const [show_orange, setshow_orange] = useState("");
  const [show_blue, setshow_blue] = useState("hidden");
  const [show_green, setshow_green] = useState("hidden");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location);

    if (location.pathname === "/login" || location.pathname === "/signup") {
      // If the current location is /login or /signup, hide the colored bars
      setshow_orange("hidden");
      setshow_blue("hidden");
      setshow_green("hidden");
    } else {
      // If not, retrieve and set the color states from local storage
      const orangeState = localStorage.getItem("show_orange");
      const blueState = localStorage.getItem("show_blue");
      const greenState = localStorage.getItem("show_green");

      setshow_orange(orangeState);
      setshow_blue(blueState);
      setshow_green(greenState);
    }
  }, []);

  function pressOrange() {
    navigate("/");
    setshow_orange("");
    setshow_blue("hidden");
    setshow_green("hidden");
    // Update local storage
    localStorage.setItem("show_orange", "");
    localStorage.setItem("show_blue", "hidden");
    localStorage.setItem("show_green", "hidden");
  }

  function pressBlue() {
    navigate("/visit");
    setshow_orange("hidden");
    setshow_blue("");
    setshow_green("hidden");
    // Update local storage
    localStorage.setItem("show_orange", "hidden");
    localStorage.setItem("show_blue", "");
    localStorage.setItem("show_green", "hidden");
  }

  function pressGreen() {
    navigate("/donate");
    setshow_orange("hidden");
    setshow_blue("hidden");
    setshow_green("");
    // Update local storage
    localStorage.setItem("show_orange", "hidden");
    localStorage.setItem("show_blue", "hidden");
    localStorage.setItem("show_green", "");
  }

  function handleLogin() {
    const email = localStorage.getItem("email");

    if (email !== "null" && email !== "") {
      // User is logged in, perform logout
      localStorage.setItem("username", null);
      localStorage.setItem("email", null);

      // Clear adult and child counts
      var id;
      for (id = 1; id <= 3; id++) {
        localStorage.setItem(`adultCount${id}`, "0");
        localStorage.setItem(`childCount${id}`, "0");
      }

      window.location.reload();
    } else {
      // User is not logged in, navigate to login page
      navigate("/login");
    }

    setshow_orange("hidden");
    setshow_blue("hidden");
    setshow_green("hidden");

    // Update local storage
    // localStorage.setItem("show_orange", "hidden");
    // localStorage.setItem("show_blue", "hidden");
    // localStorage.setItem("show_green", "hidden");
  }

  const [plan, setPlan] = useState([]);

  const hadlePlan = () => {
    navigate("/yb");
  };

  const handlePrevBook = () => {
    navigate("/pb");
  };

  const scrollToPosition = (position) => {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="flex bg-navbar-brown justify-between">
        <div className="navbar-strips-container flex flex-row ml-[100px]">
          <div
            className="navbar-strips bg-navbar-orange rounded-tl-xl"
            onClick={pressOrange}
          >
            HOME
          </div>
          <div className="navbar-strips bg-navbar-blue" onClick={pressBlue}>
            VISIT US
          </div>
          <div
            className="navbar-strips bg-navbar-green rounded-tr-xl"
            onClick={pressGreen}
          >
            GLOBAL CENTER FOR SPECIES SURVIVAL
          </div>
        </div>
        <div
          className="login navbar-strips bg-white text-black rounded-t-xl"
          onClick={handleLogin}
        >
          {localStorage.getItem("email") !== "null" &&
          localStorage.getItem("email") !== ""
            ? "LOGOUT"
            : "LOGIN"}
        </div>
      </div>

      <div
        className={`bg-navbar-orange p-3 ${show_orange} orange-select-options-container1`}
      >
        <div className="orange-select-options-container2 pr-[10%]">
          <span onClick={() => scrollToPosition(0)}>Mammals</span>
          <span onClick={() => scrollToPosition(850)}>Reptiles</span>
          <span onClick={() => scrollToPosition(2000)}>Birds</span>
        </div>
      </div>
      <div className={`bg-navbar-blue p-3 ${show_blue}`}>
        {/* //changed here api call plan view */}
        <div className="orange-select-options-container2 pr-[10%]">
          <span onClick={hadlePlan}>Your Booking</span>
          <span onClick={handlePrevBook}>Your Previous Booking</span>
        </div>
      </div>
      <div className={`bg-navbar-green p-3 ${show_green}`}>
        <div className="orange-select-options-container3 pr-[10%]">
          <span className="font-bold">Donate</span>
        </div>
      </div>
    </>
  );
}

export default Navbar2;
