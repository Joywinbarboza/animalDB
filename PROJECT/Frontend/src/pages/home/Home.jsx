import React, { useEffect, useState } from "react";
import ImageSlider from "../../Components/ImageSlider/ImageSlider.jsx";
import "./Home.css";

import  LoginButton  from "../../Components/loginGoogle/loginGoogle.jsx"
import  LogoutButton  from "../../Components/logoutGoogle/logoutGoogle.jsx"
import { gapi } from 'gapi-script';

const clientId = "271649088931-1b1j0bon6p21cikasf1cksrpt3b3t5df.apps.googleusercontent.com";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/animals")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(()=>{

    function start(){
      gapi.client.init({
        clientId : clientId,
        scope: ""
      })

    };

    gapi.load('client:auth2',start);

  });


  const slides = data.map((d, i) => ({
    url: "/images/animals/" + d.image_path,
    title: d.image_path, // Changed "Title" to "title" for consistency
  }));
  

  return (
    <>
      <div>
        <ImageSlider slides={data}/>
      </div>
      
    </>
  );
}

export default Home;
