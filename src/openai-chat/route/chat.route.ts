import { Router } from 'express';
import { generateTextCall  } from './../src/controller/chat.controller';

const router = Router();

router.post('/chat/ask', generateTextCall);

export default router;