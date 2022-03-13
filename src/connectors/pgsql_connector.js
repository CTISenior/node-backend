"use strict";

const Pool = require('pg').Pool
//require('sequelize');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'iotwin',
  user: 'iotwin',
  password: 'iotwin-9097'
})


module.exports = pool