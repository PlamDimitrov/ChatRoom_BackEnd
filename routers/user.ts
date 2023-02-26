import { Router } from 'express';
import controllers from '../controllers';
const router = Router();

// Register
router.post('/register', controllers.user.post.register);

// Login
router.post('/login', controllers.user.post.login);

// Logout
router.get('/logout', controllers.user.get.logout);

export default router;