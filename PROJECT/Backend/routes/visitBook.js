const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "animaldb",
});

router.post("/visitbook", (req, res) => {
  // const sql="INSERT INTO Booking (VisitorName,ContactNumber,Email,DateOfVisit,NumberOfTickets,TotalAmount,PaymentStatus) VALUES (?)"
  const sql =
    "INSERT INTO bookingzoo1 (user_email,zoo_name,booking_date ,num_adult_tickets, num_child_tickets, total_price) VALUES (?, ?, ?, ?, ?, ?)";

  // const numAdultTickets = 3;
  // const numChildTickets = 2;

  const total = req.body.adultCount * 50 + req.body.childCount * 30;

  // const currentDate = new Date();
  // const date = currentDate.toISOString().split("T")[0];

  const values = [req.body.email ,req.body.zoo , req.body.date, req.body.adultCount, req.body.childCount, total];

  db.query(sql, values, (err, data) => {
    if (err) {
      res.send(err);
    }
    return res.json(data);
  });
});


//changed here your booking
router.get("/getPlan",(req,res)=>{
  const sql="SELECT * FROM bookingzoo1 WHERE user_email = ?"
  
  console.log(req.body.email)
  const values=[req.query.email]

  db.query(sql,values,(err,data)=>{
    //if there is an error return a json with the error in it
    if(err) return res.json(err);
    
    //else just return the result json with the data
    return res.json(data);
})
})


// router.put("/update/:id", (req, res) => {
//   const { id } = req.body;

//   if (!id) {
//     return res.status(400).json({ error: 'Missing required parameters' });
//   }

//   const updateQuery = 'UPDATE bookingzoo1 SET user_email=?, zoo_name=?, booking_date=?, num_adult_tickets=?, num_child_tickets=?, total_price=? WHERE id=?';

//   const total = req.body.adultCount * 50 + req.body.childCount * 30;
//   const values = [req.body.email, req.body.zoo, req.body.date, req.body.adultCount, req.body.childCount, total, id];

//   pool.query(updateQuery, values, (error, results) => {
//     if (error) {
//       console.error('Error updating data:', error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }

//     res.json({ message: 'Data updated successfully' });
//   });
// });



module.exports = router;
