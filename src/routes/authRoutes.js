// backend-api/src/routes/authRoutes.js
import express from 'express';
import * as authController from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.register); // Admin should create users initially
router.post('/login', authController.login);
router.get('/me', protect, authController.getMe);

export default router;