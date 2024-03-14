const express = require("express");
const router = express.Router();
const db = require("../database/db");



router.get("/animals", (req, res) => {
  //setting sql variable with this query
  const sql = "SELECT * FROM animals_test";

  db.query(sql, (err, data) => {
    //if there is an error return a json with the error in it
    if (err) return res.json(err);

    //else just return the result json with the data
    return res.json(data);
  });
});

router.get("/image", (req, res) => {
  //setting sql variable with this query
  const sql = "SELECT * FROM image_test";

  db.query(sql, (err, data) => {
    //if there is an error return a json with the error in it
    if (err) return res.json(err);

    //else just return the result json with the data
    return res.json(data);
  });
});

router.get("/animal_mammals", (req, res) => {
  //setting sql variable with this query
  const sql = "SELECT * FROM animals_mammals";

  db.query(sql, (err, data) => {
    //if there is an error return a json with the error in it
    if (err) return res.json(err);

    //else just return the result json with the data
    return res.json(data);
  });
});

router.get("/animal_reptiles", (req, res) => {
  //setting sql variable with this query
  const sql = "SELECT * FROM animals_reptiles";

  db.query(sql, (err, data) => {
    //if there is an error return a json with the error in it
    if (err) return res.json(err);

    //else just return the result json with the data
    return res.json(data);
  });
});

router.get("/animal_birds", (req, res) => {
  //setting sql variable with this query
  const sql = "SELECT * FROM animals_birds";

  db.query(sql, (err, data) => {
    //if there is an error return a json with the error in it
    if (err) return res.json(err);

    //else just return the result json with the data
    return res.json(data);
  });
});

module.exports = router;
