"use strict";

const express = require('express')
const RateLimit = require('express-rate-limit');
const cors = require("cors")
const device_router = require('./routes/deviceRouter')
const app = express()

const PORT = 4000
const ENDPOINT = '/api/v1'

const corsOptions = {
  origin: `http://localhost:${PORT}`
};
const apiLimiter = RateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 100, // Limit each IP to 100 requests
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests!",
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(apiLimiter); // apply rate limiter to all requests
app.use((request, response, next) => {
  next();
});

//routers
app.use(ENDPOINT, device_router);



app.listen(PORT, function(err){
  if (err) console.log("Error occured in server setup")
  console.log("Backend listening on Port: ", PORT);
})



/////////////////////////////////// SOCKET.IO ///////////////////////////////////


const io = require("./controllers/socketController")
const telemetry = require("./controllers/telemetryController")
