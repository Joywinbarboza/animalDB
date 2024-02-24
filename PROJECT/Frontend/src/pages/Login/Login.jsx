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

  async function handleLogin(e){
        //no Refresh
        e.preventDefault();

        const response = await axios.post(
          "http://localhost:8081/user/login",
          login
        ).then(res=>{
          // console.log(res.data[0]);
          if(res.data[0].username != null){
            navigate("/");
          }else{
            alert("Name or Password is incorrect ;(")
          }
        })
    


        console.log(response);
  }

  return (
    <>
      {/* <LoginButton/>
      <LogoutButton/> */}
      <div className="container">
        <form action="">
          <div className="field" id="useremail">
            <input
              type="email"
              name="email"
              value={login.email}
              onChange={onChanges}
              placeholder="Enter your email"
            />
          </div>
          <div className="field" id="userpassword">
            <input
              type="password"
              name="password_hash"
              value={login.password_hash}
              onChange={onChanges}
              placeholder="Enter your password"
            />
          </div>
          <button onClick={handleLogin}>LOGIN</button>
          <span>
            dont have a account? <a onClick={navigateSignUp}>sign Up</a>
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;
