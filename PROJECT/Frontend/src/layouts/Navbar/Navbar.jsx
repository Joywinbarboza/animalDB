import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar2() {
  const [show_orange, setshow_orange] = useState("");
  const [show_blue, setshow_blue] = useState("hidden");
  const [show_green, setshow_green] = useState("hidden");
  const navigate = useNavigate();

  function pressOrange() {
    navigate("/");
    setshow_orange("");
    setshow_blue("hidden");
    setshow_green("hidden");
  }

  function pressBlue() {
    navigate("/visit");
    setshow_orange("hidden");
    setshow_blue("");
    setshow_green("hidden");
  }

  function pressGreen() {
    navigate("/");
    setshow_orange("hidden");
    setshow_blue("hidden");
    setshow_green("");
  }

  function handleLogin() {
    const email = localStorage.getItem("email");

    if (email !== "null" && email !== "") {
      // User is logged in, perform logout
      localStorage.setItem("username", null);
      localStorage.setItem("email", null);

      // Clear adult and child counts
      // localStorage.setItem("adultCount.{}", "0");
      // localStorage.setItem("childCount.{}", "0");

      var id;

      for (id = 1; id <= 3; id++) {
        console.log(id);
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
  }

  const [plan, setPlan] = useState([]);

  const hadlePlan = () => {
    navigate("/yb");
    // const email = localStorage.getItem("email");
    //   const response = await axios
    //     .get("http://localhost:8081/visit/getPlan", email)
    //     .then((res) => {
    //       console.log("done");
    //     });

    //   const json = await response.json();
    //   console.log(json);
    //   setPlan(json);
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
          <span>Mammals</span>
          <span>Reptiles</span>
          <span>Birds</span>
        </div>
      </div>
      <div className={`bg-navbar-blue p-3 ${show_blue}`}>
        {/* //changed here api call plan view */}
        <div className="orange-select-options-container2 pr-[10%]">
          <span onClick={hadlePlan}>Your Booking</span>
        </div>
      </div>
      <div className={`bg-navbar-green p-3 ${show_green}`}>Adopt</div>
    </>
  );
}

export default Navbar2;
