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

    try{
      const response = await axios.post(
        "http://localhost:8081/user/signup",
        signUp
      );
    }catch(err){
      console.log(err)
      navigate("/")
    }

    console.log(response.data);

    // const res_string = JSON.stringify(response);

    // console.log("this here"+res_string);

    // if(res_string.status === 200){
    //   navigate("/");
    // }
  }

  return (
    <>
      {/* <LoginButton/>
    <LogoutButton/> */}
      <div className="container">
        <form action="">
          <div className="field" id="username">
            <input
              type="text"
              name="username"
              value={signUp.username}
              onChange={onChanges}
              placeholder="Enter your Name"
            />
          </div>
          <div className="field" id="useremail">
            <input
              type="email"
              name="email"
              value={signUp.email}
              onChange={onChanges}
              placeholder="Enter your email"
            />
          </div>
          <div className="field" id="userpassword">
            <input
              type="password"
              name="password_hash"
              value={signUp.password_hash}
              onChange={onChanges}
              placeholder="Enter your password"
            />
          </div>
          <button onClick={handleSignUp}>SIGN UP</button>
          <span>
            have a account? <a onClick={navigateLogin}>Login</a>
          </span>
        </form>
      </div>
    </>
  );
}

export default SignUp;
