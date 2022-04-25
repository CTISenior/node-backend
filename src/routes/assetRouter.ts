import express from 'express';
import * as assetController from '../controllers/assetController';
import { getActiveAlerts, getTotalAlerts } from '../controllers/alertController';
import { getAvgTelemetryValue, getMaxTelemetryValue, getTotalTelemetry } from '../controllers/telemetryController';

const router = express.Router();
const ENDPOINT = '/assets';

// GET
router.get(`${ENDPOINT}/:id`, assetController.getAsset);
router.get(`${ENDPOINT}/:assetId/devices`, assetController.getAssetDevices);
router.get(`${ENDPOINT}/:assetId/alerts`, assetController.getAssetAlerts);
router.get(`${ENDPOINT}/:assetId/telemetry`, assetController.getAssetTelemetries);
router.get(`${ENDPOINT}/:assetId/telemetry/avg`, async (req, res) => {
  const assetId = req.params.assetId
  const type = req.query.type ? req.query.type : 'temperature'; // api/v1/assets/:assetId/telemetry?type=temperature

  const result = await getAvgTelemetryValue(assetId, 'asset_id', type+'')
  
  return res
      .status(200)
      .json(result);
});
router.get(`${ENDPOINT}/:assetId/telemetry/max`, async (req, res) => {
  const assetId = req.params.assetId
  const type = req.query.type ? req.query.type : 'temperature'; // api/v1/assets/:assetId/telemetry?type=temperature

  const result = await getMaxTelemetryValue(assetId, 'asset_id', type+'')
  
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
          "activeAlerts": await getActiveAlerts(assetId, 'asset_id'),
          "alertCount": await getTotalAlerts(assetId, 'asset_id'),
          "telemetryCount": await getTotalTelemetry(assetId, 'asset_id'),
        }
      );
});

// POST
router.post(`${ENDPOINT}`, assetController.insertAsset);

// PUT
router.put(`${ENDPOINT}/:id`, assetController.updateAsset);

// DELETE
router.delete(`${ENDPOINT}/:id`, assetController.deleteAsset);


export default router;