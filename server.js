import express from 'express';
import connectDatabase from "./config/db.js";


//int express app
const app = express();

connectDatabase();

//api endpoints
app.get ('/', (req, res)=>
    res.send("http get request sent to  root api endpoint")
);


// connection listener
app.listen(3000, ()=> console.log("express server running on port 3000"));