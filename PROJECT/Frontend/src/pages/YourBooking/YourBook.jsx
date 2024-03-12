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

            // const email1 = { email: email }
            // const email1 = {email: "chandanjcb@gmail.com"}
            // console.log(email1);
            // const response = await axios.get(
            //     "http://localhost:8081/visit/getPlan",email1
            // );

            await axios({
                method: "get",
                url: "http://localhost:8081/visit/getPlan",
                params: {
                  email: email
                }
              }).then(function (response) {
                console.log(response.data);
                setData(response.data);
                console.log(data);
              });

            // const json=await response.json();
            // console.log(json);
        }

        fetchData();
    }, []);

    // Render your component with the fetched data

    return (
        <div>
            <div>
            </div>
        </div>
    )
}

export default YourBook
