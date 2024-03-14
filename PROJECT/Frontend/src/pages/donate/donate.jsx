// donate.js
import React, { useState } from "react";
import "./donate.css";
import zooAnimalsImage1 from "/images/animals/bird_feed.jpg";
import zooAnimalsImage2 from "/images/animals/elephant_feed.jpg";
import zooAnimalsImage3 from "/images/animals/parrot_feed.jpg";
import axios from "axios";

function Donate() {
  const [donationAmount, setDonationAmount] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleAmountChange = (amount) => {
    setDonationAmount(amount);
  };

  const handleDonateClick = async () => {
    // Logic for handling the donate button click
    console.log("User clicked Donate button");
    console.log("Donation Amount:", donationAmount);
    console.log("Feedback:", feedback);

    const email = localStorage.getItem("email");

    const feedBack = {
      email: email,
      feedback: feedback,
    };

    const Donate = {
        email: email,
        amount: donationAmount,
      };

    // console.log(card.date);

    const response = await axios
      .post("http://localhost:8081/donate-page/feedback", feedBack)
      .then((res) => {
        console.log("done");
      });

      const response1 = await axios
      .post("http://localhost:8081/donate-page/donate", Donate)
      .then((res) => {
        console.log("done");
      });
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <div className="donate-container">
      <h1>Help Support Our Animal Friends</h1>
      <div className="image-container">
        <img
          src={zooAnimalsImage1}
          alt="Zoo Animals 1"
          className="animal-image"
        />
        <img
          src={zooAnimalsImage2}
          alt="Zoo Animals 2"
          className="animal-image"
        />
        <img
          src={zooAnimalsImage3}
          alt="Zoo Animals 3"
          className="animal-image"
        />
      </div>
      <p>
        Every donation counts and helps us in our mission to provide care,
        shelter, and love to animals in need. Your generosity can make a real
        difference in the lives of these innocent creatures.
      </p>
      <p>
        By donating, you contribute to the well-being of animals in our care,
        ensuring they receive proper nutrition, medical attention, and
        enrichment activities to thrive in their environment.
      </p>

      {/* Donation Amount Container */}
      <div className="amount-container">
        <h2>Select Donation Amount</h2>
        <div>
          <input
            type="radio"
            id="amount1000"
            name="amount"
            value="1000"
            onChange={() => handleAmountChange("1000")}
          />
          <label htmlFor="amount1000">Rs 1000</label>
        </div>
        <div>
          <input
            type="radio"
            id="amount2000"
            name="amount"
            value="2000"
            onChange={() => handleAmountChange("2000")}
          />
          <label htmlFor="amount2000">Rs 2000</label>
        </div>
        <div>
          <input
            type="radio"
            id="amount5000"
            name="amount"
            value="5000"
            onChange={() => handleAmountChange("5000")}
          />
          <label htmlFor="amount5000">Rs 5000</label>
        </div>
      </div>

      {/* Feedback Form */}
      <form onSubmit={(e) => e.preventDefault()} className="feedback-form">
        <h2>Leave Feedback</h2>
        <textarea
          name="feedback"
          placeholder="Your Feedback"
          value={feedback}
          onChange={handleFeedbackChange}
        ></textarea>
        <button type="submit" onClick={handleDonateClick}>
          Donate Now
        </button>
      </form>
    </div>
  );
}

export default Donate;
