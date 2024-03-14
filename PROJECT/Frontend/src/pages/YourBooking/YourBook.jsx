import React, { useEffect, useState } from "react";
import axios from "axios";
import "./YourBook.css";
import { useRef } from "react";

const YourBook = () => {
  const [data, setData] = useState([]);
  const formref = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get(
          "http://localhost:8081/visit/getPlan",
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

  //Update function
  const [updateData, setUpdateData] = useState({
    id: "",
    email: "",
    zoo: "",
    date: "",
    adult: "",
    child: "",
  });

  //to open form and show the selected booking
  const update = (booking) => {
    formref.current.style.display = "block";
    const newdate = new Date(booking.booking_date);
    const formattedDate = newdate.toISOString().split("T")[0];
    // console.log(formattedDate);
    setUpdateData({
      id: booking.booking_id,
      email: booking.user_email,
      zoo: booking.zoo_name,
      date: formattedDate,
      adult: booking.num_adult_tickets,
      child: booking.num_child_tickets,
    });
  };

  //to close form and submit form
  const save = async (id) => {
    // e.preventDefault();
    const email = localStorage.getItem("email");
    const formattedDate = new Date(updateData.date).toISOString().split("T")[0];
    // const formattedDate = updateData.date.toISOString().split("T")[0];
    const bookPut = {
      email: email,
      adultCount: updateData.adult,
      childCount: updateData.child,
      zoo: updateData.zoo,
      date: formattedDate,
    };
    // console.log(bookPut);
    console.log(formattedDate);

    const response = await axios
      .put(`http://localhost:8081/visit/updatevisitbook/${id}`, bookPut)
      .then((res) => {
        console.log("done");
        location.reload();
      });

    formref.current.style.display = "none";
  };

  const Delete = async (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to DELETE this booking?"
    );

    // console.log(id);

    if (confirmDelete) {
      const response = await axios
        .delete(`http://localhost:8081/visit/deletevisitbook/${id}`)
        .then((res) => {
          console.log("deleted id " + id);
          location.reload();
        });

      formref.current.style.display = "none";
    } else {
      console.log("Deletion canceled.");
    }
  };

  const onChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        {data.map((booking) => (
          <div key={booking.booking_id} className="card">
            <h3>Email: {booking.user_email}</h3>
            <p>Zoo: {booking.zoo_name}</p>
            <p>Date: {booking.booking_date}</p>
            <p>Adult Count: {booking.num_adult_tickets}</p>
            <p>Child Count: {booking.num_child_tickets}</p>
            {/* <p>Total: {booking.total_price}</p> */}
            <button
              onClick={() => {
                update(booking);
              }}
            >
              Update
            </button>
            <button
              className="delete"
              onClick={(e) => {
                Delete(e, booking.booking_id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div ref={formref} style={{ display: "none" }} className="form-container">
        <form>
          <p>Zoo:</p>
          <input
            type="text"
            placeholder="name"
            name="zoo"
            value={updateData.zoo}
            onChange={onChange}
          />
          <br />
          <p>Date:</p>
          <input
            type="date"
            placeholder="date"
            name="date"
            value={updateData.date}
            onChange={onChange}
          />
          <br />
          <p>Adult Count:</p>{" "}
          <input
            type="number"
            name="adult"
            value={updateData.adult}
            onChange={onChange}
          />
          <br />
          <p>Child Count:</p>{" "}
          <input
            type="number"
            name="child"
            value={updateData.child}
            onChange={onChange}
          />
          <br />
        </form>
        <button
          onClick={() => {
            save(updateData.id);
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default YourBook;
