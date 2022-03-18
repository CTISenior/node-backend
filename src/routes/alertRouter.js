'use strict';

//const alert_router = 
const router = require('express').Router();
const deviceController = require('../controllers/alertController');
const ENDPOINT = '/alerts'

//import verifyAuth from '../middlewares/verifyAuth';
//router.post('/devices', verifyAuth, deviceController.insertDevice);


//GET
router.get(`${ENDPOINT}/:id`, deviceAlert.getAlert);


module.exports = router;