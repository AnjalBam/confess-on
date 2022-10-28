import { Router } from 'express';
import {
    getUserDetailsController,
    getMyDetails,
} from '../controller/user-controller';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = Router();

router.use(isAuthenticated);

router.get('/u/:id', getUserDetailsController);
router.get('/my-details', getMyDetails);

export default router;
