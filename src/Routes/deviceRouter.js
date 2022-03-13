'use strict';

//const device_router = 
const router = require('express').Router();
const deviceController = require('../Controllers/DeviceController');
const DEVICE_ENDPOINT = '/devices'

//import verifyAuth from '../middlewares/verifyAuth';
//router.post('/devices', verifyAuth, deviceController.insertDevice);


//GET
router.get(`${DEVICE_ENDPOINT}`, deviceController.getAllDevices);
router.get(`${DEVICE_ENDPOINT}/:id`, deviceController.getDevice);

//POST
router.post(`${DEVICE_ENDPOINT}`, deviceController.insertDevice);
router.post(`${DEVICE_ENDPOINT}/:id`, deviceController.updateDevice);

//DELETE
router.delete(`${DEVICE_ENDPOINT}/:id/:sn`, deviceController.deleteDevice);


module.exports = router;