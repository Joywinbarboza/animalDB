const express=require("express");
const router=express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'test'
})


//router for creating user
router.post("/signup",(req,res)=>{
    const sql="INSERT INTO users (`username`, `password_hash`, `email`) VALUES (?)";
    const values=[
        req.body.username,
        req.body.password_hash,
        req.body.email
    ]

    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json(err)
        }

        return res.json(data);
    })
})


//router for login
router.post("/login",(req,res)=>{
    const sql="SELECT * FROM users where `email` =  ? AND `password_hash` = ?";
    // const values=[
    //     req.body.password_hash,
    //     req.body.email
    // ]

    db.query(sql,[req.body.email,req.body.password_hash],(err,data)=>{
        if(err){
            return res.json(err)
        }
        // return res.json(data);
        if(data.length>0){
            return res.status(200).json(data)
        }
        else{
            return res.json("No such user exists")
        }
    })
})

module.exports=router;