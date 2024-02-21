const express=require("express");
const router=express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'test'
})

router.post("/booknow",(req,res)=>{
    const sql="INSERT INTO Booking (`VisitorName`,`ContactNumber`,`Email`,`DateOfVisit`,`NumberOfTickets`,`TotalAmount`,`PaymentStatus`) VALUES (?)"
    const values=[
        req.body.VisitorName,
        req.body.ContactNumber,
        req.body.Email,
        req.body.DateOfVisit,
        req.body.NumberOfTickets,
        req.body.TotalAmount,
        req.body.PaymentStatus
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            res.send(err);
        }
        return res.json(data)
    })
})

module.exports=router