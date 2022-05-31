import { Request, Response } from 'express';
import { checkPasswords } from './helpers';
import { createUser } from '../services/user.service';
import User from '../models/user.model';
import { signJwtForUser } from '../utils/jwt';

export const signUp = async (req: Request, res: Response) => {
    const { body } = req;
    const { password, confirmPassword, ...rest } = body;

    if (
        !rest.email ||
        !rest.username ||
        !rest.fullName ||
        !password ||
        !confirmPassword
    ) {
        return res.status(400).send({
            message: 'Make sure all fields are correctly sent',
        });
    }

    if (!checkPasswords(password, confirmPassword)) {
        return res.status(400).send({ message: 'Passwords do not match' });
    }

    const uType = 'user';

    const existingUserWithEmail = await User.findOne({ email: rest.email });
    if (existingUserWithEmail) {
        return res.status(400).send({
            message: 'User with that email already exists',
        });
    }

    const existingUserWithUsername = await User.findOne({ username: rest.username });
    if (existingUserWithUsername) {
        return res.status(400).send({
            message: 'User with that username already exists',
        });
    }

    const user = await createUser({ ...rest, password, userType: uType });
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
        const { email: userEmail, username } = user;

        return res.status(200).send({
            message: 'Login Successful',
            data: { token, email: userEmail, username },
        });
    } catch (err: unknown) {
        return res.status(500).send({
            message: 'An error occurred',
        });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    const { body } = req;
    const { password, newPassword, confirmNewPassword } = body;

    if (!password || !newPassword || !confirmNewPassword) {
        return res.status(400).send({
            message: 'Make sure all fields are correctly sent',
        });
    }

    try {
        const user = await User.findOne({email:'anjalbam81@gmail.com'});
        if (!user) {
            return res.status(400).send({
                message: 'Invalid credentials',
            });
        }

        if (!checkPasswords(newPassword, confirmNewPassword)) {
            return res.status(400).send({ message: 'Passwords do not match' });
        }

        const isValid = await user.validatePassword(password);
        if (!isValid) {
            return res.status(400).send({
                message: 'Invalid password',
            });
        }

        // user.password = newPassword;
        // await user.save();

        return res.status(200).send({
            message: 'Password changed successfully',
        });
    } catch (err: unknown) {
        return res.status(500).send({
            message: 'An error occurred',
        });
    }
}
