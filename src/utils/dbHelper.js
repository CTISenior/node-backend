"use strict";

const pool = require('../connectors/pgsql_connector');

//const getAllDevices(){}
//const getDevice(){}
//const insertDevice(){}
//const updateDevice(){}
//const deleteDevice(){}

const insertTelemetry = (sn, telemetry, telemetry_timestamp) => {
    pool.query(
      `INSERT INTO device_telemetries (sn, telemetry, telemetry_timestamp) VALUES ($1, $2, $3) returning *;`,
      [sn, telemetry, telemetry_timestamp],
      (error, result) => {
        
      if (error) 
      {
        return console.log(error);
        //return console.log('Error occured while inserting telemetry'); //[LOG]
      }
      
      return  console.log(result.rows);
      //return  console.log('Telemetry inserted');
    })
  };



//async -> await
const insertAlert = (sn, telemetry_key, type, message, telemetry_timestamp) => {
  pool.query(
    'INSERT INTO device_alerts (sn, telemetry_key, type, message, timestamptz) VALUES ($1, $2, $3, $4, $5)',
    [sn, telemetry_key, type, message, telemetry_timestamp],
    (error, result) => {

    if (error) 
    {
      return console.log(error); // .. 403, 406
    }
    
    return console.log(result);
  })
};


const deleteAlert = (sn) => {
  pool.query(
    'DELETE FROM device_alerts WHERE id=$1', 
    [id], 
    (error, result) => {

    if (error) 
    {
      return res.status(400).json(error);
    }
    
    return res.status(200).json(result);
  })
};


module.exports = {
    insertTelemetry,
    insertAlert,
  };
  