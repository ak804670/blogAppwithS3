const express = require("express")
const app = express();
require("dotenv").config()
const cors = require("cors");





const blogRoute = require("./routes/blogRoutes.js");
const { default: mongoose } = require("mongoose");


const port = process.env.PORT
const monogDb_link= process.env.MONOGO_LINK


app.use( cors() );


app.get("/",(req,res)=>{
    res.send("made with ❤️ from anish")
})

app.use("/api",blogRoute)

app.listen(port,()=>{
    console.log(`server is up on port :${port}`);
})

mongoose.connect(monogDb_link)
.then(()=>{
    console.log("we are conncted with mongodb");
})
.catch((err)=>{
    console.log(err)
})