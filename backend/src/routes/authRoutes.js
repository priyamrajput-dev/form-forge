import express  from 'express';
const router = express.Router();
import { registerUser, loginUser, logoutUser, getUserProfile } from '../controllers/authController.js';
import { protectRoute } from '../middleware/protectRoute.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protectRoute, getUserProfile);

export default router;
