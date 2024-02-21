import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./ImageSlider.css";

const slideStyles = "w-full h-full rounded-[10px] bg-cover bg-center";

const rightArrowStyles =
  "absolute top-[50%] translate-x-0 translate-y-1/2 right-[32px] text-[45px] text-white z-1 cursor-pointer";

const leftArrowStyles =
  "absolute top-[50%] translate-x-0 translate-y-1/2 left-[32px] text-[45px] text-white z-1 cursor-pointer ";

const sliderStyles = "relative h-full";

const dotsContainerStyles = "flex justify-center";

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

  const slideStylesWidthBackground = "slideStyles";

  // useEffect(() => {
  //   setTimeout(() => {
  //     goToNext(currentIndex);
  //   }, 10000);
  // });

  if (!slides || slides.length === 0) {
    // If slides is not available or empty, you can return a loading message or null
    return (
      <p className="text-5xl absolute top-1/2 right-1/2 left-1/2 bottom-1/2 font-bold">
        Loading...
      </p>
    ); // Adjust this as needed
  }

  return (
    <>
      <div className={sliderStyles}>
        <div className="bg-[#1f3b77] text-[#E5E5E5] ">
          <div onClick={goToPrevious} className={leftArrowStyles}>
            ❰
          </div>
          <div className={slideStylesWidthBackground + " flex "}>
            <img
              src={"/images/animals/" + slides[currentIndex].image_path}
              alt=""
              className="ml-[10%] mt-1 h-[700px] w-[500px] bg-cover duration-500 translate-x-1 "
            />
            <div className="flex-column ml-[10%] mt-[10%]">
              <p className="text-[50px]">{slides[currentIndex].name}</p>
              <p className="text-[30px]">
                {slides[currentIndex].scientific_name}
              </p>
              <p className="">{slides[currentIndex].fact}</p>
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
