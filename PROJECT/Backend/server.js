const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(cors());

app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'test'
})


//Checking by seeing the output at localhost:8081
app.get('/',(req,res)=>{
    return res.json("from Backend Side");
});

app.get('/animals',(req,res)=>{
    //setting sql variable with this query 
    const sql = "SELECT * FROM `animals_test`";

    db.query(sql,(err,data)=>{
        //if there is an error return a json with the error in it
        if(err) return res.json(err);
        
        //else just return the result json with the data
        return res.json(data);
    })
})

app.get('/image',(req,res)=>{
    //setting sql variable with this query 
    const sql = "SELECT * FROM `image_test`";

    db.query(sql,(err,data)=>{
        //if there is an error return a json with the error in it
        if(err) return res.json(err);
        
        //else just return the result json with the data
        return res.json(data);
    })
})


//signup and login
app.use("/user",require('./routes/user'));    //user create


//booking end point
app.use("/book",require("./routes/booking"))

//the port 8081 (i.e: localhost:8081) is made to listen
app.listen(8081,()=>{
    console.log("listening");
})

// module.exports = app;