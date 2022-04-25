import express from 'express';
import * as tenantController from '../controllers/tenantController';
import { getTotalAlerts } from '../controllers/alertController';
import { getTotalTelemetry } from '../controllers/telemetryController';

const router = express.Router();
const ENDPOINT = '/tenants';

// GET
router.get(`${ENDPOINT}/:realmId`, tenantController.getTenant);
router.get(`${ENDPOINT}/:tenantId/assets`, tenantController.getTenantAssets);
router.get(`${ENDPOINT}/:tenantId/devices`, tenantController.getTenantDevices);
router.get(`${ENDPOINT}/:tenantId/alerts`, tenantController.getTenantAlerts);
router.get(`${ENDPOINT}/:tenantId/telemetry`, tenantController.getTenantTelemetries);
router.get(`${ENDPOINT}/:tenantId/dashboard`, async (req, res) => {
    const tenantId = req.params.tenantId

    return res
      .status(200)
      .json(
        {
          "assetCount": await tenantController.getTotalTenantEntity(tenantId, 'assets'),
          "deviceCount": await tenantController.getTotalTenantEntity(tenantId, 'devices'),
          "alertCount": await getTotalAlerts(tenantId, 'tenant_id'),
          "telemetryCount": await getTotalTelemetry(tenantId, 'tenant_id'),
          "latestAlerts": await tenantController.getLatestTenantAlerts(tenantId),
          "latestTelemetry": await tenantController.getLatestTenantTelemetries(tenantId)
        }
      );
});

// POST
router.post(`${ENDPOINT}`, tenantController.insertTenant);

// PUT
router.put(`${ENDPOINT}/:realmId`, tenantController.updateTenant);

export default router;
