"use strict";

const express = require('express')
const PORT = 3001
const ENDPOINT = '/api/v1'

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const RateLimit = require('express-rate-limit');

const cors = require("cors")
const corsOptions = {
  origin: `http://localhost:${PORT}`
};
app.use(cors(corsOptions));

const apiLimiter = RateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 100, // Limit each IP to 100 requests
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests!",
})
app.use(apiLimiter); // apply rate limiter to all requests


//Routers
const device_router = require('./routes/deviceRouter')


app.use((request, response, next) => {
  next();
});

app.use(ENDPOINT, device_router);




app.listen(PORT, function(err){
   if (err) console.log("Error occured in server setup")
   console.log("Backend listening on Port: ", PORT);
})