import express from 'express';
import * as telemetryController from '../controllers/telemetryController';

const router = express.Router();
const ENDPOINT = '/telemetry';

// GET

// DELETE
router.delete(`${ENDPOINT}/:id`, telemetryController.deleteTelemetry);
//router.delete(`${ENDPOINT}/devices/:sn`, telemetryController.deleteDeviceTelemetries);


export default router;
