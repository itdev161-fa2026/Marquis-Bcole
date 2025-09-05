import express from 'express';

//int express app
const app = express();


//api endpoints
app.get ('/', (req, res)=>
    res.send("http get request sent to  root api endpoint")
);

// connection listener
app.listen(3000, ()=> console.log("express server running on port 3000"));