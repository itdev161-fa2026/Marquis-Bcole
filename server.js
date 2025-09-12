import express, { Router } from 'express';
import connectDatabase from "./config/db.js";


//int express app
const app = express();

connectDatabase();

app.use(express.json({extended: false}));

//api endpoints
/**
 * @route
 * @desc
 */
app.get ('/', (req, res)=>
    res.send("http get request sent to  root api endpoint")
);
/**
 * @route
 * @desc
 */
app.post("/api/users", (req, res) =>{
    console.log(req.body);
    res.send(req.body);
});


// connection listener
app.listen(3000, ()=> console.log("express server running on port 3000"));