import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';
import postRoutes from './post.routes';
import userRoutes from './user.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

router.get('/connection-test', async (req: Request, res: Response) => {
    // await Post.deleteMany().then(() => console.log("deleted all"));
    res.status(200).send({
        message: 'Connection is working',
    });
});

export default router;
