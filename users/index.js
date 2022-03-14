import express from 'express';

import { ApiUsersController } from './ApiUsersController.js';

const router = express.Router();

router.post('/register',  async (request, response, next) => {
    try {
        return response.json(await new ApiUsersController(request, response, next).register());
    } catch (e) {
        next(e);
    }
});

export default router;
