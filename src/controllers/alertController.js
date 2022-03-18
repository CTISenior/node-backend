// GET ->>>>  /api/v1/alerts


"use strict";

const pool = require('../connectors/pgsql_connector');

const tenantID = 1;
const buildingID = 1;


//exports.getAlert = function(req, res) {}
const getAlert = (req, res) => {
  const id = parseInt(req.params.id)

  //////////dbHelper.getAlert(...);
  pool.query(
    'SELECT * FROM devices_alerts WHERE sn=$1', 
    [id], 
    (error, result) => {

    if (error) 
    {
      return res.status(404).json(error);
    }

    return res.status(200).json(result.rows);
  })
};

const create_alert= (telemetry) => {
    const telemetry_obj = JSON.parse(telemetry)
    
  };
  



module.exports = {
  getAlert,
};