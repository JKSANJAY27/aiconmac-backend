import express from 'express';
import { createBrochureRequest, getBrochureRequests } from '../controllers/brochureController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/brochure-requests - Public
router.post('/', createBrochureRequest);

// GET /api/brochure-requests - Protected (Admin/Editor/Viewer)
router.get('/', protect, authorizeRoles('ADMIN', 'EDITOR', 'VIEWER'), getBrochureRequests);

export default router;
