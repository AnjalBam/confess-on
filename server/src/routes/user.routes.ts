import { Router } from 'express';
import { getUserDetailsController } from '../controller/user-controller';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = Router();

router.use(isAuthenticated);

router.get('/u/:id', getUserDetailsController);

export default router;
