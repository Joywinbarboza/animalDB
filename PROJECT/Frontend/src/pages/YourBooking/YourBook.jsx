import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./YourBook.css"
import { useRef } from 'react';

const YourBook = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const email = localStorage.getItem("email");
                const response = await axios.get("http://localhost:8081/visit/getPlan", {
                    params: {
                        email: email
                    }
                });

                // Assuming setData is asynchronous and returns a promise
                await setData(response.data);

                // Now you can safely log the updated data
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData(); // Invoke the fetchData function directly within useEffect
    }, []);


    //Update function
    const [updateData, setUpdateData] = useState({
        id:"",
        email:"",
        zoo:"",
        date:"",
        adult:"",
        child:""
    })
    const formref = useRef(null);

    //to open form
    const update = (booking) => {
        formref.current.style.display = "block";
        setUpdateData({ id: booking.booking_id, email: booking.user_email, zoo: booking.zoo_name, date: booking.booking_date, adult: booking.num_adult_tickets, child: booking.num_child_tickets })
    }

    //to close form
    const save =async (e,id) => {
        e.preventDefault();
        const email = localStorage.getItem("email");
        // const formattedDate = new Date(updateData.date).toISOString(); 
        const bookPut = {
            email: email,
            adultCount: updateData.adult,
            childCount: updateData.child,
            zoo: updateData.zoo,
            date: updateData.date,
        }
        console.log(bookPut);

        const response = await axios
            .put(`http://localhost:8081/visit/updatevisitbook/${id}`, bookPut)
            .then((res) => {
                console.log("done");
            });
        formref.current.style.display = "none";
    }

    const onChange = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    }

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
                        <button onClick={() => { update(booking) }}>Update</button><button>Delete</button>
                    </div>
                ))}
            </div>
            <div ref={formref} style={{ display: "none" }}>
                <form >
                    Zoo:<input type="text" placeholder='name' name="zoo" value={updateData.zoo} onChange={onChange} /><br />
                    Date:<input type="date" placeholder='date' name='date' value={updateData.date} onChange={onChange} /><br />
                    Adult Count: <input type="number" name='adult' value={updateData.adult} onChange={onChange} /><br />
                    Child Count: <input type="number" name='child' value={updateData.child} onChange={onChange} /><br />
                    <button onClick={()=>{save(e,updateData.id)}}>Save</button>
                </form>
            </div>
        </>
    )
}

export default YourBook
