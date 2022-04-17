// const asset_router =
import * as assetController from '../controllers/assetController';
import { getAssetDevices } from '../controllers/deviceController';
import { getAssetAlerts } from '../controllers/alertController';
import { getAssetTelemetries } from '../controllers/telemetryController';

import express from 'express';
const router = express.Router();

const ENDPOINT = '/assets';


// GET
router.get(`${ENDPOINT}/:id`, assetController.getAsset);
router.get(`${ENDPOINT}/:assetId/devices`, getAssetDevices);
router.get(`${ENDPOINT}/:assetId/alerts`, getAssetAlerts);
router.get(`${ENDPOINT}/:assetId/telemetry`, getAssetTelemetries);

// POST
router.post(`${ENDPOINT}`, assetController.insertAsset);

// PUT
router.put(`${ENDPOINT}/:id`, assetController.updateAsset);

// DELETE
router.delete(`${ENDPOINT}/:id`, assetController.deleteAsset);


export default router;