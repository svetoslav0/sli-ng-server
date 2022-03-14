import express from 'express';

import { ApiSpecification } from './ApiSpecification.js';
import rooms from './rooms/index.js';

const router = express.Router();

router.get('/specification', (req, res) => {
    const specification = ApiSpecification();

    return res.send(specification);
});

router.use('/rooms', rooms);

router.all('*', (request, response) => {
    console.log(request);
    return response.status(404)
        .json({
            error: 'Invalid route.'
        });
})

export { router };
