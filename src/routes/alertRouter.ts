import * as alertController from '../controllers/alertController';

import express from 'express';
const alertRouter = express.Router();

const ENDPOINT = '/alerts';

// import verifyAuth from '../middlewares/verifyAuth';
// alertRouter.post('/devices', verifyAuth, alertController.);

// GET
alertRouter.get(`${ENDPOINT}`, alertController.getAllAlerts);
alertRouter.get(`${ENDPOINT}/:id`, alertController.getAlert);

// DELETE
alertRouter.delete(`${ENDPOINT}/:id`, alertController.deleteAlert);
alertRouter.delete(`${ENDPOINT}/:sn`, alertController.deleteAllAlerts);

export default alertRouter;
