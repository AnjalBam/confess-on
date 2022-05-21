import { Request, Response } from 'express';
import { checkPasswords } from './helpers';
import { createUser } from '../services/user.service';

export const signUp = async (req: Request, res: Response) => {
    const { body } = req;
    const { password, confirmPassword, ...rest } = body;

    const user = await createUser({ ...rest, password });
    const { _id, bio, email, fullName, username, userType } = user;

    return res.status(201).send({
        message: 'SignUp Successful',
        data: { _id, bio, email, fullName, username, userType },
    });
};
