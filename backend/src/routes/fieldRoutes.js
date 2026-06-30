import express  from 'express';
const router = express.Router();
import { createField } from '../controllers/fieldController.js';
import { protectRoute } from '../middleware/protectRoute.js';

router.post('/', protectRoute, createField);

export default router;
