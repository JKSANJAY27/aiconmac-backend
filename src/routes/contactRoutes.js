// backend-api/src/routes/contactRoutes.js
import express from 'express';
import * as contactController from '../controllers/contactController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(contactController.createContactSubmission) // Publicly accessible for submission
  .get(protect, authorizeRoles('ADMIN', 'EDITOR', 'VIEWER'), contactController.getContactSubmissions); // Admin access

router.route('/:id')
  .get(protect, authorizeRoles('ADMIN', 'EDITOR', 'VIEWER'), contactController.getContactSubmission)
  .put(protect, authorizeRoles('ADMIN', 'EDITOR'), contactController.updateContactSubmission) // e.g., mark as read
  .delete(protect, authorizeRoles('ADMIN'), contactController.deleteContactSubmission);

export default router;