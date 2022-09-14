import { Request, Response, NextFunction } from 'express';
import { verifyJwtForUser } from '../utils/jwt';

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const bearerToken = req.header('Authorization');

    if (!bearerToken) {
        return res.status(401).send({
            message: 'You are not authorized.',
            error: 'No token provided.',
        });
    }

    if (!bearerToken.startsWith('Bearer ')) {
        return res.status(401).send({
            message: 'You are not authorized.',
            error: "Invalid token format. Use 'Bearer $token'.",
        });
    }

    const token = bearerToken.split(' ')[1];
    const { valid, expired, payload } = verifyJwtForUser(token);
    if (!valid) {
        return res.status(401).send({
            message: 'You are not authorized.',
            error: expired ? 'Token expired.' : 'Invalid token.',
        });
    }

    req.body.user = payload;
    next();
};
