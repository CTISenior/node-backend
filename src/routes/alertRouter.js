'use strict';

//const alert_router = 
const router = require('express').Router();
const alertController = require('../controllers/alertController');
const ENDPOINT = '/alerts'

//import verifyAuth from '../middlewares/verifyAuth';
//router.post('/devices', verifyAuth, deviceController.insertDevice);


//GET
router.get(`${ENDPOINT}`, alertController.getAllAlerts);
router.get(`${ENDPOINT}/:id`, alertController.getAlert);


//DELETE
router.delete(`${ENDPOINT}/:id`, alertController.deleteAlert);


module.exports = router;