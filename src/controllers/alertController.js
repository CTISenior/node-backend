// GET ->>>>  /api/v1/alerts


"use strict";

const pool = require('../connectors/pgsql_connector');

const tenantID = 1;
const buildingID = 1;


const getAllAlerts = (req, res) => {
  //////////dbHelper.getAlert(...);
  pool.query(
    `SELECT * FROM device_alerts`, 
    (error, result) => {

    if (error) 
    {
      return res.status(400).json(error);
    }

    return res.status(201).json(result.rows);
  })
};

//exports.getAlert = function(req, res) {}
const getAlert = (req, res) => {
  const id = req.params.id

  //////////dbHelper.getAlert(...);
  pool.query(
    `SELECT * FROM device_alerts WHERE sn=$1`, 
    [id], 
    (error, result) => {

    if (error) 
    {
      return res.status(400).json(error);
    }

    return res.status(201).json(result.rows);
  })
};

const create_alert= (telemetry) => {
    const telemetry_obj = JSON.parse(telemetry)
    
  };


const deleteAlert = (req, res) => {
  const id = req.params.id

  pool.query(
    'DELETE FROM device_alerts WHERE id=$1', 
    [id], 
    (error, result) => {

    if (error) 
    {
      return res.status(400).json(error);
    }

    return res.status(201).json(result.rows);
  })
};
  
  



module.exports = {
  getAllAlerts,
  getAlert,
  deleteAlert,
};