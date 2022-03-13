const express = require('express')
const app = express()
const PORT = 3001
const ENDPOINT = '/api/v1'

const device_router = require('./Routes/device_router')

/*
const cors = require("cors")
const corsOptions = {
  origin: `http://localhost:${PORT}`
};
app.use(cors(corsOptions));
//app.use(cors())
*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(ENDPOINT, device_router);

app.listen(PORT, function(err){
   if (err) console.log("Error occured in server setup")
   console.log("Backend listening on Port: ", PORT);
})