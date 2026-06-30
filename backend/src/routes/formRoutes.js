import express  from 'express';
const router = express.Router();
import { createForm, getMyForms, getFormWithFields } from '../controllers/formController.js';
import { protectRoute } from '../middleware/protectRoute.js';

router.post('/', protectRoute, createForm);
router.get('/my-forms', protectRoute, getMyForms);
router.get('/:id', getFormWithFields); // Public route to view the form

export default router;
