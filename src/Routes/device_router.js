'use strict';

const router  = require('express').Router();
const deviceController = require('../Controllers/DeviceController');

//GET
router.get('/devices', deviceController.getDevices);
router.get('/devices/:id', deviceController.getDevice);

//POST
router.post('/devices', deviceController.insertDevice);
router.post('/devices/:id', deviceController.updateDevice);

//DELETE
router.delete('/devices/:id', deviceController.deleteDevice);


module.exports = router;