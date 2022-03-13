"use strict";

const pool = require('../connectors/pgsql_connector');


//exports.getDevices = function(req, res) {}
const getDevices = (req, res) => {
    pool.query(
      `SELECT * FROM devices ORDER BY "id" ASC`, (error, results) => {
      if (error) {
        res.status(400).json(error)
        return;
        //throw error
      }

      res.status(200).json(results.rows)
    })
};

const getDevice = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(
      `SELECT * FROM devices WHERE "id" = $1`, [id], (error, results) => {
      if (error) {
        res.status(404).json(error)
        return;
        //throw error
      }

      res.status(200).json(results.rows)
    })
};


const insertDevice = (req, res) => {
    const { sn, name, protocol, type, keys } = req.body

    pool.query(
      `INSERT INTO devices (sn, name, protocol, type, keys) VALUES ($1, $2, $3, $4, $5)`,
      [sn, name, protocol, type, keys],
      (error, results) => {
      if (error) {
        res.status(401).json(error)
        return;
        //throw error
      }//403, 406
     
      res.status(201).send(`Device inserted successfully`)
      //create kafka topic
    })
};

const updateDevice = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, type, keys } = req.body

    pool.query(
      `UPDATE devices SET "name" = $1, "type" = $2, "keys" = $3 WHERE "id" = $4`,
      [name, type, keys, id],
      (error, results) => {
        if (error) {
          res.status(401).json(error)
          return;
          //throw error
        }

      res.status(200).send(`Device updated successfully [ID: ${id}]`)
      })
};

const deleteDevice = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(
      `DELETE * FROM devices WHERE "id" = $1`, [id], (error, results) => {
      if (error) {
        res.status(400).json(error)
        return;
        //throw error
      }

      res.status(200).send(`Device deleted successfully [ID: ${id}]`)
      //delete kafka topic
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
    getDevices,
    getDevice,
    insertDevice,
    updateDevice,
    deleteDevice
};