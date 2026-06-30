import express  from 'express';
const router = express.Router();
import { createSubmission, getSubmissions } from '../controllers/submissionController.js';
import { protectRoute } from '../middleware/protectRoute.js';

router.post('/', createSubmission); // Public submission
router.get('/:formId', protectRoute, getSubmissions);

export default router;
