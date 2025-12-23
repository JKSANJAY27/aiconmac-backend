// backend-api/src/routes/clientRoutes.js
import express from 'express';
import * as clientController from '../controllers/clientController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { uploadLogo } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
    .get(clientController.getClients) // Publicly accessible
    .post(protect, authorizeRoles('ADMIN', 'EDITOR'), uploadLogo, clientController.createClient);

router.route('/:id')
    .delete(protect, authorizeRoles('ADMIN', 'EDITOR'), clientController.deleteClient);

export default router;
