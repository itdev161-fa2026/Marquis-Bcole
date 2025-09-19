import express, { Router } from 'express';
import connectDatabase from "./config/db.js";
import {check, validationResult} from "express-validator";
import User from "./models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import c from 'config';


dotenv.config();

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
     async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    } 
    const {name,email, password} = req.body;
    try{
        let user = await User.findOne({email: email.toLowerCase()});
        if (user) {
            return res.status(400).json({
                errors: [{msg: 'User with this email already exists'}]});
        }

        user = new User({
            name,
            email: email.toLowerCase(),
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user:{
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: "1h"},
            (err, token) =>{
                if (err) throw err;
                res.json({
                    msg: "User registered successfully",
                    token
                });
            }
        );

    } catch (err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

);

/**
 * @route POST api/auth
 * @desc Login user
 */
app.post("/api/auth",[
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email: email.toLowerCase()});
        if (!user){
            return res.status(400).json({
                errors: [{msg: "Invalid Credentials"}]
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({
                errors: [{msg: "Invalid Credentials"}]
            });
        }

        const payload = {
            user:{
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: "1h"},
            (err, token) =>{
                if (err) throw err;
                res.json({token});
            }
        );

} catch (err){
    console.error(err.message);
    res.status(500).send("Server error");
    }
});




// connection listener
app.listen(3000, ()=> console.log("express server running on port 3000"));