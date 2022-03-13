"use strict";

const pool = require('../connectors/pgsql_connector');
const kafkaAdmin = require('../utils/kafkaAdmin');

const tenantID = 1;
const buildingID = 1;


//exports.getDevices = function(req, res) {}
const getAllDevices = (req, res) => {
  pool.query(
    'SELECT * FROM devices WHERE tenant_id=$1 AND building_id=$2 ORDER BY created_at ASC',
    [tenantID, buildingID],
    (error, result) => {

    if (error) 
    {
      return res.status(400).json(error);
      //return res.status(400).send('error!');
    }

    return res.status(200).json(result.rows);
  })
};

const getDevice = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query(
    'SELECT * FROM devices WHERE id=$1', [id], (error, result) => {

    if (error) 
    {
      return res.status(404).json(error);
    }

    return res.status(200).json(result.rows);
  })
};


const insertDevice = (req, res) => {
  const { sn, name, protocol, type, keys } = req.body

  pool.query(
    'INSERT INTO devices (sn, name, protocol, type, keys) VALUES ($1, $2, $3, $4, $5)',
    [sn, name, protocol, type, keys],
    (error, result) => {

    if (error) 
    {
      return res.status(401).json(error); // .. 403, 406
    }
    
      //create kafka topic -> SN
    kafkaAdmin.createTopic(sn)
      .then(result => console.log(result))
      .catch(error => console.log(error));
    
    return res.status(201).json(result);
  })
};


const updateDevice = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, type, keys } = req.body
  //const updated_at = Date.now()

  pool.query(
    'UPDATE devices SET name=$1, type=$2, keys=$3 WHERE id = $4',
    [name, type, keys, id],
    (error, result) => {

    if (error) 
    {
      return res.status(401).json(error);
    }

    return res.status(200).json(result);
  })
};

const deleteDevice = (req, res) => {
  const id = parseInt(req.params.id)
  const sn = req.params.sn
  
  pool.query(
    'DELETE FROM devices WHERE id=$1', [id], (error, result) => {

    if (error) 
    {
      return res.status(400).json(error);
    }

    //delete kafka topic -> SN
    kafkaAdmin.deleteTopic(sn)
      .then(result => console.log(result))
      .catch(error => console.log(error));
    
    return res.status(200).json(result);
  })
};


/*
function authenticateDevice(device, token){
  return new Promise( (resolve, reject) => {
      resolve(device); 
  })
}
*/


module.exports = {
  getAllDevices,
  getDevice,
  insertDevice,
  updateDevice,
  deleteDevice
};