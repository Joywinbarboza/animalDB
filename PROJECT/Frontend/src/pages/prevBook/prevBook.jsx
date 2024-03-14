import React, { useEffect, useState } from "react";
import axios from "axios";
import "./prevBook.css";

const PrevBook = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get(
          "http://localhost:8081/visit/prevPlan",
          {
            params: {
              email: email,
            },
          }
        );

        // Assuming setData is asynchronous and returns a promise
        await setData(response.data);

        // Now you can safely log the updated data
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData(); // Invoke the fetchData function directly within useEffect
  }, []);

  return (
    <div>
      {data.map((booking) => (
        <div key={booking.booking_id} className="card">
          <h3>Email: {booking.user_email}</h3>
          <p>Zoo: {booking.zoo_name}</p>
          <p>Date: {booking.booking_date}</p>
          <p>Adult Count: {booking.num_adult_tickets}</p>
          <p>Child Count: {booking.num_child_tickets}</p>
        </div>
      ))}
    </div>
  );
};

export default PrevBook;
