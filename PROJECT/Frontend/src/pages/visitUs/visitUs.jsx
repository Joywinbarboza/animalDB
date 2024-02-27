import React, { useState, useEffect } from "react";
import "./visitUs.css";
import axios from "axios";

function VisitUs() {
  const [adultCount, setAdultCount] = useState(() => {
    // Retrieve adult count from localStorage or default to 0
    return parseInt(localStorage.getItem("adultCount")) || 0;
  });

  const [childCount, setChildCount] = useState(() => {
    // Retrieve child count from localStorage or default to 0
    return parseInt(localStorage.getItem("childCount")) || 0;
  });

  useEffect(() => {
    // Update localStorage whenever the counts change
    localStorage.setItem("adultCount", adultCount.toString());
    localStorage.setItem("childCount", childCount.toString());
  }, [adultCount, childCount]);

  const handleIncrement = (category) => {
    if (category === "adult") {
      setAdultCount(adultCount + 1);
    } else if (category === "child") {
      setChildCount(childCount + 1);
    }
  };

  const handleDecrement = (category) => {
    if (category === "adult" && adultCount > 0) {
      setAdultCount(adultCount - 1);
    } else if (category === "child" && childCount > 0) {
      setChildCount(childCount - 1);
    }
  };

//   const handleBook = (e) => {
//     e.preventDefault();

//     console.log(`Booking ${adultCount} adult(s) and ${childCount} child(s)`);
//   };

  async function handleBook(e) {
    // Prevent page refresh
    e.preventDefault();

    const email = localStorage.getItem("email");

    const bookPost = {email:email, adultCount:adultCount,childCount:childCount}

    const response = await axios
      .post("http://localhost:8081/visitbook", bookPost)
      .then((res) => {
        console.log("done");
      });

    console.log(`Booking ${adultCount} adult(s) and ${childCount} child(s)`);
    // console.log(response);
  }

  return (
    <>
      <div className="bookTable">
        <form action="">
          <div className="category">
            <div className="adult">
              <span>Adult</span>
              <div className="no-of-tickets">
                <div className="minus" onClick={() => handleDecrement("adult")}>
                  <p>-</p>
                </div>
                <div className="count">
                  <p>{adultCount}</p>
                </div>
                <div className="plus" onClick={() => handleIncrement("adult")}>
                  <p>+</p>
                </div>
              </div>
            </div>
          </div>
          <div className="category">
            <div className="child">
              <span>Child</span>
              <div className="no-of-tickets">
                <div className="minus" onClick={() => handleDecrement("child")}>
                  <p>-</p>
                </div>
                <div className="count">
                  <p>{childCount}</p>
                </div>
                <div className="plus" onClick={() => handleIncrement("child")}>
                  <p>+</p>
                </div>
              </div>
            </div>
          </div>
        </form>

        <button onClick={handleBook}>Book Tickets</button>
      </div>
    </>
  );
}

export default VisitUs;
