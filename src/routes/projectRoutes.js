// backend-api/src/routes/projectRoutes.js
import express from 'express';
import * as projectController from '../controllers/projectController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { uploadMultipleImages } from '../middleware/uploadMiddleware.js'; // For project images

const router = express.Router();

router.route('/')
  .get(projectController.getProjects) // Publicly accessible
  .post(protect, authorizeRoles('ADMIN', 'EDITOR'), uploadMultipleImages, projectController.createProject);

router.route('/:id')
  .get(projectController.getProject) // Publicly accessible
  .put(protect, authorizeRoles('ADMIN', 'EDITOR'), uploadMultipleImages, projectController.updateProject)
  .delete(protect, authorizeRoles('ADMIN', 'EDITOR'), projectController.deleteProject);

export default router;