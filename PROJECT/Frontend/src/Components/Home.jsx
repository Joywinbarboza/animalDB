import React, { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/animals")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  // const slides = [];

  // data.map((d,i)=>{
  //   slides.push({
  //     "url": `/image/animals/` + d.image_path,
  //     "Title": d.image_path
  //   })
  // })

  const slides = data.map((d, i) => ({
    url: "/images/animals/" + d.image_path,
    title: d.image_path, // Changed "Title" to "title" for consistency
  }));
  

  return (
    <>
      {/* <div className="animal-container-main">
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
      </div> */}
      <div>
        <ImageSlider slides={data}/>
      </div>
    </>
  );
}

export default Home;
