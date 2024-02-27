const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

router.post("/visitbook", (req, res) => {
  // const sql="INSERT INTO Booking (`VisitorName`,`ContactNumber`,`Email`,`DateOfVisit`,`NumberOfTickets`,`TotalAmount`,`PaymentStatus`) VALUES (?)"
  const sql =
    "INSERT INTO booking (user_email,booking_date ,num_adult_tickets, num_child_tickets, total_price) VALUES (?, ?, ?, ?, ?)";

  // const numAdultTickets = 3;
  // const numChildTickets = 2;

  const total = req.body.adultCount * 50 + req.body.childCount * 30;
  const currentDate = new Date();
  const date = currentDate.toISOString().split("T")[0];

  const values = [req.body.email ,date, req.body.adultCount, req.body.childCount, total];

  db.query(sql, values, (err, data) => {
    if (err) {
      res.send(err);
    }
    return res.json(data);
  });
});

module.exports = router;
