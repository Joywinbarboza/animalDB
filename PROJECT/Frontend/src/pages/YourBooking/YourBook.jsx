import React, { useEffect, useState } from 'react'
import axios from 'axios';

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
      
        // Dependency array is empty, so this effect runs only once when the component mounts
      }, []); // Ensure that the dependency array is empty to run the effect only once
      

    // Render your component with the fetched data

    return (
        <div>
            <div>
            </div>
        </div>
    )
}

export default YourBook
