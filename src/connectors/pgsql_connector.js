"use strict";

const Pool = require('pg').Pool
//require('sequelize');

module.exports = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'iotwin',
  user: 'username',
  password: 'password'
})