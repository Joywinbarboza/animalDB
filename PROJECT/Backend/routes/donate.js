const express = require("express");
const router = express.Router();
const db = require("../database/db");

//feedback
router.post("/feedback", (req, res) => {
  const sql1 = "INSERT INTO feedback (email, feedback) VALUES (?, ?);";

  values = [req.body.email, req.body.feedback];

  db.query(sql1, values, (err, data) => {
    if (err) {
      res.send(err);
    }
    return res.json(data);
  });
});

//donate
router.post("/donate", (req, res) => {
  const sql1 = "INSERT INTO donations (email, amount) VALUES (?, ?);";

  values = [req.body.email, req.body.amount];

  db.query(sql1, values, (err, data) => {
    if (err) {
      res.send(err);
    }
    return res.json(data);
  });
});

module.exports = router;
