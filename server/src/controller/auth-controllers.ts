import { Request, Response } from 'express';
import User from '../models/user.model';
import { checkPasswords } from './helpers';

export const signUp = async (req: Request, res: Response) => {
    const { body } = req;

    if (
        !body.fullName ||
        !body.email ||
        !body.password ||
        !body.confirmPassword ||
        !body.username ||
        !body.userType
    ) {
        return res
            .status(400)
            .send({ message: 'Make sure all fields are correctly sent' });
    }

    if (!checkPasswords(body.password, body.confirmPassword)) {
        return res.status(400).send({ message: 'Passwords do not match' });
    }

    const user = await User.create(body);
    user.setPassword(body.password);
    user.save();
    const { fullName, bio, email, userType, username, _id } = user;
    return res.status(201).send({
        message: 'SignUp Successful',
        data: { fullName, bio, email, userType, username, _id },
    });
};
