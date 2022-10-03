import { Router } from 'express';
import {
    changeLikePostController,
    createPostController,
    getAllPostsController,
    getPostController,
} from '../controller/post-controller';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = Router();

router.use(isAuthenticated);

router.route('/').get(getAllPostsController).post(createPostController);

router.route('/p/:id').get(getPostController);

router.patch('/p/like', changeLikePostController);

export default router;
