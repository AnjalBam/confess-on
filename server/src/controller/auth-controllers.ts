import { Request, Response } from 'express';
import { checkPasswords } from './helpers';
import { createUser } from '../services/user.service';
import User from '../models/user.model';
import { signJwtForUser } from '../utils/jwt';

export const signUp = async (req: Request, res: Response) => {
    console.log(req)
    const { body } = req;
    const { password, confirmPassword, ...rest } = body;

    if (
        !rest.email ||
        !rest.username ||
        !rest.fullName ||
        !rest.userType ||
        !password ||
        !confirmPassword
    ) {
        console.log(rest, password, confirmPassword)
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

export const login = async (req: Request, res: Response) => {
    const { body } = req;
    const { password, email } = body;

    if (!email || !password) {
        return res.status(400).send({
            message: 'Make sure all fields are correctly sent',
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({
                message: 'Invalid credentials',
            });
        }

        const isValid = await user.validatePassword(password);
        if (!isValid) {
            return res.status(400).send({
                message: 'Invalid credentials',
            });
        }

        const token = signJwtForUser(user);

        return res.status(200).send({
            message: 'Login Successful',
            data: { token },
        });
    } catch (err: unknown) {
        return res.status(500).send({
            message: 'An error occurred',
        });
    }
};
