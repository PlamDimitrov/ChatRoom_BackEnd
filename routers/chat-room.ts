import { Router } from 'express';
import controllers from '../controllers';
const router = Router();

// create room
router.post('/chat-room', controllers.chatRoom.post.createRoom);

// join room
router.post('/chat-room', controllers.chatRoom.post.joinRoom);

export default router;