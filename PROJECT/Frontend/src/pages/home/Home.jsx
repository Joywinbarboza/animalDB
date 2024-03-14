import React, { useEffect, useState } from "react";
import ImageSlider from "../../Components/ImageSlider/ImageSlider.jsx";
import "./Home.css";
// import Book from "../../Test/Book.jsx";

// import LoginButton from "../../Components/loginGoogle/loginGoogle.jsx";
// import LogoutButton from "../../Components/logoutGoogle/logoutGoogle.jsx";
import { gapi } from "gapi-script";

const clientId =
  "271649088931-1b1j0bon6p21cikasf1cksrpt3b3t5df.apps.googleusercontent.com";

function Home() {
  const [data, setData] = useState([]);
  const [animal_mammals, setAnimalMammals] = useState([]);
  const [animal_reptiles, setAnimalreptiles] = useState([]);
  const [animal_birds, setAnimalbirds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/animals")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));


    fetch("http://localhost:8081/home/animal_mammals")
      .then((res) => res.json())
      .then((data) => setAnimalMammals(data))
      .catch((err) => console.log(err));

    fetch("http://localhost:8081/home/animal_reptiles")
      .then((res) => res.json())
      .then((data) => setAnimalreptiles(data))
      .catch((err) => console.log(err));

      fetch("http://localhost:8081/home/animal_birds")
      .then((res) => res.json())
      .then((data) => setAnimalbirds(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  return (
    <>
      <div>
        {/* <ImageSlider slides={data} /> */}
        <ImageSlider slides={animal_mammals} />
        <ImageSlider slides={animal_reptiles} />
        <ImageSlider slides={animal_birds} />
      </div>
    </>
  );
}

export default Home;
