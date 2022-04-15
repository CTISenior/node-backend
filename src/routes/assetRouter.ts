// const asset_router =
import * as assetController from '../controllers/assetController';

import express from 'express';
const assetRouter = express.Router();

const ASSET_ENDPOINT = '/assets';

// import verifyAuth from '../middlewares/verifyAuth';
// assetRouter.post('/assets', verifyAuth, assetController.insertAsset);

// GET
assetRouter.get(`${ASSET_ENDPOINT}`, assetController.getAllAssets);
assetRouter.get(`${ASSET_ENDPOINT}/:id`, assetController.getAsset);

// POST
assetRouter.post(`${ASSET_ENDPOINT}`, assetController.insertAsset);

// PUT
assetRouter.put(`${ASSET_ENDPOINT}/:id`, assetController.updateAsset);

// DELETE
assetRouter.delete(`${ASSET_ENDPOINT}/:id`, assetController.deleteAsset);

export default assetRouter;