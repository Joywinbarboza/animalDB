import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import  LoginButton  from "../../Components/loginGoogle/loginGoogle.jsx"
// import  LogoutButton  from "../../Components/logoutGoogle/logoutGoogle.jsx"

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({ email: "", password_hash: "" });

  function onChanges(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
    console.log(login);
  }

  function navigateSignUp() {
    navigate("/signUp");
  }

  // async function handleLogin(e) {
  //   // Prevent page refresh
  //   e.preventDefault();

  //   const response = await axios
  //     .post("http://localhost:8081/user/login", login)
  //     .then((res) => {
  //       // console.log(res.data[0]);
  //       if (res.data[0].username != null) {
  //         navigate("/");
  //       } else {
  //         alert("Name or Password is incorrect ;(");
  //       }
  //     });

  //   console.log(response);
  // }

  async function handleLogin(e) {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:8081/user/login",
      login
    );

    if (response.data[0].username != null) {
      // Store username and email in local storage
      localStorage.setItem("username", response.data[0].username);
      localStorage.setItem("email", login.email);

      // Redirect to home page
      localStorage.setItem("show_orange", "");
      navigate("/");
    } else {
      alert("Name or Password is incorrect ;(");
    }
  }

  return (
    <>
      {/* <LoginButton/>
      <LogoutButton/> */}
      <div className="login-container">
        <form className="login-form">
          <div className="login-field" id="useremail">
            <input
              type="email"
              name="email"
              value={login.email}
              onChange={onChanges}
              className="login-input"
              placeholder="Enter your email"
            />
          </div>
          <div className="login-field" id="userpassword">
            <input
              type="password"
              name="password_hash"
              value={login.password_hash}
              onChange={onChanges}
              className="login-input"
              placeholder="Enter your password"
            />
          </div>
          <button onClick={handleLogin} className="login-button">
            LOGIN
          </button>
          <span className="login-span">
            Don't have an account?{" "}
            <a onClick={navigateSignUp} className="login-link">
              Sign Up
            </a>
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;
