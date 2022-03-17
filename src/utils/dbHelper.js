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

  
module.exports = {
    insertTelemetry,
  };
  