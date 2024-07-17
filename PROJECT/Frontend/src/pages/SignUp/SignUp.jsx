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

  const [isValid, setIsValid] = useState({
    username: true,
    email: true,
    password_hash: true,
  });

  function onChanges(e) {
    // setSignUp({ ...signUp, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setSignUp({ ...signUp, [name]: value });
    // Perform validation based on input name
    if (name === "username") {
      // Perform username validation
      setIsValid({ ...isValid, username: /^[a-zA-Z\s]{3,16}$/.test(value) });
    } else if (name === "email") {
      // Perform email validation (You can use a more comprehensive email validation regex)
      setIsValid({
        ...isValid,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      });
    } else if (name === "password_hash") {
      // Perform password validation (You can add your own criteria)
      setIsValid({
        ...isValid,
        password_hash: value.length >= 8,
      });
    }
  }

  function navigateLogin() {
    navigate("/login");
  }

  async function handleSignUp(e) {
    //no Refresh
    e.preventDefault();

    // await new Promise(resolve => setTimeout(resolve, 2000));

    if (!isValid.username || !isValid.email || !isValid.password_hash) {
      console.log("One or more fields are invalid. Cannot perform signup.");
      return;
    }

    console.log(isValid);

    var userb = true;

    if (signUp.username === "") {
      setIsValid((prevState) => ({ ...prevState, username: false }));
      userb = false;
    } else if (signUp.email === "") {
      setIsValid((prevState) => ({ ...prevState, email: false }));
      userb = false;
    } else if (signUp.password_hash === "") {
      setIsValid((prevState) => ({ ...prevState, password_hash: false }));
      userb = false;
    }

    if (
      isValid.username &&
      isValid.email &&
      isValid.password_hash &&
      userb === true
    ) {
      try {
        const response = await axios.post(
          "http://localhost:8081/user/signup",
          signUp
        );
        console.log(response.data);
        if (response.data.warningCount == 0) {
          localStorage.setItem("show_orange", "");
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
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
              required
            />
            {!isValid.username && (
              <div className="signup-error text-red-500 font-bold">
                Please enter a valid username.
              </div>
            )}
          </div>
          <div className="signup-field" id="useremail">
            <input
              type="email"
              name="email"
              value={signUp.email}
              onChange={onChanges}
              placeholder="Enter your email"
              className="signup-input"
              required
            />
            {!isValid.email && (
              <div className="signup-error text-red-500 font-bold">
                Please enter a valid email address.
              </div>
            )}
          </div>
          <div className="signup-field" id="userpassword">
            <input
              type="password"
              name="password_hash"
              value={signUp.password_hash}
              onChange={onChanges}
              placeholder="Enter your password"
              className="signup-input"
              required
            />
            {!isValid.password_hash && (
              <div className="signup-error text-red-500 font-bold">
                Password must be at least 8 characters long.
              </div>
            )}
          </div>
          <button
            onClick={handleSignUp}
            className="signup-button"
            disabled={
              !isValid.username && !isValid.email && !isValid.password_hash
            }
          >
            {/* <button onClick={handleSignUp} className="signup-button" disabled={isValid.username && isValid.email && isValid.password_hash}> */}
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
