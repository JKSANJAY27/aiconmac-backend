import express from 'express';
import { pingDatabase } from '../services/keepAliveService.js';

const router = express.Router();

// GET /api/keep-alive
router.get('/', async (req, res) => {
    const success = await pingDatabase();
    if (success) {
        res.status(200).json({ status: 'ok', message: 'Database pinged successfully' });
    } else {
        res.status(500).json({ status: 'error', message: 'Database ping failed' });
    }
});

export default router;
