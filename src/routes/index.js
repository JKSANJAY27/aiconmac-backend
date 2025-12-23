// backend-api/src/routes/index.js
import express from 'express';
import authRoutes from './authRoutes.js';
import projectRoutes from './projectRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';
import contactRoutes from './contactRoutes.js';
import careerRoutes from './careerRoutes.js';
import clientRoutes from './clientRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/contact', contactRoutes);
router.use('/careers', careerRoutes);
router.use('/clients', clientRoutes);

export default router;