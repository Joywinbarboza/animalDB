import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useUser } from "../../contexts/context";

function SignUp() {
  const navigate = useNavigate();

  const { currentUser, setUser } = useUser();

  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password_hash: "",
  });

  function onChanges(e) {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  }

  function navigateLogin() {
    navigate("/login");
  }

  async function handleSignUp(e) {
    //no Refresh
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/user/signup",
        signUp
      );
      console.log(response.data);
      if (response.data.warningCount == 0) {
        localStorage.setItem("show_orange", "");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="signup-container">
        <form className="signup-form">
          <div className="signup-field" id="username">
            <input
              type="text"
              name="username"
              value={signUp.username}
              onChange={onChanges}
              placeholder="Enter your Name"
              className="signup-input"
            />
          </div>
          <div className="signup-field" id="useremail">
            <input
              type="email"
              name="email"
              value={signUp.email}
              onChange={onChanges}
              placeholder="Enter your email"
              className="signup-input"
            />
          </div>
          <div className="signup-field" id="userpassword">
            <input
              type="password"
              name="password_hash"
              value={signUp.password_hash}
              onChange={onChanges}
              placeholder="Enter your password"
              className="signup-input"
            />
          </div>
          <button onClick={handleSignUp} className="signup-button">
            SIGN UP
          </button>
          <span className="signup-span">
            Already have an account?{" "}
            <a onClick={navigateLogin} className="signup-link">
              Login
            </a>
          </span>
        </form>
      </div>
    </>
  );
}

export default SignUp;
