import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';
import postRoutes from './post.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);

router.get('/connection-test', (req: Request, res: Response) => {
    res.status(200).send({
        message: 'Connection is working',
    });
});

export default router;
