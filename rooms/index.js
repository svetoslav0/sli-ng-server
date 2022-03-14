import express from 'express';

import { ApiMiddleware } from '../common/ApiMiddleware.js';
import { ApiRoomsController } from './ApiRoomsController.js'

const router = express.Router();

router.post('/', ApiMiddleware.authorize_user, async (request, response, next) => {
    try {
        return response.json(await new ApiRoomsController(request, response, next).create());
    } catch (e) {
        next(e);
    }
});

export default router;
