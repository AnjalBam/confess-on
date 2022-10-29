import { Request, Response } from 'express';
import { getUserById } from '../services/user.service';

export const getUserDetailsController = async (req: Request, res: Response) => {
    const user = req.body.user;
    const userId = req.params.id;

    if (!user) {
        return res.status(401).send({
            message: 'Not authenticated!',
        });
    }

    if (!userId) {
        return res.status(400).send({
            message: 'No user id provided.',
        });
    }
    try {
        const usr = await getUserById(userId);

        if (!usr) {
            return res.status(404).send({
                message: 'User not found',
            });
        }

        return res.status(200).send({
            message: 'UserDetails fetch successful.',
            data: usr,
        });
    } catch (err: unknown) {
        return res.status(500).send({
            message: 'UserDetails fetch unsuccessful.',
            error: err,
        });
    }
};

export const getMyDetails = async (req: Request, res: Response) => {
    if (!req.body.user) {
        return res.status(401).send({
            message: 'You are not authenticated.',
        });
    }

    if (!req.body.user.id) {
        return res.status(500).send({
            message: 'No user id in request object.',
            error: 'Internal server error',
        });
    }
    const userId = req.body.user.id;
    try {
        const user = await getUserById(userId);

        return res
            .status(200)
            .send({ message: 'Details fetch successful.', data: user });
    } catch (error) {
        return res.status(500).send({
            message: 'Details cannot be fetched.',
            error,
        });
    }
};
