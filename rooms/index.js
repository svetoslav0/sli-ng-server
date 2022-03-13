import express from 'express';

const router = express.Router();

router.get('/demo', async (request, response, next) => {
    return response.json({ message: 'success' });
});

export default router;
