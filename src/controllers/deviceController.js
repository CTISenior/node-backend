"use strict";

const pool = require('../connectors/pgsql_connector');
const kafkaAdmin = require('../utils/kafkaHelper');

const tenantID = 1;
const buildingID = 1;


//exports.getAllDevices = function(req, res) {}
const getAllDevices = (req, res) => {

  //////////dbHelper.getAllDevices(...);
  pool.query(
    'SELECT * FROM devices WHERE tenant_id=$1 AND building_id=$2 ORDER BY created_at ASC',
    [tenantID, buildingID],
    (error, result) => {

    if (error) 
    {
      return res.status(400).send(`Cannot get all devices!`)
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
      return res.status(400).send(`Cannot get the devices!`)
    }

    return res.status(200).json(result.rows);
  })
};


const insertDevice = (req, res) => {
  const { sn, name, protocol, model, type, description } = req.body

  pool.query(
    'INSERT INTO devices (sn, name, protocol, model, type, description) VALUES ($1, $2, $3, $4, $5, $6)',//returning *;
    [sn, name, protocol, model, type, description],
    (error, result) => {

    if (error) 
    {
      return res.status(400).send(`New device could not be inserted!`)
    }
    
      //create kafka topic -> SN
    kafkaAdmin.createTopic(sn)
      .then(result => console.log(result))
      .catch(error => console.log(error));
    
    return res.status(201).send(`New device inserted successfully`)
  })
};


const updateDevice = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, protocol, model, type, description } = req.body
  //const updated_at = Date.now()

  pool.query(
    'UPDATE devices SET name=$1, protocol=$2 ,model=$3, type=$4, description=$5 WHERE id = $6',//returning *;
    [name, protocol, model, type, description, id],
    (error, result) => {

    if (error) 
    {
      return res.status(400).send(`Device could not be updated! | ID: ${id}`)
    }

    return res.status(201).send(`Device updated successfully | ID: ${id}`)
  })
};

const deleteDevice = (req, res) => {
  const id = parseInt(req.params.id)
  const sn = req.params.sn
  
  pool.query(
    'DELETE FROM devices WHERE id=$1', 
    [id], 
    (error, result) => {

    if (error) 
    {
      return res.status(400).json(error);
    }

    //delete kafka topic -> SN
    kafkaAdmin.deleteTopic(sn)
      .then(result => console.log(result))
      .catch(error => console.log(error));
    
    return res.status(201).send(`Device updated successfully | ID: ${id}`)
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