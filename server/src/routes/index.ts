import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);

router.get('/connection-test', (req: Request, res: Response) => {
    res.status(200).send({
        message: 'Connection is working',
    });
});

export default router;
