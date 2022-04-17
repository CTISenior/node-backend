import * as alertController from '../controllers/alertController';

import express from 'express';
const router = express.Router();

const ENDPOINT = '/alerts';

// import verifyAuth from '../middlewares/verifyAuth';
// router.post('/devices', verifyAuth, alertController.);

// GET

// POST
router.post(`${ENDPOINT}/:id`, alertController.updateAlertStatus);

// DELETE
router.delete(`${ENDPOINT}/:id`, alertController.deleteAlert);


export default router;
