import express from 'express';
import * as alertController from '../controllers/alertController';

const router = express.Router();
const ENDPOINT = '/alerts';

// GET

// POST
router.post(`${ENDPOINT}/:id`, alertController.updateAlertStatus);

// DELETE
router.delete(`${ENDPOINT}/:id`, alertController.deleteAlert);


export default router;
