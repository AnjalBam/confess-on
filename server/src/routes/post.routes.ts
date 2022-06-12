import { Router } from 'express';
import {
    createPostController,
    getAllPostsController,
} from '../controller/post-controller';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = Router();

router.use(isAuthenticated);

router.route('/').get(getAllPostsController).post(createPostController);

export default router;
