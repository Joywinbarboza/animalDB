import React from 'react'
import { useState } from 'react'
import axios from "axios"

const Book = () => {

    const [book, setBook] = useState({
        VisitorName:"",
        ContactNumber:"",
        Email:"",
        DateOfVisit:"",
        NumberOfTickets:"",
        TotalAmount:"666",
        PaymentStatus:"pending"
    })

    //handle form submission
    const handleClick=async(e)=>{
        e.preventDefault();
        const res=await axios.post("http://localhost:8081/book/booknow",book);
        console.log(book);
    }

    const onChange=(e)=>{
        setBook({...book,[e.target.name]:e.target.value})
    }

  return (
    <div>
         <form action="">
            <div className='container'>
            <div>
            <label htmlFor="">Name</label>
            <input type="text" name="VisitorName" value={book.VisitorName} onChange={onChange}/>
            </div>
            <div>
            <label htmlFor="">Contact Number</label>
            <input type="number" name="ContactNumber" value={book.ContactNumber} onChange={onChange}/>
            </div>
            <div>
            <label htmlFor="">Email</label>
            <input type="email" name="Email" value={book.Email} onChange={onChange}/>
            </div>
            <div>
            <label htmlFor="">Date</label>
            <input type="date" name="DateOfVisit" value={book.DateOfVisit} onChange={onChange}/>
            </div>
            <div>
            <label htmlFor="">Number Of Tickets</label>
            <input type="number" name="NumberOfTickets" value={book.NumberOfTickets} onChange={onChange}/>
            </div>
            <div>
                <button type='submit' onClick={handleClick}> Submit </button>
            </div>
            </div>
         </form><br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default Book