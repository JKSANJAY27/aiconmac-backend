import express from 'express';
import { createBrochureRequest, getBrochureRequests } from '../controllers/brochureController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/brochure-requests - Public
router.post('/', createBrochureRequest);

// GET /api/brochure-requests - Protected (Admin/Editor)
router.get('/', protect, authorizeRoles('ADMIN', 'EDITOR'), getBrochureRequests);

export default router;
