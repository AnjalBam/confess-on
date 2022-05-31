import { Request } from 'express';

// export interface RequestWithUser extends Request {
//     user: {
//         data: { id: string; email: string } | null;
//         error: { message: string } | null;
//     };
// }

declare module 'express' {
    interface RequestWithUser extends Request {
        user: {
            data: { id: string; email: string } | null;
            error: { message: string } | null;
        };
    }
}