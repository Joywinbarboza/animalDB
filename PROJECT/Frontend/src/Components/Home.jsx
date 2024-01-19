import React, { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/animals")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="animal-container-main">
        {data.map((d, i) => (
          <div className="animal-container" key={i}>
            <div className="animal-name">
              <p>{d.name}</p>
            </div>
            <div className="animal-image">
              <img src={"/images/animals/" + d.image_path} alt={d.image_path} />
            </div>
            <div className="animal-sc-name">
              <p>{d.scientific_name}</p>
            </div>
            <div className="animal-fact">
              <p>"{d.fact}"</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
