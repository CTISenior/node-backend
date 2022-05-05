import express from 'express';
import * as tenantController from '../controllers/tenantController';
import { clearActiveAlerts, getTotalAlerts } from '../controllers/alertController';

const router = express.Router();
const ENDPOINT = '/tenants';

// GET
router.get(`${ENDPOINT}/:id`, tenantController.getTenant);
router.get(`${ENDPOINT}/:tenantId/assets`, tenantController.getTenantAssets);
router.get(`${ENDPOINT}/:tenantId/devices`, tenantController.getTenantDevices);
router.get(`${ENDPOINT}/:tenantId/alerts`, tenantController.getTenantActiveAlerts);
router.get(`${ENDPOINT}/:tenantId/dashboard`, async (req, res) => {
    const tenantId = req.params.tenantId

    return res
      .status(200)
      .json(
        {
          "entityCount": await tenantController.getTotalTenantEntity(tenantId),
          "allalertsCount": await getTotalAlerts(tenantId, 'tenant_id'),
          "latestAlerts": await tenantController.getLatestTenantAlerts(tenantId),
          "latestTelemetry": await tenantController.getLatestTenantTelemetries(tenantId)
        }
      );
});

// POST
router.post(`${ENDPOINT}`, tenantController.insertTenant);

// PUT
router.put(`${ENDPOINT}/:id`, tenantController.updateTenant);
router.put(`${ENDPOINT}/:tenantId/alerts`, async (req, res) => {
  const tenantId = req.params.tenantId
  const response = await clearActiveAlerts(tenantId, 'tenant_id');
  return res
    .status(200)
    .send('Active tenant alerts cleared');
});

// DELETE


export default router;
