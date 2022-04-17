import * as deviceController from '../controllers/deviceController';
import { getDeviceAlerts, clearDeviceAlerts, deleteDeviceAlerts } from '../controllers/alertController';
import { getDeviceTelemetries } from '../controllers/telemetryController';

import express from 'express';
const router = express.Router();

const ENDPOINT = '/devices';

// import verifyAuth from '../middlewares/verifyAuth';
// router.post('/devices', verifyAuth, deviceController.insertDevice);

// GET
router.get(`${ENDPOINT}/:id`, deviceController.getDevice);
router.get(`${ENDPOINT}/:deviceId/alerts`, getDeviceAlerts);
router.get(`${ENDPOINT}/:deviceId/telemetry`, getDeviceTelemetries);

// POST
router.post(`${ENDPOINT}`, deviceController.insertDevice);

// PUT
router.put(`${ENDPOINT}/:id`, deviceController.updateDevice);
router.put(`${ENDPOINT}/:deviceId/alerts`, clearDeviceAlerts);

// DELETE
router.delete(`${ENDPOINT}/:sn-:id`, deviceController.deleteDevice);
router.delete(`${ENDPOINT}/:deviceId/alerts`, deleteDeviceAlerts);

export default router;
