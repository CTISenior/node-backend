import { getTenantAssets } from '../controllers/assetController';
import { getTenantDevices } from '../controllers/deviceController';
import { getTenantAlerts } from '../controllers/alertController';
import { getTenantTelemetries } from '../controllers/telemetryController';

import express from 'express';
const router = express.Router();

const ENDPOINT = '/tenants';

// GET
router.get(`${ENDPOINT}/:tenantId/assets`, getTenantAssets);
router.get(`${ENDPOINT}/:tenantId/devices`, getTenantDevices);
router.get(`${ENDPOINT}/:tenantId/alerts`, getTenantAlerts);
router.get(`${ENDPOINT}/:tenantId/telemetry`, getTenantTelemetries);


export default router;
