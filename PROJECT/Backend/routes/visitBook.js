const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.post("/visitbook", (req, res) => {
  // const sql="INSERT INTO Booking (VisitorName,ContactNumber,Email,DateOfVisit,NumberOfTickets,TotalAmount,PaymentStatus) VALUES (?)"
  const sql =
    "INSERT INTO bookingzoo1 (user_email,zoo_name,booking_date ,num_adult_tickets, num_child_tickets, total_price) VALUES (?, ?, ?, ?, ?, ?)";

  // const numAdultTickets = 3;
  // const numChildTickets = 2;

  const total = req.body.adultCount * 50 + req.body.childCount * 30;

  // const currentDate = new Date();
  // const date = currentDate.toISOString().split("T")[0];

  const values = [
    req.body.email,
    req.body.zoo,
    req.body.date,
    req.body.adultCount,
    req.body.childCount,
    total,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      res.send(err);
    }
    return res.json(data);
  });
});

//changed here your booking
router.get("/getPlan", (req, res) => {
  const sql = "SELECT * FROM bookingzoo1 WHERE user_email = ?";

  // console.log(req.body.email);
  const values = [req.query.email];

  db.query(sql, values, (err, data) => {
    //if there is an error return a json with the error in it
    if (err) return res.json(err);

    //else just return the result json with the data
    return res.json(data);
  });
});

router.get("/prevPlan", (req, res) => {
  const sql = "SELECT * FROM deleted_bookings WHERE user_email = ?";

  const values = [req.query.email];

  db.query(sql, values, (err, data) => {
    //if there is an error return a json with the error in it
    if (err) return res.json(err);

    //else just return the result json with the data
    return res.json(data);
  });
});

router.put("/updatevisitbook/:bookingId", (req, res) => {
  const bookingId = req.params.bookingId;

  const sql = `
    UPDATE bookingzoo1
    SET
      user_email = ?,
      zoo_name = ?,
      booking_date = ?,
      num_adult_tickets = ?,
      num_child_tickets = ?,
      total_price = ?
    WHERE booking_id = ?
  `;

  const total = req.body.adultCount * 50 + req.body.childCount * 30;
  // const date = req.body.date.toISOString().split("T")[0];
  // console.log(date);
  const values = [
    req.body.email,
    req.body.zoo,
    // date,
    req.body.date,
    req.body.adultCount,
    req.body.childCount,
    total,
    bookingId,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      res.send(err);
    }
    return res.json(data);
  });
});

router.delete("/deletevisitbook/:bookingId", (req, res) => {
  const bookingId = req.params.bookingId;

  const sql = `
    DELETE 
    FROM bookingzoo1
    WHERE booking_id = ?
  `;

  db.query(sql, bookingId, (err, data) => {
    if (err) {
      res.send(err);
    }
    return res.json(data);
  });
});

router.post("/pastbook", (req, res) => {
  const sql1 =
    "INSERT INTO deleted_bookings SELECT * FROM bookings   WHERE booking_date < CURDATE();";
  const sql2 = "DELETE FROM bookings WHERE booking_date < CURDATE();";

  db.query(sql1, (err, data) => {
    if (err) {
      res.send(err);
    }
    return res.json(data);
  });

  db.query(sql2, (err, data) => {
    if (err) {
      res.send(err);
    }
    return res.json(data);
  });
});

module.exports = router;
