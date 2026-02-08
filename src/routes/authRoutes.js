// backend-api/src/routes/authRoutes.js
import express from 'express';
import * as authController from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.post('/register', authController.register); // Public for initial setup, then protect it
router.post('/register', protect, authorizeRoles('ADMIN'), authController.register);
router.post('/login', authController.login);
router.get('/me', protect, authController.getMe);

export default router;