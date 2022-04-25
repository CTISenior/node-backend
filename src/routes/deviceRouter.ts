import express from 'express';
import * as deviceController from '../controllers/deviceController';
import { getActiveAlerts, getTotalAlerts } from '../controllers/alertController';
import { getAvgTelemetryValue, getMaxTelemetryValue, getTotalTelemetry } from '../controllers/telemetryController';

const router = express.Router();
const ENDPOINT = '/devices';

// import verifyAuth from '../middlewares/verifyAuth';
// router.post('/devices', verifyAuth, deviceController.insertDevice);

// GET
router.get(`${ENDPOINT}/:id`, deviceController.getDevice);
router.get(`${ENDPOINT}/:deviceId/alerts`, deviceController.getDeviceAlerts);
router.get(`${ENDPOINT}/:deviceId/telemetry`, deviceController.getDeviceTelemetries);
router.get(`${ENDPOINT}/:deviceId/telemetry/avg`, async (req, res) => {
  const deviceId = req.params.deviceId
  const type = req.query.type ? req.query.type : 'temperature'; // api/v1/devices/:deviceId/telemetry?type=temperature

  const result = await getAvgTelemetryValue(deviceId, 'device_id', type+'')
  
  return res
      .status(200)
      .json(result);
});
router.get(`${ENDPOINT}/:deviceId/telemetry/max`, async (req, res) => {
  const deviceId = req.params.deviceId
  const type = req.query.type ? req.query.type : 'temperature'; // api/v1/devices/:deviceId/telemetry?type=temperature

  const result = await getMaxTelemetryValue(deviceId, 'device_id', type+'')
 
  return res
      .status(200)
      .json(result);
});
router.get(`${ENDPOINT}/:deviceId/dashboard`, async (req, res) => {
    const deviceId = req.params.deviceId

    return res
      .status(200)
      .json(
        {
          "activeAlerts": await getActiveAlerts(deviceId, 'device_id'),
          "alertCount": await getTotalAlerts(deviceId, 'device_id'),
          "telemetryCount": await getTotalTelemetry(deviceId, 'device_id'),
        }
      );
});

// POST
router.post(`${ENDPOINT}`, deviceController.insertDevice);

// PUT
router.put(`${ENDPOINT}/:id`, deviceController.updateDevice);
router.put(`${ENDPOINT}/:deviceId/alerts`, deviceController.clearDeviceAlerts);

// DELETE
router.delete(`${ENDPOINT}/:id.:sn`, deviceController.deleteDevice);
router.delete(`${ENDPOINT}/:deviceId/alerts`, deviceController.deleteDeviceAlerts);

export default router;
