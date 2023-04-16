import { Router } from 'express';
import controllers from '../controllers';
const router = Router();

// create room
router.post('/create-chat-room/:roomName', controllers.chatRoom.post.createRoom);

// join room
router.post('/join-chat-room/:roomName', controllers.chatRoom.post.joinRoom);

export default router;