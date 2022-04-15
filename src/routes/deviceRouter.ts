import * as deviceController from '../controllers/deviceController';

import express from 'express';
const deviceRouter = express.Router();

const DEVICE_ENDPOINT = '/devices';

// import verifyAuth from '../middlewares/verifyAuth';
// deviceRouter.post('/devices', verifyAuth, deviceController.insertDevice);

// GET
deviceRouter.get(`${DEVICE_ENDPOINT}`, deviceController.getAllDevices);
deviceRouter.get(`${DEVICE_ENDPOINT}/:id`, deviceController.getDevice);

// POST
deviceRouter.post(`${DEVICE_ENDPOINT}`, deviceController.insertDevice);

// PUT
deviceRouter.put(`${DEVICE_ENDPOINT}/:id`, deviceController.updateDevice);

// DELETE
deviceRouter.delete(`${DEVICE_ENDPOINT}/:id/:sn`, deviceController.deleteDevice);

export default deviceRouter;
