const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

//the port 8081 (i.e: localhost:8081) is made to listen
app.listen(8081, () => {
  //Checking by seeing the output at localhost:8081
  console.log("listening");
});

//home end point
app.use("/home",require("./routes/home"));

//signup and login
app.use("/user", require("./routes/user")); //user create

//booking end point
app.use("/visit", require("./routes/visitBook"));

//donate end point
app.use("/donate-page", require("./routes/donate"));

