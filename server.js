import express, { Router } from 'express';
import connectDatabase from "./config/db.js";
import {check, validationResult} from "express-validator";

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
app.post("/api/users",
     [check("name", "Please enter your name").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "please enter a password with 6 or more characters").isLength({min: 6})
     ],
     (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    } else {
        return res.send(req.body);
    }
    res.send(req.body);
});


// connection listener
app.listen(3000, ()=> console.log("express server running on port 3000"));