import express from 'express';
import * as assetController from '../controllers/assetController';
import { getEntityAlerts, deleteClearedAlerts, clearActiveAlerts, getActiveAlertCount, getTotalAlerts } from '../controllers/alertController';
import { getEntityTelemetries, getTimeseriesTelemetries, getChartTelemetries, getAvgTelemetryValue, getMaxTelemetryValue, getTotalTelemetry } from '../controllers/telemetryController';

const router = express.Router();
const ENDPOINT = '/assets';

// GET
router.get(`${ENDPOINT}/:id`, assetController.getAsset);
router.get(`${ENDPOINT}/:assetId/devices`, assetController.getAssetDevices);

router.get(`${ENDPOINT}/:assetId/alerts`, async (req, res) => {
  const assetId = req.params.assetId
  const daysNum = req.query.days ? req.query.days : 7;
  const days:number = <number> <any> daysNum

  return res
    .status(200)
    .json(
      {
        "latestAlerts": await getEntityAlerts(assetId, days, 'asset_id'),
        "activeAlertsCount": await getActiveAlertCount(assetId, 'asset_id'),
        "allAlertsCount": await getTotalAlerts(assetId, 'asset_id'),
      }
    );
});
router.get(`${ENDPOINT}/:assetId/telemetry`, async (req, res) => {
  const assetId = req.params.assetId
  const limitNum = req.query.limit ? req.query.limit : 200; // api/v1/assets/:assetId/telemetry?limit=200
  const limit:number = <number> <any> limitNum
  //const sortedColumn = req.query.sortedColumn ? req.query.sortedColumn : 'created_at';
  //const sorting = req.query.sorting ? req.query.sorting : 'DESC';
  
  return res
    .status(200)
    .json(
      {
        "latestTelemetry": await getEntityTelemetries(assetId, limit, 'asset_id'),
        "telemetryCount": await getTotalTelemetry(assetId, 'asset_id'),
      }
    );
});

router.get(`${ENDPOINT}/:assetId/telemetry/timeseries`, async (req, res) => {
  const assetId = req.params.assetId
  const sensorType = req.query.sensorType ? req.query.sensorType : '';
  
  return res
    .status(200)
    .json(
      {
        "timeSeriesData": await getTimeseriesTelemetries(assetId, sensorType+'', 'asset_id'),
      }
    );
});

router.get(`${ENDPOINT}/:assetId/telemetry/chart`, async (req, res) => {
  const assetId = req.params.assetId
  const sensorType = req.query.sensorType ? req.query.sensorType : '';
  const sensorType2 = req.query.sensorType2 ? req.query.sensorType2 : '';
  const daysNum = req.query.days ? req.query.days : 7; // api/v1/assets/:assetId/telemetry/chart?sensorType=temperature&days=14
  const day:number = <number> <any> daysNum
  
  return res
    .status(200)
    .json(
      {
        "chartTelemetries": await getChartTelemetries(assetId, sensorType+'', sensorType2+'', day, 'asset_id'),
      }
    );
});

router.get(`${ENDPOINT}/:assetId/telemetry/avg`, async (req, res) => {
  const assetId = req.params.assetId
  const sensorType = req.query.sensorType ? req.query.sensorType : ''; // api/v1/assets/:assetId/telemetry?sensorType=temperature

  const result = await getAvgTelemetryValue(assetId, 'asset_id', sensorType+'')
  
  return res
      .status(200)
      .json(result);
});
router.get(`${ENDPOINT}/:assetId/telemetry/max`, async (req, res) => {
  const assetId = req.params.assetId
  const sensorType = req.query.sensorType ? req.query.sensorType : ''; // api/v1/assets/:assetId/telemetry?sensorType=temperature

  const result = await getMaxTelemetryValue(assetId, 'asset_id', sensorType+'')
  
  return res
      .status(200)
      .json(result);
});
router.get(`${ENDPOINT}/:assetId/dashboard`, async (req, res) => {
    const assetId = req.params.assetId

    return res
      .status(200)
      .json(
        {
          "activeAlerts": await getActiveAlertCount(assetId, 'asset_id'),
          "alertCount": await getTotalAlerts(assetId, 'asset_id'),
          "telemetryCount": await getTotalTelemetry(assetId, 'asset_id'),
        }
      );
});

// POST
router.post(`${ENDPOINT}`, assetController.insertAsset);

// PUT
router.put(`${ENDPOINT}/:id`, assetController.updateAsset);
router.put(`${ENDPOINT}/:assetId/alerts`, async (req, res) => {
  const assetId = req.params.assetId
  const response = await clearActiveAlerts(assetId, 'asset_id');
  return res
    .status(200)
    .send('Active asset alerts cleared');
});

// DELETE
router.delete(`${ENDPOINT}/:id`, assetController.deleteAsset);
router.delete(`${ENDPOINT}/:assetId/alerts`, async (req, res) => {
  const assetId = req.params.assetId
  const response = await deleteClearedAlerts(assetId, 'asset_id');
  return res
    .status(200)
    .send('Active asset alerts deleted');
});


export default router;