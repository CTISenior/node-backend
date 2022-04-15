import * as telemetryController from '../controllers/telemetryController';

import express from 'express';
const telemetryRouter = express.Router();

const ENDPOINT = '/telemetry';

// import verifyAuth from '../middlewares/verifyAuth';
// telemetryRouter.post('/telemetry', verifyAuth, telemetryController.);

// GET
telemetryRouter.get(`${ENDPOINT}/:sn`, telemetryController.getTelemetries);

export default telemetryRouter;
