import { Request, Response } from 'express';
import { checkPasswords } from './helpers';
import { createUser } from '../services/user.service';

export const signUp = async (req: Request, res: Response) => {
    const { body } = req;
    const { password, confirmPassword, ...rest } = body;

    if (!rest.email || !rest.username || !rest.fullName || !rest.userType || !password || !confirmPassword)  {
        return res.status(400).send({
            message: 'Make sure all fields are correctly sent',
        });
    }

    if (!checkPasswords(password, confirmPassword)) {
        return res.status(400).send({ message: 'Passwords do not match' });
    }


    const user = await createUser({ ...rest, password });
    const { _id, bio, email, fullName, username, userType } = user;

    return res.status(201).send({
        message: 'SignUp Successful',
        data: { _id, bio, email, fullName, username, userType },
    });
};
