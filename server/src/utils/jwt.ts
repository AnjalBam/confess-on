import { UserDocument } from '../models/user.model';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';

export const signJwtForUser = (
    user: UserDocument,
) => {
    const payload = {
        id: user._id,
        email: user.email,
    };

    return jwt.sign(payload, SECRET, {
        expiresIn: JWT_EXPIRY,
    }).toString();
};

export const verifyJwtForUser = (token: string) => {
    try {
        const payload = jwt.verify(token, SECRET) as {
            id: string;
            email: string;
        };
        return {
            valid: true,
            expired: false,
            payload,
        }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        // console.error(err);
        return {
            valid: false,
            expired: err?.message === 'jwt expired',
            payload: null
        }
    }
    
};
