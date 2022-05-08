import express from 'express';
import * as deviceController from '../controllers/deviceController';
import { getEntityAlerts, clearActiveAlerts, deleteClearedAlerts, getActiveAlertCount, getTotalAlerts } from '../controllers/alertController';
import { getEntityTelemetries, getAvgTelemetryValue, getMaxTelemetryValue, getTotalTelemetry } from '../controllers/telemetryController';

const router = express.Router();
const ENDPOINT = '/devices';

// import verifyAuth from '../middlewares/verifyAuth';
// router.post('/devices', verifyAuth, deviceController.insertDevice);

// GET
router.get(`${ENDPOINT}/:id`, deviceController.getDevice);
router.get(`${ENDPOINT}/:deviceId/telemetry2`, deviceController.getDeviceTelemetries2);

router.get(`${ENDPOINT}/:deviceId/alerts`, async (req, res) => {
  const deviceId = req.params.deviceId
  const daysNum = req.query.days ? req.query.days : 7;
  const days:number = <number> <any> daysNum

  return res
    .status(200)
    .json(
      {
        "latestAlerts": await getEntityAlerts(deviceId, days, 'device_id'),
        "activeAlertsCount": await getActiveAlertCount(deviceId, 'device_id'),
        "allAlertsCount": await getTotalAlerts(deviceId, 'device_id'),
      }
    );
});

router.get(`${ENDPOINT}/:deviceId/telemetry`, async (req, res) => {
  const deviceId = req.params.deviceId
  const limitNum = req.query.limit ? req.query.limit : 200; // api/v1/devices/:deviceId/telemetry?limit=200
  const limit:number = <number> <any> limitNum
  //const sortedColumn = req.query.sortedColumn ? req.query.sortedColumn : 'created_at';
  //const sorting = req.query.sorting ? req.query.sorting : 'DESC';
  
  return res
    .status(200)
    .json(
      {
        "latestTelemetry": await getEntityTelemetries(deviceId, limit, 'device_id'),
        "telemetryCount": await getTotalTelemetry(deviceId, 'device_id'),
      }
    );
});

router.get(`${ENDPOINT}/:deviceId/telemetry/avg`, async (req, res) => {
  const deviceId = req.params.deviceId
  const sensorType = req.query.sensorType ? req.query.sensorType : ''; // api/v1/devices/:deviceId/telemetry?sensorType=temperature

  const result = await getAvgTelemetryValue(deviceId, 'device_id', sensorType+'')
  
  return res
      .status(200)
      .json(result);
});

router.get(`${ENDPOINT}/:deviceId/telemetry/max`, async (req, res) => {
  const deviceId = req.params.deviceId
  const sensorType = req.query.sensorType ? req.query.sensorType : ''; // api/v1/devices/:deviceId/telemetry?sensorType=temperature

  const result = await getMaxTelemetryValue(deviceId, 'device_id', sensorType+'')
 
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
          "activeAlertsCount": await getActiveAlertCount(deviceId, 'device_id')
        }
      );
});



// POST
router.post(`${ENDPOINT}`, deviceController.insertDevice);

// PUT
router.put(`${ENDPOINT}/:id`, deviceController.updateDevice);
router.put(`${ENDPOINT}/:deviceId/alerts`, async (req, res) => {
  const deviceId = req.params.deviceId
  const response = await clearActiveAlerts(deviceId, 'device_id');
  return res
    .status(200)
    .send('Active device alerts cleared');
});

// DELETE
router.delete(`${ENDPOINT}/:id`, deviceController.deleteDevice);
router.delete(`${ENDPOINT}/:deviceId/alerts`, async (req, res) => {
  const deviceId = req.params.deviceId
  const response = await deleteClearedAlerts(deviceId, 'device_id');
  return res
    .status(200)
    .send('Active device alerts deleted');
});

export default router;
