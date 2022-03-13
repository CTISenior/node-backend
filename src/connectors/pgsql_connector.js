"use strict";

const Pool = require('pg').Pool
//require('sequelize');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'iotwin',
  user: 'username',
  password: 'password'
})


module.exports = pool