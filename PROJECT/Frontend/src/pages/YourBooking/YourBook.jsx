import React, { useEffect, useState } from 'react'
import axios from 'axios';

const YourBook = () => {
    const [data, setData] = useState([]);

    useEffect( () => {
        async function fetchData(){
            const email = localStorage.getItem("email");
            const requestOptions = {
                method: 'get', // or 'get' depending on your server endpoint
                headers: {
                    'Content-Type': 'application/json',
                },
            };
    
            // axios.get("http://localhost:8081/visit/getPlan", { email }, requestOptions)
            //   .then((response) => setData(response.data))
            //   .catch((error) => console.log(error));
            const email1 = { email: email }
            const response = await axios.get(
                "http://localhost:8081/visit/getPlan","cp@gmail.com"
            );
            const json=await response.json();
            console.log(json)
        }
    }, []);

    // Render your component with the fetched data

    return (
        <div>
            YourBook
        </div>
    )
}

export default YourBook