import {UserDocument} from '../models/user.model';
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';

export const signJwtForUser = (user: UserDocument) => {
    const payload = {
        id: user._id,
        email: user.email,
    };

    return jwt.sign(payload, SECRET, { expiresIn: JWT_EXPIRY });
}

export const verifyJwtForUser = (token: string, user: UserDocument) =>  {
    const payload = jwt.verify(token, SECRET) as {
        id: string;
        email: string;
    };

    return payload && payload.id === user._id.toString() && payload.email === user.email;
}

