import { useEffect, useState } from "react";


// const slideStyles = {
//   width: "100%",
//   height: "100%",
//   borderRadius: "10px",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// };

const slideStyles = "w-full h-full rounded-[10px] bg-cover bg-center";

// const rightArrowStyles = {
//   position: "absolute",
//   top: "50%",
//   transform: "translate(0, -50%)",
//   right: "32px",
//   fontSize: "45px",
//   color: "#fff",
//   zIndex: 1,
//   cursor: "pointer",
// };

const rightArrowStyles =
  "absolute top-[50%] translate-x-0 translate-y-1/2 right-[32px] text-[45px] text-black z-1 cursor-pointer";

// const leftArrowStyles = {
//   position: "absolute",
//   top: "50%",
//   transform: "translate(0, -50%)",
//   left: "32px",
//   fontSize: "45px",
//   color: "#fff",
//   zIndex: 1,
//   cursor: "pointer",
// };

const leftArrowStyles =
  "absolute top-[50%] translate-x-0 translate-y-1/2 left-[32px] text-[45px] text-black z-1 cursor-pointer ";

// const sliderStyles = {
//     position: "relative",
//     height: "100%",
//   };

const sliderStyles = "relative h-full";

// const dotsContainerStyles = {
//   display: "flex",
//   justifyContent: "center",
// };

const dotsContainerStyles = "flex justify-center";

// const dotStyle = {
//   margin: "0 3px",
//   cursor: "pointer",
//   fontSize: "20px",
// };

const dotStyle = "mx-0 my-[3px] cursor-pointer text-[20px]";

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  //   const slideStylesWidthBackground = {
  //     ...slideStyles,
  //     backgroundImage: `url(${slides[currentIndex].url})`,
  //   };

//   const slideStylesWidthBackground =
//     slideStyles + `bg-[url('${slides[currentIndex].url}')]`;

  const slideStylesWidthBackground  = "slideStyles";

  console.log(slides);

  console.log(currentIndex);



if (!slides || slides.length === 0) {
    // If slides is not available or empty, you can return a loading message or null
    return <p className="text-5xl absolute top-1/2 right-1/2 left-1/2 bottom-1/2 font-bold">Loading...</p>; // Adjust this as needed
  }

  return ( 
    <>
      {/* <div style={sliderStyles}>
        <div>
          <div onClick={goToPrevious} style={leftArrowStyles}>
            ❰
          </div>
          <div onClick={goToNext} style={rightArrowStyles}>
            ❱
          </div>
        </div>
        <div style={slideStylesWidthBackground}></div>
        <div style={dotsContainerStyles}>
          {slides.map((slide, slideIndex) => (
            <div
              style={dotStyle}
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
            >
              ●
            </div>
          ))}
        </div>
      </div> */}
      <div className={sliderStyles}>
        <div>
          <div onClick={goToPrevious} className={leftArrowStyles}>
            ❰
          </div>
        <div className={slideStylesWidthBackground+" flex justify-between"}>
            <img src={'/images/animals/'+slides[currentIndex].image_path} alt=""/>
            <div className="flex-column">
            <p className="text-[50px]">{slides[currentIndex].name}</p>
            <p className="text-[30px]">{slides[currentIndex].scientific_name}</p>
            <p>{slides[currentIndex].fact}</p>
            </div>
        </div>
          <div onClick={goToNext} className={rightArrowStyles}>
            ❱
          </div>
        </div>
        <div className={dotsContainerStyles}>
          {slides.map((slide, slideIndex) => (
            <div
              className={dotStyle}
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
            >
              ●
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageSlider;
