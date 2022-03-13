import express from 'express';

import rooms from './rooms/index.js';

const router = express.Router();

router.use('/rooms', rooms);

router.all('*', (request, response) => {
    console.log(request);
    return response.status(404)
        .json({
            error: 'Invalid route.'
        });
})

export { router };
